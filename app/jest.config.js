module.exports = {
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/tests/mock.js',
        '\\.(css|less)$': 'identity-obj-proxy',
        "axios": "axios/dist/node/axios.cjs"
    },
    transform: {
        "\\.[jt]sx?$": "babel-jest"
    },
    testEnvironment: "jsdom",
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Test Report"
        }]
    ],
    collectCoverageFrom: ["src/**/*.js", "src/*.js", "!**/node_modules/**"],
    coverageReporters: ["html", "text", "text-summary", "cobertura"],
    //testMatch: ["src/tests/*.test.js"]
}
