module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['simple-import-sort'],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'func-style': 'error',
    'no-restricted-syntax': ['error', 'VariableDeclaration[kind!="var"]'],
    'object-shorthand': 'error',
    'simple-import-sort/imports': 'error',
  },
};
