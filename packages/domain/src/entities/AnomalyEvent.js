 
 class AnomalyEvent {
  constructor(id, assetId, sensor, value, baseline) {
    this.id = id
    this.assetId = assetId
    this.sensor = sensor
    this.value = value
    this.baseline = baseline
    this.severity = this.#calculateSeverity(value, baseline)
    this.detectedAt = new Date()
  }

  #calculateSeverity(value, baseline) {
    const diff = Math.abs(value - baseline) / baseline
    if (diff > 0.5) return 'critical'
    if (diff > 0.2) return 'warning'
    return 'normal'
  }
}

module.exports = { AnomalyEvent }