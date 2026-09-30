import js from '@eslint/js';
import globals from 'globals';
import hooks from 'eslint-plugin-react-hooks';
import refresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
export default [
 { ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', 'artifacts/**', '.agents/**', '.claude/**', '.codex/**'] },
 { files: ['**/*.{js,jsx,mjs}'], ...js.configs.recommended,
 languageOptions: { ecmaVersion: 'latest', sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } }, globals: { ...globals.browser, ...globals.node } },
 plugins: { 'react-hooks': hooks, 'react-refresh': refresh, react },
 rules: { ...hooks.configs.recommended.rules, 'react/jsx-uses-vars': 'error', 'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }], 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }] }
 }
];
