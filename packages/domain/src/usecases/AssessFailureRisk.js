const { FailureEvent } = require('../entities/FailureEvent')

class AssessFailureRisk {
  
  
  constructor(mlInferencePort) {
    this.mlPort = mlInferencePort
  }

  async execute(assetId) {
    
    
    const prediction = await this.mlPort.predictFailure(assetId)

    // Step 2: FailureEvent entity 
    const failureEvent = new FailureEvent(
      null,                           
      assetId,                       
      prediction.probability,         
      prediction.rul,               
      prediction.confidence,        
      prediction.evidenceReference   
    )

   
    return {
      probability:       failureEvent.probability,
      rul:               failureEvent.rul,
      confidence:        failureEvent.confidence,
      evidenceReference: failureEvent.evidenceReference
    }
  }
}

module.exports = { AssessFailureRisk }