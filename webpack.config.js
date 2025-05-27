const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/cherry.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cherry.js',
    library: 'Cherryglsl',             // 🌐 Global variable
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'               // ✅ Fix for browser & Node compatibility
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.glsl$/,
        use: 'glsl-shader-loader',
      }
    ]
  },
 
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
};
