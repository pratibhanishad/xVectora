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

// ── Ports ──
const { AssetRepositoryPort } = require('./ports/AssetRepositoryPort');
const { PredictionRunnerPort } = require('./ports/PredictionRunnerPort');
const { RecommendationRepositoryPort } = require('./ports/RecommendationRepositoryPort');
const { MaintenanceSystemPort } = require('./ports/MaintenanceSystemPort');
const { NotificationPort } = require('./ports/NotificationPort');
const { MLInferencePort } = require('./ports/MLInferencePort');

// ── Entities ──
const { Asset } = require('./entities/Asset');
const { FailureEvent } = require('./entities/FailureEvent');
const { AnomalyEvent } = require('./entities/AnomalyEvent');           // ← Add
const { MaintenanceOrder } = require('./entities/MaintenanceOrder');   // ← Add
const { Recommendation } = require('./entities/Recommendation');       // ← Add

// ── Use Cases ──
const { GetAssetHealth } = require('./usecases/GetAssetHealth');
const { DetectAnomalies } = require('./usecases/DetectAnomalies');
const { AssessFailureRisk } = require('./usecases/AssessFailureRisk');         // ← Add
const { GenMaintenanceRec } = require('./usecases/GenMaintenanceRec');         // ← Add
const { GenScheduleRec } = require('./usecases/GenScheduleRec');               // ← Add
const { RunRootCauseAnalysis } = require('./usecases/RunRootCauseAnalysis');   // ← Add

module.exports = {
  User,

  // Ports
  AssetRepositoryPort,
  PredictionRunnerPort,
  RecommendationRepositoryPort,
  MaintenanceSystemPort,
  NotificationPort,
  MLInferencePort,

  // Entities
  Asset,
  FailureEvent,
  AnomalyEvent,        
  MaintenanceOrder,   
  Recommendation,   

  // Use Cases
  GetAssetHealth,
  DetectAnomalies,
  AssessFailureRisk,   
  GenMaintenanceRec,     
  GenScheduleRec,          
  RunRootCauseAnalysis,    
};