const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  watch: true,
  entry: './app/src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015'
        }
      },
      {
        test: /\.css?$/,
        use: [
          'style-loader',
           {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.css', '.ts', '.js', '.json' ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../H5P.Survey/'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'app/src/**.json',
          to: '[name][ext]'
        },
        {
          from: 'H5P.Survey',
          to: './dev/repos/h5p-survey'
        },
        {
          from: 'H5PEditor.RangeList',
          to: './dev/repos/h5p-editor-range-list'
        },
        {
          from: 'H5PEditor.ShowWhen',
          to: './dev/repos/h5p-editor-show-when'
        },
        {
          from: 'H5PEditor.TableList',
          to: './dev/repos/h5p-editor-table-list'
        },
        {
          from: 'app/content/**.json',
          to: './dev/repos/h5p-survey/content/[name][ext]'
        },
        {
          from: 'app/content/audio/*.wav',
          to:  './dev/repos/h5p-survey/content/audio/[name][ext]'
        }
      ]
    })
  ]
};
