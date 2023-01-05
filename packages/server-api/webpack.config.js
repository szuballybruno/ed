import path from 'path';
import { fileURLToPath } from 'url';
import nodeExternals from "webpack-node-externals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: `${__dirname}/src/server.ts`,
    target: 'node',
    output: {
        path: `${__dirname}/dist/`,
    },
    externals: [
        nodeExternals()
    ],
    externalsPresets: {
        node: true
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(ts|tsx)$/i,
                use: 'ts-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ],
    },
    experiments: {
        topLevelAwait: true
    },
    stats: {
        errorDetails: true
    }
};