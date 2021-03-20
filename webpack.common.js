const path = require('path');
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//import {materialImporter} from './webpack_material_importer.js';
/*

     main: './src/index.js',
     
     app: './src/index.js',
     */
/*
iu iframeuploads 
*/
/* 
    uc:'./notes/lab/u/upload_class.js',

     iu: './notes/lab/uploadIframe.js',
     uc:'./notes/lab/uploadIframe.scss',
     uc2:'./notes/lab/u/cssfile.scss',

  resolve: {
    extensions: ['.css', '.scss'],
  },

*/
 module.exports = {
   entry: {
     twit: './dev/app.js',
   },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist/js'),
   },
   module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.s[ac]ss$/i,
          use: [  
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              },
            }, 
            "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                sassOptions: {
                  outputStyle: "compressed",
                },
              },
            }
          ],
        }, 
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        { 
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
      ]
   },
   plugins: [ 
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
   ],
 };

 /*

 
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        '$': 'jquery',
        'window.jQuery': 'jquery',
    }), 
    
     iuc: './notes/lab/uploadIframe.scss',

        {
          test: /\.s[ac]ss$/i,
          use: [
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                sassOptions: {
                  outputStyle: "compressed",
                },
              },
            },
          ],
        },
 */

 /*!!raw-loader!,
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
     // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
     new CleanWebpackPlugin(),
 ,
      chunks: ['main', 'owl_carousel']
      

   plugins: [
     new HtmlWebpackPlugin({ 
      template: './assets/pages/faqs/faq1.ejs',
      filename: 'faq1.ejs',
     }),
   ],
      */