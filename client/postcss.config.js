const path = require('path');

module.exports = {
  plugins: {
    'postcss-import': {
      resolve(id, basedir) {
        if (/^@cssVariables/.test(id)) return path.resolve('./web/css', 'variables.css');
        return path.resolve(basedir, id);
      }
    },
    'postcss-preset-env': {
      stage: 0,
      features: {
        'custom-properties': {
          preserve: false
        },
        'custom-media': {
          preserve: false
        },
        'color-mod-function': {
          unresolved: 'warn'
        }
      }
    },
    'postcss-flexbugs-fixes': {},
  },
};
