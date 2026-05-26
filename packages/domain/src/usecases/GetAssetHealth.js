class GetAssetHealth {
  constructor(assetRepository) {
    this.assetRepository = assetRepository;
  }

  async execute(assetId) {
    const asset = await this.assetRepository.findById(assetId);
    if (!asset) {
      throw new Error('Asset not found');
    }
    return {
      id: asset.id,
      name: asset.name,
      status: asset.status,
      health: asset.health || 'Unknown'
    };
  }
}

module.exports = { GetAssetHealth };
