class MaintenanceOrder {
  constructor(id, assetId, type, scheduledAt) {
    this.id = id
    this.assetId = assetId
    this.type = type
    this.state = 'draft'   
    this.scheduledAt = scheduledAt
  }

  complete()             { this.state = 'completed' }
  reschedule(newDate)    { this.scheduledAt = newDate }
}

module.exports = { MaintenanceOrder }