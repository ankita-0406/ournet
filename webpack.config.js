const DefinePlugin = require('webpack').DefinePlugin;
const fs = require('fs');
const xmldoc = require('xmldoc');
// const polyfill = require("babel-polyfill");
// const pomContent = fs.readFileSync("../Server/pom.xml");
// const pomVersion = new xmldoc.XmlDocument(pomContent).valueWithPath("version");
// const version = pomVersion ? pomVersion : "1.0.0(u)-SNAPSHOT";
// const releaseVersion = "beta";//option: [alpha, beta]

var path = require('path');

module.exports = {
    
    entry: ['babel-polyfill', './app/developer.js'],
    output:{
        path : path.resolve(__dirname,'build'),
        publicPath:'/build/',
        filename : 'developer.bundle.js'
    },
    module:{        
        rules:[
            {
              test:/\.(js)$/,
              use:'babel-loader'
            },{
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'url-loader?limit=10000&name="[name]-[hash].[ext]"'
            },
            {
                test: /fonts\/.*\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader?name="[name]-[hash].[ext]"'
            },
            {
                test:/\.(css)$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            }
        ]
    },
    mode:'development',
    devServer:{
        port:4000,
        // https:true,
        proxy: {
            "/api/*": {
                target: 'http://35.181.59.1:8080'
            },
            "/auth/*": {
                target: 'http://35.181.59.1:8080'
            },
            "/media/*": {
                target: 'http://35.181.59.1:8080'
            }
        },
        historyApiFallback:{
            html:'index.html'
        }
    }
}