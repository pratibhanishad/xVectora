class MLInferencePort {
  async detectAnomalies(assetId, data) { throw new Error('Not implemented'); }
  async getAnomalyStatus(jobId) { throw new Error('Not implemented'); }
}

module.exports = { MLInferencePort };
