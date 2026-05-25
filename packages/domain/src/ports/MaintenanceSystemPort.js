class MaintenanceSystemPort {
  async scheduleMaintenance(task) { throw new Error('Not implemented'); }
  async getMaintenanceStatus(id) { throw new Error('Not implemented'); }
  async cancelMaintenance(id) { throw new Error('Not implemented'); }
}

module.exports = { MaintenanceSystemPort };
