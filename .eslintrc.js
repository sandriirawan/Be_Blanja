module.exports = {
    env: {
      node: true,
    },
    globals: {
      require: 'readonly', 
      module: 'readonly', 
      process: 'readonly', 
    },
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }], 
    },
  };
