module.exports = {
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/{!(server),}.ts"
    ],
    coverageReporters: ["text-summary"],
    coverageThreshold: {
        "global": {
            "branches": 60,
            "functions": 70,
            "lines": 70,
            "statements": 70
        }
    }
}