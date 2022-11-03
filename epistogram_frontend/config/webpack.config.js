'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const ESLintPlugin = require('eslint-webpack-plugin');
const paths = require('./paths');
const modules = require('./modules');
const getClientEnvironment = require('./env');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = process.env.TSC_COMPILE_ON_ERROR === 'true'
  ? require('react-dev-utils/ForkTsCheckerWarningWebpackPlugin')
  : require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { srcFolderPath } = paths;

const createEnvironmentHash = require('./webpack/persistentCache/createEnvironmentHash');
const { avifLoader, imageLoader, svgLoader, getExternalJSLoader, getCssLoader, getCssModuleLoader, getSassLoader, getSassModuleLoader, fileLoader, getAppJSLoader } = require('./webpack/loaders');
const { styleLoaderGen } = require('./webpack/loaderHelpers');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const reactRefreshRuntimeEntry = require.resolve('react-refresh/runtime');
const reactRefreshWebpackPluginRuntimeEntry = require.resolve(
  '@pmmmwh/react-refresh-webpack-plugin'
);
const babelRuntimeEntry = require.resolve('babel-preset-react-app');
const babelRuntimeEntryHelpers = require.resolve(
  '@babel/runtime/helpers/esm/assertThisInitialized',
  { paths: [babelRuntimeEntry] }
);
const babelRuntimeRegenerator = require.resolve('@babel/runtime/regenerator', {
  paths: [babelRuntimeEntry],
});

// Some apps do not need the benefits of saving a web request, so not inlining the chunk
// makes for a smoother build process.
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === 'true';
const disableESLintPlugin = process.env.DISABLE_ESLINT_PLUGIN === 'true';

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);

// Check if Tailwind config exists
const useTailwind = fs.existsSync(
  path.join(paths.appPath, 'tailwind.config.js')
);

// Get the path to the uncompiled service worker (if it exists).
const swSrc = paths.swSrc;

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

const getOutputSettings = ({ isEnvDevelopment, isEnvProduction }) => ({
  // The build folder.
  path: paths.appBuild,
  // Add /* filename */ comments to generated require()s in the output.
  pathinfo: isEnvDevelopment,
  // There will be one main bundle, and one file per asynchronous chunk.
  // In development, it does not produce real files.
  filename: isEnvProduction
    ? 'static/js/[name].[contenthash:8].js'
    : isEnvDevelopment && 'static/js/bundle.js',
  // There are also additional JS chunk files if you use code splitting.
  chunkFilename: isEnvProduction
    ? 'static/js/[name].[contenthash:8].chunk.js'
    : isEnvDevelopment && 'static/js/[name].chunk.js',
  assetModuleFilename: 'static/media/[name].[hash][ext]',
  // webpack uses `publicPath` to determine where the app is being served from.
  // It requires a trailing slash, or the file assets will get an incorrect path.
  // We inferred the "public path" (such as / or /my-project) from homepage.
  publicPath: paths.publicUrlOrPath,
  // Point sourcemap entries to original disk location (format as URL on Windows)
  devtoolModuleFilenameTemplate: isEnvProduction
    ? info =>
      path
        .relative(paths.appSrc, info.absoluteResourcePath)
        .replace(/\\/g, '/')
    : isEnvDevelopment &&
    (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
});

const getDevtoolSetting = ({ isEnvProduction }) => (isEnvProduction
  ? shouldUseSourceMap
    ? 'source-map'
    : false
  : isEnvDevelopment && 'cheap-module-source-map');

const getCacheSettings = ({ env }) => ({
  type: 'filesystem',
  version: createEnvironmentHash(env.raw),
  cacheDirectory: paths.appWebpackCache,
  store: 'pack',
  buildDependencies: {
    defaultWebpack: ['webpack/lib/'],
    config: [__filename],
    tsconfig: [paths.appTsConfig, paths.appJsConfig].filter(f =>
      fs.existsSync(f)
    ),
  },
});

const getOptimizationSettings = ({ isEnvProduction }) => ({
  minimize: isEnvProduction,
  minimizer: [
    new TerserPlugin({
      terserOptions: {

        // compress optsions 
        compress: {
          drop_console: isEnvProduction,
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2
        },

        // output optsions 
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
      }
    }),

    // This is only used in production mode
    new CssMinimizerPlugin()
  ],
});

const getResolveSettings = (isEnvProductionProfile) => ({
  // This allows you to set a fallback for where webpack should look for modules.
  // We placed these paths second because we want `node_modules` to "win"
  // if there are any conflicts. This matches Node resolution mechanism.
  // https://github.com/facebook/create-react-app/issues/253
  modules: ['node_modules', paths.appNodeModules].concat(
    modules.additionalModulePaths || []
  ),
  // These are the reasonable defaults supported by the Node ecosystem.
  // We also include JSX as a common component filename extension to support
  // some tools, although we do not recommend using it, see:
  // https://github.com/facebook/create-react-app/issues/290
  // `web` extension prefixes have been added for better support
  // for React Native Web.
  extensions: paths.moduleFileExtensions
    .map(ext => `.${ext}`)
    .filter(ext => useTypeScript || !ext.includes('ts')),
  alias: {
    // Support React Native Web
    // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    'react-native': 'react-native-web',
    // Allows for better profiling with ReactDevTools
    ...(isEnvProductionProfile && {
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    }),
    ...(modules.webpackAliases || {}),
  },
  plugins: [
    // Prevents users from importing files from outside of src/ (or node_modules/).
    // This often causes confusion because we only process files within src/ with babel.
    // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
    // please link the files into your node_modules/ and let module-resolution kick in.
    // Make sure your source files are compiled, as they will not be processed in any way.
    new ModuleScopePlugin(paths.appSrc, [
      paths.appPackageJson,
      reactRefreshRuntimeEntry,
      reactRefreshWebpackPluginRuntimeEntry,
      babelRuntimeEntry,
      babelRuntimeEntryHelpers,
      babelRuntimeRegenerator,
    ]),
  ],
});

const getPlugins = (shouldUseReactRefresh, isEnvProduction, env, isEnvDevelopment) => ([

  // Generates an `index.html` file with the <script> injected.
  new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        inject: true,
        template: paths.appHtml,
      },
      isEnvProduction
        ? {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
        : undefined
    )
  ),

  // Inlines the webpack runtime script. This script is too small to warrant
  // a network request.
  // https://github.com/facebook/create-react-app/issues/5358
  isEnvProduction &&
  shouldInlineRuntimeChunk &&
  new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),

  // Makes some environment variables available in index.html.
  // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
  // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
  // It will be an empty string unless you specify "homepage"
  // in `package.json`, in which case it will be the pathname of that URL.
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),

  // This gives some necessary context to module not found errors, such as
  // the requesting resource.
  new ModuleNotFoundPlugin(paths.appPath),

  // Makes some environment variables available to the JS code, for example:
  // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
  // It is absolutely essential that NODE_ENV is set to production
  // during a production build.
  // Otherwise React will be compiled in the very slow development mode.
  new webpack.DefinePlugin(env.stringified),

  // Experimental hot reloading for React .
  // https://github.com/facebook/react/tree/main/packages/react-refresh
  isEnvDevelopment &&
  shouldUseReactRefresh &&
  new ReactRefreshWebpackPlugin({
    overlay: false,
  }),

  // Watcher doesn't work well if you mistype casing in a path so we use
  // a plugin that prints an error when you attempt to do this.
  // See https://github.com/facebook/create-react-app/issues/240
  isEnvDevelopment && new CaseSensitivePathsPlugin(),
  isEnvProduction &&
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: 'static/css/[name].[contenthash:8].css',
    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
  }),

  // Generate an asset manifest file with the following content:
  // - "files" key: Mapping of all asset filenames to their corresponding
  //   output file so that tools can pick it up without having to parse
  //   `index.html`
  // - "entrypoints" key: Array of files which are included in `index.html`,
  //   can be used to reconstruct the HTML if necessary
  new WebpackManifestPlugin({
    fileName: 'asset-manifest.json',
    publicPath: paths.publicUrlOrPath,
    generate: (seed, files, entrypoints) => {
      const manifestFiles = files.reduce((manifest, file) => {
        manifest[file.name] = file.path;
        return manifest;
      }, seed);
      const entrypointFiles = entrypoints.main.filter(
        fileName => !fileName.endsWith('.map')
      );

      return {
        files: manifestFiles,
        entrypoints: entrypointFiles,
      };
    },
  }),

  // Moment.js is an extremely popular library that bundles large locale files
  // by default due to how webpack interprets its code. This is a practical
  // solution that requires the user to opt into importing specific locales.
  // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
  // You can remove this if you don't use Moment.js:
  new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
  }),

  // Generate a service worker script that will precache, and keep up to date,
  // the HTML & assets that are part of the webpack build.
  isEnvProduction &&
  fs.existsSync(swSrc) &&
  new WorkboxWebpackPlugin.InjectManifest({
    swSrc,
    dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
    exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
    // Bump up the default maximum size (2mb) that's precached,
    // to make lazy-loading failure scenarios less likely.
    // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  }),

  // TypeScript type checking
  useTypeScript &&
  new ForkTsCheckerWebpackPlugin({
    async: isEnvDevelopment,
    typescript: {
      typescriptPath: resolve.sync('typescript', {
        basedir: paths.appNodeModules,
      }),
      configOverwrite: {
        compilerOptions: {
          sourceMap: isEnvProduction
            ? shouldUseSourceMap
            : isEnvDevelopment,
          skipLibCheck: true,
          inlineSourceMap: false,
          declarationMap: false,
          noEmit: true,
          incremental: true,
          tsBuildInfoFile: paths.appTsBuildInfoFile,
        },
      },
      context: paths.appPath,
      diagnosticOptions: {
        syntactic: true,
      },
      mode: 'write-references',
      // profile: true,
    },
    issue: {
      // This one is specifically to match during CI tests,
      // as micromatch doesn't match
      // '../cra-template-typescript/template/src/App.tsx'
      // otherwise.
      include: [
        { file: `../**/${srcFolderPath}/**/*.{ts,tsx}` },
        { file: `**/${srcFolderPath}/**/*.{ts,tsx}` },
      ],
      exclude: [
        { file: `**/${srcFolderPath}/**/__tests__/**` },
        { file: `**/${srcFolderPath}/**/?(*.){spec|test}.*` },
        { file: `**/${srcFolderPath}/setupProxy.*` },
        { file: `**/${srcFolderPath}/setupTests.*` },
      ],
    },
    logger: {
      infrastructure: 'silent',
    },
  }),
  !disableESLintPlugin &&
  new ESLintPlugin({
    // Plugin options
    extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
    formatter: require.resolve('react-dev-utils/eslintFormatter'),
    eslintPath: require.resolve('eslint'),
    failOnError: !(isEnvDevelopment && emitErrorsAsWarnings),
    context: paths.appSrc,
    cache: true,
    cacheLocation: path.resolve(
      paths.appNodeModules,
      '.cache/.eslintcache'
    ),
    // ESLint class options
    cwd: paths.appPath,
    resolvePluginsRelativeTo: __dirname,
    baseConfig: {
      extends: [require.resolve('eslint-config-react-app/base')],
      rules: {
        ...(!hasJsxRuntime && {
          'react/react-in-jsx-scope': 'error',
        }),
      },
    },
  }),
].filter(Boolean));

const getModuleSettings = (shouldUseReactRefresh, isEnvDevelopment, isEnvProduction) => {

  const appJSLoader = getAppJSLoader(shouldUseReactRefresh, paths.appSrc, hasJsxRuntime, isEnvDevelopment, isEnvProduction);
  const externalJSLoader = getExternalJSLoader(shouldUseSourceMap, isEnvProduction, isEnvDevelopment);

  const styleLoaderGeneratorFunciton = styleLoaderGen(shouldUseSourceMap, isEnvProduction, isEnvDevelopment);
  const cssLoader = getCssLoader(styleLoaderGeneratorFunciton);
  const cssModuleLoader = getCssModuleLoader(styleLoaderGeneratorFunciton, getCSSModuleLocalIdent);
  const sassLoader = getSassLoader(styleLoaderGeneratorFunciton);
  const sassModuleLoader = getSassModuleLoader(styleLoaderGeneratorFunciton, getCSSModuleLocalIdent);

  const loaderRule = {
    // "oneOf" will traverse all following loaders until one will
    // match the requirements. When no loader matches it will fall
    // back to the "file" loader at the end of the loader list.
    oneOf: [
      avifLoader,
      imageLoader,
      svgLoader,
      appJSLoader,
      externalJSLoader,
      cssLoader,
      cssModuleLoader,
      sassLoader,
      sassModuleLoader,
      // last
      fileLoader
    ],
  };

  // Handle node_modules packages that contain sourcemaps 
  const sourceMapRule = {
    enforce: 'pre',
    exclude: /@babel(?:\/|\\{1,2})runtime/,
    test: /\.(js|mjs|jsx|ts|tsx|css)$/,
    loader: require.resolve('source-map-loader'),
  };

  return ({
    strictExportPresence: true,
    rules: shouldUseSourceMap
      ? [sourceMapRule, loaderRule]
      : [loaderRule]
  });
};

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = function (webpackEnv) {

  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const envFlags = { isEnvDevelopment, isEnvProduction };

  // Variable used for enabling profiling in Production
  // passed into alias object. Uses a flag if passed into the build command
  const isEnvProductionProfile = isEnvProduction && process.argv.includes('--profile');

  console.log(`isEnvDevelopment: ${isEnvDevelopment}`);
  console.log(`isEnvProduction: ${isEnvProduction}`);
  console.log(`isEnvProductionProfile: ${isEnvProductionProfile}`);

  // We will provide `paths.publicUrlOrPath` to our app
  // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
  // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
  // Get environment variables to inject into our app.
  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

  const shouldUseReactRefresh = env.raw.FAST_REFRESH;

  const outputSettings = getOutputSettings(envFlags);
  const devtoolSettings = getDevtoolSetting(envFlags);
  const cacheSettings = getCacheSettings({ env });
  const optimizationSettings = getOptimizationSettings(envFlags);
  const resolveSettings = getResolveSettings(isEnvProductionProfile);
  const plugins = getPlugins(shouldUseReactRefresh, isEnvProduction, env, isEnvDevelopment);
  const moduleSettings = getModuleSettings(shouldUseReactRefresh, isEnvDevelopment, isEnvProduction);

  return {
    stats: 'errors-warnings',
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    devtool: devtoolSettings,
    entry: paths.appIndexJs,
    output: outputSettings,
    cache: cacheSettings,
    infrastructureLogging: {
      level: 'none',
    },
    externals: {
      date: 'Date'
    },
    optimization: optimizationSettings,
    resolve: resolveSettings,
    module: moduleSettings,
    plugins: plugins,
    performance: false,
  };
};
