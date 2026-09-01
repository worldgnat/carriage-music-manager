import { defineConfig } from 'jest'

export default defineConfig({
    collectCoverage: true,
    collectCoverageFrom: ['./src/**'],
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    }
})