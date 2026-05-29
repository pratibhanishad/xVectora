const { Recommendation } = require('../entities/Recommendation')

class RunRootCauseAnalysis {
  constructor(
    assetRepositoryPort,    
    mlInferencePort,        
    notificationPort        
  ) {
    this.assetRepo = assetRepositoryPort
    this.mlPort = mlInferencePort
    this.notificationPort = notificationPort
  }

  async execute(assetId, sensorData) {

    // Step 1: Accept RCA Request 
    const asset = await this.assetRepo.findById(assetId)
    if (!asset) throw new Error('Asset not found')

    // Step 2: Gather Evidence 
    const evidence = {
      assetId,
      sensorData,
      assetStatus: asset.status,
      healthScore: asset.calculateHealthScore(),
      gatheredAt: new Date()
    }

    // Step 3: invoke RCA Engine 
    const rcaResult = await this.mlPort.runRCA({
      assetId,
      evidence
    })

    // Step 4: generate Recommendations
    const recommendations = rcaResult.rootCauses.map((cause, index) =>
      new Recommendation(
        null,
        assetId,
        cause.action,
        {
          cost: cause.estimatedCost,
          downtime: cause.estimatedDowntime,
          safetyRisk: cause.safetyRisk,
          urgency: cause.urgency
        },
        cause.estimatedCost,
        cause.estimatedDowntime
      )
    )

    // send Notification 
    await this.notificationPort.send({
      type: 'rca.completed',
      assetId,
      rootCauses: rcaResult.rootCauses,
      recommendationCount: recommendations.length
    })

    // test results
    return {
      assetId,
      evidence,
      rootCauses: rcaResult.rootCauses,
      recommendations,
      analyzedAt: new Date()
    }
  }
}

module.exports = { RunRootCauseAnalysis }