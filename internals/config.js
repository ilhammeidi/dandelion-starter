const { resolve } = require('path');
const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');

const ReactBoilerplate = {
  // This refers to the react-boilerplate version this project is based on.
  version: '3.6.0',

  /**
   * The DLL Plugin provides a dramatic speed increase to webpack build and hot module reloading
   * by caching the module metadata for all of our npm dependencies. We enable it by default
   * in development.
   *
   *
   * To disable the DLL Plugin, set this value to false.
   */
  dllPlugin: {
    defaults: {
      /**
       * we need to exclude dependencies which are not intended for the browser
       * by listing them here.
       */
      exclude: [
        '@date-io/moment',
        '@emotion/react',
        '@emotion/server',
        '@emotion/styled',
        '@mui/material',
        '@mui/x-date-pickers',
        '@react-dnd',
        '@reduxjs/toolkit',
        'autosuggest-highlight',
        'chalk',
        'compression',
        'convert-source-map',
        'cross-env',
        'dotenv',
        'dnd-core',
        'eslint-webpack-plugin',
        'etag',
        'express',
        'fs',
        'html-webpack-plugin',
        'ip',
        'lint-staged',
        'minimist',
        'moment',
        'mui-datatables',
        'optimize-css-assets-webpack-plugin',
        'react-trello',
        'sanitize.css',
        'serve-favicon',
        'slick-carousel',
        'tunnel-agent',
        'terser-webpack-plugin',
        'url-loader'
      ],

      /**
       * Specify any additional dependencies here. We include core-js and lodash
       * since a lot of our dependencies depend on them and they get picked up by webpack.
       */
      include: ['core-js', 'eventsource-polyfill', 'lodash'],

      // The path where the DLL manifest and bundle will get built
      path: resolve('../node_modules/react-boilerplate-dlls'),
    },

    entry(pkg) {
      const dependencyNames = Object.keys(pkg.dependencies);
      const exclude = pkg.dllPlugin.exclude || ReactBoilerplate.dllPlugin.defaults.exclude;
      const include = pkg.dllPlugin.include || ReactBoilerplate.dllPlugin.defaults.include;
      const includeDependencies = uniq(dependencyNames.concat(include));

      return {
        reactBoilerplateDeps: pullAll(includeDependencies, exclude),
      };
    },
  },
};

module.exports = ReactBoilerplate;
