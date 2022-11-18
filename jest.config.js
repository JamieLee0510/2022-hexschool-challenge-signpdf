/** @type {import('jest').Config} */

const { pathsToModuleNameMapper } = require('ts-jest')
const aliases = require('./tsconfig.alias.json')

module.exports = {
    verbose: true,

    testEnvironment: 'jsdom', //  ReferenceError: document is not defined; Consider using the "jsdom" test environment.
    // preset: 'ts-jest',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'scss'],
    // transform: {
    //     '^.+\\.tsx?$': 'ts-jest',
    //     '^.+\\.ts?$': 'ts-jest',
    // },

    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
        '\\.(jpg|jpeg|png|gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
        'pdfjs-dist/(.*)': 'pdfjs-dist/legacy/$1',
        // '^@base/(.*)$': '<rootDir>/src/$1',
        ...pathsToModuleNameMapper(aliases.compilerOptions.paths, {
            prefix: '<rootDir>/',
        }),
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}
