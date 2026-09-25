module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
};