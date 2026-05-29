const { MaintenanceOrder } = require('../entities/MaintenanceOrder')

class GenScheduleRec {

  constructor(assetRepositoryPort, maintenanceSystemPort, notificationPort) {
    this.assetRepo = assetRepositoryPort
    this.maintenancePort = maintenanceSystemPort  // CMMS sync ke liye
    this.notificationPort = notificationPort       // Approval request ke liye
  }

  async execute(assetId, scheduledAt, assignedTo) {


    const asset = await this.assetRepo.findById(assetId)
    if (!asset) throw new Error('Asset not found')

    // Step 2: Schedule recommendation
    const order = new MaintenanceOrder(
      null,
      assetId,
      'scheduled-maintenance',
      scheduledAt,
      assignedTo
    )

   
    order.state = 'pending_approval'

  
    await this.notificationPort.send({
      type: 'approval.required',         
      order,
      message: `Schedule approval required for asset ${assetId}`
    })

    // Step 5: Pending state mein return karo
    return {
      order,
      status: 'pending_approval',      
      message: 'Awaiting human approval before execution or CMMS sync'
    }
  }


  async approve(order, approvedBy) {

    if (!approvedBy) {
      throw new Error('Authorised human approval required!')
    }

    order.state = 'approved'
    order.approvedBy = approvedBy
    order.approvedAt = new Date()

    await this.maintenancePort.save(order)

    await this.notificationPort.send({
      type: 'schedule.approved',
      order,
      approvedBy
    })

    return {
      order,
      status: 'approved',
      message: `Approved by ${approvedBy} — CMMS sync complete`
    }
  }

  async reject(order, rejectedBy, reason) {
    order.state = 'rejected'
    order.rejectedBy = rejectedBy
    order.rejectionReason = reason

    await this.notificationPort.send({
      type: 'schedule.rejected',
      order,
      reason
    })

    return {
      order,
      status: 'rejected',
      message: `Rejected: ${reason}`
    }
  }
}

module.exports = { GenScheduleRec }