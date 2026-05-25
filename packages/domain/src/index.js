const { User } = require('./User');
const { AssetRepositoryPort } = require('./ports/AssetRepositoryPort');
const { PredictionRunnerPort } = require('./ports/PredictionRunnerPort');
const { RecommendationRepositoryPort } = require('./ports/RecommendationRepositoryPort');
const { MaintenanceSystemPort } = require('./ports/MaintenanceSystemPort');
const { NotificationPort } = require('./ports/NotificationPort');

module.exports = {
  User,
  AssetRepositoryPort,
  PredictionRunnerPort,
  RecommendationRepositoryPort,
  MaintenanceSystemPort,
  NotificationPort
};
