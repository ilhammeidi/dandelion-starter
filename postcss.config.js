var autoprefixer = require('autoprefixer'); // eslint-disable-line

module.exports = {
  plugins: [
    autoprefixer({ browsers: 'last 2 versions' })
  ]
};
