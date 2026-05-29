class MaintenanceSystemPort {
    async createDraftWorkOrder(maintenanceOrder) {
    throw new Error('Not implemented')
  }

  async syncMaintenanceAction(maintenanceOrder) {
    throw new Error('Not implemented')
  }

  async scheduleMaintenance(task) { throw new Error('Not implemented'); }
  async getMaintenanceStatus(id) { throw new Error('Not implemented'); }
  async cancelMaintenance(id) { throw new Error('Not implemented'); }
}

module.exports = { MaintenanceSystemPort };
