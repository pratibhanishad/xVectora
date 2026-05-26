class DetectAnomalies {
  constructor(mlInferencePort, predictionRunnerPort) {
    this.mlInferencePort = mlInferencePort;
    this.predictionRunnerPort = predictionRunnerPort;
  }

  async execute(assetId, sensorData) {
    const prediction = await this.predictionRunnerPort.runPrediction({
      assetId,
      data: sensorData
    });

    const anomalies = await this.mlInferencePort.detectAnomalies(
      assetId,
      prediction
    );

    return {
      assetId,
      anomalies,
      detectedAt: new Date().toISOString()
    };
  }
}

module.exports = { DetectAnomalies };
