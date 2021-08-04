const path = require("path");
const fs = require("fs");
const CopyPlugin = require("copy-webpack-plugin");

const nodeModules = {};

fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });


module.exports = {
    entry: './server.ts',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },
    devtool: 'source-map',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
        ],
    },
    mode: "production",
    resolve: {
        extensions: ['.ts', '.js'],
    },
    externals: nodeModules,
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./package.json", to: "./" },
                { from: "./yarn.lock", to: "./" },
            ],
        }),
    ],
}