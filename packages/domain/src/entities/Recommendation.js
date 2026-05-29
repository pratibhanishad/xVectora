class Recommendation {
  constructor(id, assetId, action, priority, estimatedCostSaving, downtimeAvoidance) {
    this.id = id
    this.assetId = assetId
    this.action = action
    this.priority = priority
    this.estimatedCostSaving = estimatedCostSaving
    this.downtimeAvoidance = downtimeAvoidance
  }

  accept() { this.status = 'accepted' }
  dismiss() { this.status = 'dismissed' }
}

module.exports = { Recommendation }