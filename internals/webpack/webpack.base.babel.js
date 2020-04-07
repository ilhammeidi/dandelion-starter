/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
    },
    options.output,
  ), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      /*
        Disabled eslint by default.
        You can enable it to maintain and keep clean your code.
        NOTE: By enable eslint running app process at beginning will slower
      */
      //      {
      //        enforce: 'pre',
      //        test: /\.js?$/,
      //        exclude: [/node_modules/],
      //        loader: 'eslint-loader',
      //        options: {
      //          quiet: true,
      //        }
      //      },
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'happypack/loader?id=js',
          options: options.babelQuery,
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options:
          {
            sourceMap: false,
            importLoaders: 2,
            modules: true,
            localIdentName: '[local]__[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: false
          }
        },
        {
          loader: 'sass-loader',
          options: {
            outputStyle: 'expanded',
            sourceMap: false
          }
        }],
      },
      {
        test: /\.md$/,
        use: 'raw-loader'
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
          /*
            Disabled image compression by default,
            due error in windows 10 because libpng not available.
            The libpng avaible on Linux and Mac system only.
            NOTE: To enable this, first you need to install image-webpack-loader.
            npm install -i image-webpack-loader --save
          */
          //  {
          //    loader: 'image-webpack-loader',
          //    options: {
          //      mozjpeg: {
          //        enabled: false,
          //        // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
          //        // Try enabling it in your environment by switching the config to:
          //        // enabled: true,
          //        // progressive: true,
          //      },
          //      gifsicle: {
          //        interlaced: false,
          //      },
          //      optipng: {
          //        optimizationLevel: 7,
          //      },
          //      pngquant: {
          //        quality: '65-90',
          //        speed: 4,
          //      },
          //    },
          //  },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  node: {
    fs: 'empty'
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory=true']
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new webpack.ContextReplacementPlugin(/^\.\/locale$/, context => {
      if (!/\/moment\//.test(context.context)) { return; }
      // context needs to be modified in place
      Object.assign(context, {
        // include only CJK
        regExp: /^\.\/(ja|ko|zh)/,
        // point to the locale data folder relative to moment's src/lib/locale
        request: '../../locale'
      });
    })
  ]),
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
    alias: {
      'dan-components': path.resolve(__dirname, '../../app/components/'),
      'dan-actions': path.resolve(__dirname, '../../app/actions/'),
      'dan-styles': path.resolve(__dirname, '../../app/styles/components/'),
      'dan-api': path.resolve(__dirname, '../../app/api/'),
      'dan-images': path.resolve(__dirname, '../../public/images/'),
      'dan-vendor': path.resolve(__dirname, '../../node_modules/'),
    }
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
