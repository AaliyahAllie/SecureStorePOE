const path = require('path');
const createJestConfig = require('react-scripts/scripts/utils/createJestConfig');

module.exports = createJestConfig(
  relativePath => path.resolve(__dirname, 'node_modules', 'react-scripts', relativePath),
  __dirname
);
