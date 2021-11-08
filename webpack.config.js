const path = require('path');
const  HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');



const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['./index.js'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        port: 4200,
        hot: isDev,
        historyApiFallback: true
    },
   plugins : [
            new HTMLWebpackPlugin({
                filename: 'index.html',
                template: './index.html'
            }),
           new HTMLWebpackPlugin({
               filename: 'user_profile_page.html',
               template: './user_profile_page.html'
           }),
            new CleanWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:  {
                    loader: 'babel-loader'
                }
            }]
    }

    }