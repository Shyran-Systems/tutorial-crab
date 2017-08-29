const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const CONTENT_DIR = path.resolve(__dirname, 'src')
const PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
    entry: './src/app/index.jsx',
    output: {
        publicPath: 'http://localhost:8080/',
        filename: 'public/bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('public/styles.css', {
            allChunks: true
        }),
        new Dotenv({
            path: PRODUCTION ? './.env' : './.env.local', // Path to .env file (this is the default)
            safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
        })
    ],
    devServer: {
        contentBase: CONTENT_DIR,
        open: true,
        inline: true,
        port: 4000,
        historyApiFallback: {
            index: 'index.html'
        }
    }
}
