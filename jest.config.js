module.exports = {
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  automock: false,
  browser: false,
  bail: false,
  rootDir: './',
  globals: {
    __DEV__: true,
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  moduleNameMapper: {
    '\\.(css|less|styl|scss|sass|sss)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^(?!.*\\.(js|jsx|json|css|less|styl|scss|sass|sss)$)':
      '<rootDir>/tests/file-transformer.js',
  },
  verbose: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'html'],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'test-task-exchange-converter',
        outputDirectory: './coverage',
        outputName: 'junit.xml',
        uniqueOutputName: false,
        classNameTemplate: '{classname}-{title}',
        titleTemplate: '{classname}-{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: true,
      },
    ],
  ],
}
