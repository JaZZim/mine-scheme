module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: [
          'src',
        ],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': [
        '.ts',
        '.tsx',
      ],
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      project: 'tsconfig.json',
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jsx-a11y',
  ],
  rules: {
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'max-len': [
      1,
      {
        code: 120,
        ignoreStrings: true,
      },
    ],
    'react/jsx-filename-extension': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 1,
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 0,
    'consistent-return': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 2,
  },
  overrides: [
    {
      files: [
        'src/store/**/*.ts',
        'src/modules/Workspace/**/*.ts',
        'src/modules/Workspace/**/*.tsx',
      ],
      rules: {
        'no-param-reassign': 0,
        'import/no-cycle': 0,
      },
    },
  ],
};
