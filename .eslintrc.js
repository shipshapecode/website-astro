module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:astro/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {},
  overrides: [
    // node files
    {
      files: ['./.eslintrc.js', './src/styles/tailwind/plugins/**/*.js'],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign(
        {},
        require('eslint-plugin-node').configs.recommended.rules,
        {
          // add your custom rules and overrides for node files here

          // this can be removed once the following is fixed
          // https://github.com/mysticatea/eslint-plugin-node/issues/77
          'node/no-unpublished-require': 'off',
          '@typescript-eslint/no-var-requires': 'off'
        }
      )
    },
    // SolidJS files
    {
      files: ['*.tsx'],
      plugins: ['jsx-a11y', 'solid'],
      extends: ['plugin:jsx-a11y/recommended', 'plugin:solid/typescript'],
      rules: {
        // For some reason, this rule always says our inputs have no labels
        'jsx-a11y/label-has-associated-control': 'off'
      }
    },
    // Astro files
    {
      // Define the configuration for `.astro` file.
      files: ['*.astro'],
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      }
    }
  ]
};
