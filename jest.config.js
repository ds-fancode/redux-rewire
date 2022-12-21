module.exports = {
  // setupFilesAfterEnv: ['./jest.mock.js'],
  // Only match files that strictly ends with __tests__.ts or spec.ts
  testRegex: "\\.(__tests__|spec)\\.ts$",
  testMatch: null,
  moduleFileExtensions: ["ts", "tsx", "js"],
  collectCoverageFrom: ["src/**/**.(ts|tsx)", "!src/**/**.d.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFiles: [
    // '../../jest.setup.ts'
  ],
};
