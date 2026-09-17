import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import Dotenv from 'dotenv-webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a module to export an object the specific configuration

export default {
  entry: "./src/index.js", // App entry point
  output: {
    // Folder result after the compilation
    path: path.resolve(__dirname, "dist"), //obtain the directory path (local or server)
    filename: "[name].[contenthash].js",
    assetModuleFilename: 'assets/images/[hash][ext][query]',
    clean: true,
  },
  resolve: {
    extensions: [".js"], // project extentions that webpack should identify
    alias:{
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    },
  },
  module: { // Module: object with rules inside
    rules: [ // Rules: some conditions to work with babel-loader
      
      {
        test: /\.m?js$/,  // Regex that evaluates if a file extension is .js or .mjs in  node_modules/ folder to avoid process it
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader, 
          'css-loader',
          'stylus-loader'
        ],
      },
      {
        test: /\.png/,
        type:'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset',
        generator: {
          filename: 'assets/fonts/[name].[contenthash].[ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10000, // same threshold url-loader used with "limit"
          },
        },
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
        inject: true,
        template: './public/index.html',
        filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename:'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns:[
        {
          from: path.resolve(__dirname, 'src', 'assets/images'),
          to:'assets/images'
        }
      ]
    }),
    new Dotenv(),
  ],
  optimization:{
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }
};
