/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: false,
    },
  },
};
