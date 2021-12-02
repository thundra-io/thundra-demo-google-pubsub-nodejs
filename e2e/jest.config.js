const config = {
    testPathIgnorePatterns: ['./__tests__/config'],
    globalSetup: './__tests__/config/setup/global-setup.js',
    setupFilesAfterEnv: ['./__tests__/config/extensions/expect-eventually.js'],
    name: 'jest-thundra-pubsub-e2e',
    verbose: true,
    testRunner: 'jest-circus/runner',
    testEnvironment: '@thundra/core/dist/bootstrap/foresight/jest/JestDefaultEnvironment.js'
};

module.exports = config;

