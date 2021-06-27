const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: "./src/App.js",
    output: {
        path: path.resolve(__dirname, "./static"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    optimization: {
        minimize: true,
    },
}