const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

    mode: "production",
    target: 'node',
    entry: {
        app: './index.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};