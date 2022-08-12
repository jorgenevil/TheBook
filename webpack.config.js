const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const config = {
    entry: './src/index.ts',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      static: './dist',
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'ts-loader'
        },
      ],
    },
    resolve: {
      extensions: [
        '.ts',
        '.js',
      ],
    },    
    plugins: []
  };

  if (argv.mode === 'development') {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return config;
};
