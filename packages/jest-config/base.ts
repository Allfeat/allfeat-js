import type { Config } from 'jest'

const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['__fixtures__/', '/__tests__/test-utils.ts'],
  coveragePathIgnorePatterns: ['__fixtures__/', '/__tests__/test-utils.ts'],
  transformIgnorePatterns: ['node_modules/*', 'packages/turbo-workspaces/*'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
  collectCoverage: true,
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
} as const satisfies Config

export default config
