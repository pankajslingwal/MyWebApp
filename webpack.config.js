var webpack = require("webpack");      

var config = {
      entry: __dirname + '/public/js/user-profile.jsx',

      output: {
        path: __dirname + '/public/js/',
        filename: 'user-profile.js'
      },
      watch: true,


      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
      }
    }

    module.exports = config;