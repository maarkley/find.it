var path = require('path')
var webpack = require('webpack')
var combineLoaders = require('webpack-combine-loaders')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
console.log('dirname: ', __dirname)
module.exports = {
    entry: './src/entry.js',
    output: {
        path: __dirname + '/public/js/',
        filename: "bundle.js",
        publicPath: '/public/js/'
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [{
            test: /.js/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react', 'stage-2'],
                plugins: ['transform-decorators-legacy']
            }
        },
        {
            test: /\.(png|jpg|svg)$/,
            use: {
                loader: 'file-loader'
            }
        },
        {
        test: /.css$/,
        loaders: combineLoaders([
            
                {
                    loader: 'style-loader'  
                },
                {
                    loader: 'css-loader'
                }, 
                {
                    loader: 'sass-loader'   
                }          
            ]),
            exclude: /node_modules/
        }]
    },
    devServer: {
        host: 'find.it',
        contentBase: './public'
    }
}