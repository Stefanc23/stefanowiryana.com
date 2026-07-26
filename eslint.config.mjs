import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig(
  ...nextTypescript,
  ...nextVitals,
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  reactHooks.configs.flat.recommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      'import-plugin': importPlugin,
      'react-hooks': reactHooks,
      prettier: prettier,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': 'warn',
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // ext library & side effect imports
            ['^@?\\w', '^\\u0000'],
            // {s}css files
            ['^.+\\.s?css$'],
            // Other imports
            ['^@/'],
            // other that didnt fit in
            ['^'],
          ],
        },
      ],
      'import-plugin/no-relative-packages': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
);

export default eslintConfig;
