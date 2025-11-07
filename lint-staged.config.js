module.exports = {
  // '*': 'echo "No linting applied"',
  '*': ['eslint --fix --no-warn-ignored'],
  '**/*.ts?(x)': () => 'npm run check-types',
};
