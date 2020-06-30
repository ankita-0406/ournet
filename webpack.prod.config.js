var CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const fs = require('fs');
const xmldoc = require('xmldoc');
var webpack = require('webpack');

const pomContent = fs.readFileSync("../Server/pom.xml");
const pomVersion = new xmldoc.XmlDocument(pomContent).valueWithPath("version");
const version = pomVersion ? pomVersion : "1.0.0(u)-SNAPSHOT";
const releaseVersion = "beta";//option: [alpha, beta]
// const UglifyJsPlugin = require("uglifyjs-3-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var path = require('path');

const DIST = '../server/ournet-starter/resources';

module.exports = {

    entry: ['@babel/polyfill' , './app/developer.js'],
    output: {
        path: path.resolve(__dirname, DIST),
        filename: 'developer.bundle.js'
    },
    module: {
        noParse: /node_modules\/quill\/dist\/quill\.js/,
        rules: [
            {
                test: /\.(js)$/,
                use: 'babel-loader'
            }, {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'url-loader?limit=10000&name="[name]-[hash].[ext]"'
            },
            {
                test: /fonts\/.*\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader?name="[name]-[hash].[ext]"'
            },
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './index.html'),
                to: path.resolve(__dirname, DIST),
                force: true
            }, {
                from: path.resolve(__dirname, './favicon.ico'),
                to: path.resolve(__dirname, DIST),
                force: true
            },
            {
                from: path.resolve(__dirname, './style/'),
                to: path.resolve(__dirname, DIST + '/style'),
                force: true
            },
            {
                from: path.resolve(__dirname, './jslib/'),
                to: path.resolve(__dirname, DIST + '/jslib'),
                force: true
            },
            {
                from: path.resolve(__dirname, './img/'),
                to: path.resolve(__dirname, DIST + '/img'),
                force: true
            },
            {
                from: path.resolve(__dirname, './fonts/'),
                to: path.resolve(__dirname, DIST + '/fonts'),
                force: true
            }
        ]),
        new DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'GA_TRACK_ID': JSON.stringify('UA-91324832-1'),
                'APP_VERSION': JSON.stringify(version),
                'RELEASE_VERSION': JSON.stringify(releaseVersion),
            }
        }),
    ],
    optimization: {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
              ie8: true,
              safari10: true,
              sourceMap: true
            }
          })
        ]
      },
    mode: 'production',
    performance: {
        hints: false
    },
    devtool: false
}