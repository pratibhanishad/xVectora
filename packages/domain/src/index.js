class User {
  constructor({ id, name, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  validate() {
    if (!this.email.includes('@')) {
      throw new Error('Invalid email');
    }
    return true;
  }
}

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