class RecommendationRepositoryPort {
  async save(recommendation) { throw new Error('Not implemented'); }
  async findByAssetId(assetId) { throw new Error('Not implemented'); }
  async findAll() { throw new Error('Not implemented'); }
}

module.exports = { RecommendationRepositoryPort };
