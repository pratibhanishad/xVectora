// packages/domain/src/usecases/GenerateMaintenanceRecommendation.js

const { Recommendation } = require('../entities/Recommendation')

class GenMentenanceRec {

  constructor(assetRepositoryPort, notificationPort) {
    this.assetRepo = assetRepositoryPort
    this.notificationPort = notificationPort
  }

  async execute(assetId) {

    // Step 1: Asset lo
    const asset = await this.assetRepo.findById(assetId)
    if (!asset) throw new Error('Asset not found')

    // Step 2: Raw recommendations banao
    const rawRecommendations = [
      new Recommendation(
        null,
        assetId,
        'Replace bearing',
        { cost: 5000, downtime: 4, safetyRisk: 'high', urgency: 9 },
        5000,
        4
      ),
      new Recommendation(
        null,
        assetId,
        'Lubricate gearbox',
        { cost: 200, downtime: 1, safetyRisk: 'low', urgency: 3 },
        200,
        1
      ),
      new Recommendation(
        null,
        assetId,
        'Inspect motor',
        { cost: 1500, downtime: 2, safetyRisk: 'medium', urgency: 6 },
        1500,
        2
      )
    ]

    // Step 3: Priority score calculate karo
    const prioritised = this.#prioritise(rawRecommendations)

    // Step 4: Notification bhejo
    await this.notificationPort.send({
      type: 'recommendation.generated',
      assetId,
      count: prioritised.length
    })

    return prioritised
  }

  // Private method — prioritisation logic
  #prioritise(recommendations) {
    return recommendations
      .map(rec => ({
        ...rec,
        score: this.#calculateScore(rec.priority)
      }))
      .sort((a, b) => b.score - a.score)  // High score pehle
  }

  #calculateScore(priority) {
    const safetyWeight = {
      'high':   40,
      'medium': 20,
      'low':    5
    }

    return (
      (priority.cost / 100)               +  // Cost factor
      (priority.downtime * 5)             +  // Downtime factor
      (safetyWeight[priority.safetyRisk]) +  // Safety factor
      (priority.urgency * 3)                 // Urgency factor
    )
  }
}

module.exports = { GenMentenanceRec}