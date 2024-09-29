module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react-refresh', 'import'],
  rules: {
    "no-var": "error",                // Proíbe o uso de var
    "curly": "error",                 // Exige chaves para todos os blocos de controle
    "prefer-const": "error",          // Sugere usar const quando a variável não é reatribuída
    "prettier/prettier": "error",     // Faz com que erros do Prettier sejam tratados como erros do ESLint
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/newline-after-import': ['error', { count: 1 }],
  },
};
