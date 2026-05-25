module.exports = {
  rules: {
    'no-restricted-imports': ['error', {
      patterns: [
        'express',
        'fastapi',
        'flask',
        'mongoose',
        'sequelize',
        'typeorm',
        'prisma',
        '@prisma/*',
        'axios',
        'node-fetch'
      ]
    }]
  }
};
