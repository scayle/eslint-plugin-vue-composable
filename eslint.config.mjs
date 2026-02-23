import globals from 'globals'
import js from '@eslint/js'
import n from 'eslint-plugin-n'
import eslintPlugin from 'eslint-plugin-eslint-plugin'

export default [
  eslintPlugin.configs.recommended,
  js.configs.recommended,
  n.configs['flat/recommended-module'],
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
    },
  },
  {
    files: ['lib/**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
  },
  {
    files: ['tests/**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
  },
]
