// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

// TODO: Merge this config once `image/avif` is in the mime-db
// https://github.com/jshttp/mime-db
const avifLoader = {
    test: [/\.avif$/],
    type: 'asset',
    mimetype: 'image/avif',
    parser: {
        dataUrlCondition: {
            maxSize: imageInlineSizeLimit,
        },
    },
};

// "url" loader works like "file" loader except that it embeds assets
// smaller than specified limit in bytes as data URLs to avoid requests.
// A missing `test` is equivalent to a match.
const imageLoader = {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    type: 'asset',
    parser: {
        dataUrlCondition: {
            maxSize: imageInlineSizeLimit,
        },
    },
};

const svgLoader = {
    test: /\.svg$/,
    use: [
        {
            loader: require.resolve('@svgr/webpack'),
            options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                    plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
                ref: true,
            },
        },
        {
            loader: require.resolve('file-loader'),
            options: {
                name: 'static/media/[name].[hash].[ext]',
            },
        },
    ],
    issuer: {
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
    },
};

// Process application JS with Babel.
// The preset includes JSX, Flow, TypeScript, and some ESnext features.
const getAppJSLoader = (shouldUseReactRefresh, srcFolderPath, hasJsxRuntime, isEnvDevelopment, isEnvProduction) => ({
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: srcFolderPath,
    loader: require.resolve('babel-loader'),
    options: {
        customize: require.resolve(
            'babel-preset-react-app/webpack-overrides'
        ),
        presets: [
            [
                require.resolve('babel-preset-react-app'),
                {
                    runtime: hasJsxRuntime ? 'automatic' : 'classic',
                },
            ],
        ],

        plugins: [
            isEnvDevelopment &&
            shouldUseReactRefresh &&
            require.resolve('react-refresh/babel'),
        ].filter(Boolean),
        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        cacheDirectory: true,
        // See #6846 for context on why cacheCompression is disabled
        cacheCompression: false,
        compact: isEnvProduction,
    },
});

// Process any JS outside of the app with Babel.
// Unlike the application JS, we only compile the standard ES features.
const getExternalJSLoader = (shouldUseSourceMap) => ({
    test: /\.(js|mjs)$/,
    exclude: /@babel(?:\/|\\{1,2})runtime/,
    loader: require.resolve('babel-loader'),
    options: {
        babelrc: false,
        configFile: false,
        compact: false,
        presets: [
            [
                require.resolve('babel-preset-react-app/dependencies'),
                { helpers: true },
            ],
        ],
        cacheDirectory: true,
        // See #6846 for context on why cacheCompression is disabled
        cacheCompression: false,

        // Babel sourcemaps are needed for debugging into node_modules
        // code.  Without the options below, debuggers like VSCode
        // show incorrect code and set breakpoints on the wrong lines.
        sourceMaps: shouldUseSourceMap,
        inputSourceMap: shouldUseSourceMap,
    },
});

// "postcss" loader applies autoprefixer to our CSS.
// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader turns CSS into JS modules that inject <style> tags.
// In production, we use MiniCSSExtractPlugin to extract that CSS
// to a file, but in development "style" loader enables hot editing
// of CSS.
// By default we support CSS Modules with the extension .module.css
const getCssLoader = (getStyleLoaders) => ({
    test: cssRegex,
    exclude: cssModuleRegex,
    use: getStyleLoaders(
        {
            importLoaders: 1,
            sourceMap: isEnvProduction
                ? shouldUseSourceMap
                : isEnvDevelopment,
            modules: {
                mode: 'icss',
            },
        }),
    // Don't consider CSS imports dead code even if the
    // containing package claims to have no side effects.
    // Remove this when webpack adds a warning or an error for this.
    // See https://github.com/webpack/webpack/issues/6571
    sideEffects: true,
});

// Adds support for CSS Modules (https://github.com/css-modules/css-modules)
// using the extension .module.css
const getCssModuleLoader = (getStyleLoaders, getCSSModuleLocalIdent) => ({
    test: cssModuleRegex,
    use: getStyleLoaders(
        {
            importLoaders: 1,
            sourceMap: isEnvProduction
                ? shouldUseSourceMap
                : isEnvDevelopment,
            modules: {
                mode: 'local',
                getLocalIdent: getCSSModuleLocalIdent,
            },
        }),
});

// Opt-in support for SASS (using .scss or .sass extensions).
// By default we support SASS Modules with the
// extensions .module.scss or .module.sass
const getSassLoader = (getStyleLoaders) => ({
    test: sassRegex,
    exclude: sassModuleRegex,
    use: getStyleLoaders(
        {
            importLoaders: 3,
            sourceMap: isEnvProduction
                ? shouldUseSourceMap
                : isEnvDevelopment,
            modules: {
                mode: 'icss',
            },
        },
        'sass-loader'
    ),
    // Don't consider CSS imports dead code even if the
    // containing package claims to have no side effects.
    // Remove this when webpack adds a warning or an error for this.
    // See https://github.com/webpack/webpack/issues/6571
    sideEffects: true,
});

// Adds support for CSS Modules, but using SASS
// using the extension .module.scss or .module.sass
const getSassModuleLoader = (getStyleLoaders, getCSSModuleLocalIdent) => ({
    test: sassModuleRegex,
    use: getStyleLoaders(
        {
            importLoaders: 3,
            sourceMap: isEnvProduction
                ? shouldUseSourceMap
                : isEnvDevelopment,
            modules: {
                mode: 'local',
                getLocalIdent: getCSSModuleLocalIdent,
            },
        },
        'sass-loader'
    ),
});

// "file" loader makes sure those assets get served by WebpackDevServer.
// When you `import` an asset, you get its (virtual) filename.
// In production, they would get copied to the `build` folder.
// This loader doesn't use a "test" so it will catch all modules
// that fall through the other loaders.
const fileLoader = {
    // Exclude `js` files to keep "css" loader working as it injects
    // its runtime that would otherwise be processed through "file" loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpacks internal loaders.
    exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
    type: 'asset/resource',
};

module.exports = {
    avifLoader,
    getCssLoader,
    getCssModuleLoader,
    getExternalJSLoader,
    fileLoader,
    getAppJSLoader,
    imageLoader,
    getSassModuleLoader,
    getSassLoader,
    svgLoader,
};