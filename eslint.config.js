module.exports = [
  {
    files: ['packages/domain/src/**/*.js'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: ['express', 'fastapi', 'flask', 'mongoose', 'sequelize', 'axios']
      }]
    }
  }
];
