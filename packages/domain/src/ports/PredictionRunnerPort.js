class PredictionRunnerPort {
  async runPrediction(input) { throw new Error('Not implemented'); }
  async getPredictionStatus(id) { throw new Error('Not implemented'); }
  async detectAnomalies(data){throw new Error('Not implemented');}
  async forecastDemand(params){throw new Error('Not implemented');}
}

module.exports = { PredictionRunnerPort };
