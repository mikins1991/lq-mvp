module.exports = {
  extends: ['react-app', 'prettier', 'next/core-web-vitals'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
    semi: 0,
    'linebreak-style': 0,
    'max-len': [
      'error',
      {
        code: 110,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    'no-dupe-keys': ['error'],
    'no-console': 2,
    'jsx-a11y/anchor-is-valid': 0,
    'react-hooks/exhaustive-deps': 0,
  },
  settings: {
    react: {
      version: '16',
    },
  },
};
