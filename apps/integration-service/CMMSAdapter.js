const { MaintenanceSystemPort } = 
  require('../../packages/domain/src/ports/MaintenanceSystemPort')

class CMMSAdapter extends MaintenanceSystemPort {

  constructor(cmmsConfig) {
    super()
    this.config = cmmsConfig  

  }

  async createDraftWorkOrder(maintenanceOrder) {
    console.log(`Creating draft work order for asset: ${maintenanceOrder.assetId}`)

    return {
      externalId: `WO-${Date.now()}`,
      status: 'draft',
      assetId: maintenanceOrder.assetId,
      createdAt: new Date()
    }
  }
  async syncMaintenanceAction(maintenanceOrder) {
   
    if (maintenanceOrder.state !== 'approved') {
      throw new Error('Only approved orders can be synced!')
    }

    console.log(`Syncing approved order: ${maintenanceOrder.id}`)

    return {
      externalId: `WO-${maintenanceOrder.id}`,
      status: 'synced',
      syncedAt: new Date(),
      cmmsType: this.config.type 
    }
  }

  async scheduleMaintenance(task) {
    console.log(`Scheduling maintenance: ${task.id}`)
    return { scheduled: true, taskId: task.id }
  }

  async getMaintenanceStatus(id) {
    console.log(`Getting status for: ${id}`)
    return { id, status: 'in_progress' }
  }

  async cancelMaintenance(id) {
    console.log(`Cancelling maintenance: ${id}`)
    return { id, status: 'cancelled' }
  }
}

module.exports = { CMMSAdapter }