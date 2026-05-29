class FailureEvent {
  constructor(id, assetId, probability, rul, confidence, evidenceReference) {
    this.id = id
    this.assetId = assetId
    this.probability = probability    
    this.rul = rul                    
    this.confidence = confidence  
    this.evidenceReference = evidenceReference  
    this.detectedAt = new Date()
  }
}

module.exports = { FailureEvent }