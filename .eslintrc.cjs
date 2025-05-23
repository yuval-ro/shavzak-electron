module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier'
  ],
  rules: {
    'react/prop-types': 'off'
  },
  settings: {
    'import/resolver': {
      alias: [['#src', './src/renderer/src']]
    }
  }
}
