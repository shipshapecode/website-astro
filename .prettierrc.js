'use strict';

/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: 'always',
  astroAllowShorthand: false,
  trailingComma: 'none',
  semi: true,
  singleQuote: true,
  proseWrap: 'always',
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ]
};
