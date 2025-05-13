// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    // Dedot types generation cause a lot of linting errors.
    // So for the moment we just disable linting for generated types.
    ignores: ['packages/chaintypes/**/*.d.ts', '**/dist/**'],
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
)
