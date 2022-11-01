const path = require('path');

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    target: 'node',
    output: {
        filename: 'deployScriptGen.js',
        path: path.resolve(__dirname, 'out'),
    },
    //   devServer: {
    //     static: path.join(__dirname, "out"),
    //     compress: true,
    //     port: 4000,
    //   },
};