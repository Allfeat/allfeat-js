/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*': 'prettier --write --ignore-unknown',
  '*.mjs,*.js,*.ts': 'eslint --fix',
}
