const { Recommendation } = require('../entities/Recommendation')

class ReviewRecommendation {

  constructor(notificationPort) {
    this.notificationPort = notificationPort
  }

  async approve(recommendation, approvedBy) {
    if (!approvedBy) throw new Error('Approver required!')

    recommendation.status = 'approved'
    recommendation.approvedBy = approvedBy
    recommendation.approvedAt = new Date()

    await this.notificationPort.send({
      type: 'recommendation.approved',
      recommendationId: recommendation.id,
      approvedBy
    })

    return {
      recommendation,
      action: 'approved',
      by: approvedBy,
      at: recommendation.approvedAt
    }
  }

  async reject(recommendation, rejectedBy, reason) {
    if (!rejectedBy) throw new Error('Rejector required!')
    if (!reason) throw new Error('Reason required!')

    recommendation.status = 'rejected'
    recommendation.rejectedBy = rejectedBy
    recommendation.rejectionReason = reason
    recommendation.rejectedAt = new Date()

    await this.notificationPort.send({
      type: 'recommendation.rejected',
      recommendationId: recommendation.id,
      rejectedBy,
      reason
    })

    return {
      recommendation,
      action: 'rejected',
      by: rejectedBy,
      reason,
      at: recommendation.rejectedAt
    }
  }

  async override(recommendation, overriddenBy, newAction) {
    if (!overriddenBy) throw new Error('Override approver required!')
    if (!newAction) throw new Error('New action required!')

    recommendation.originalAction = recommendation.action
    recommendation.action = newAction
    recommendation.status = 'overridden'
    recommendation.overriddenBy = overriddenBy
    recommendation.overriddenAt = new Date()

    await this.notificationPort.send({
      type: 'recommendation.overridden',
      recommendationId: recommendation.id,
      overriddenBy,
      newAction
    })

    return {
      recommendation,
      action: 'overridden',
      by: overriddenBy,
      newAction,
      at: recommendation.overriddenAt
    }
  }

  // 💬 Action 4 — Comment
  async comment(recommendation, commentedBy, commentText) {
    if (!commentedBy) throw new Error('Commenter required!')
    if (!commentText) throw new Error('Comment required!')

    if (!recommendation.comments) {
      recommendation.comments = []
    }

    const comment = {
      by: commentedBy,
      text: commentText,
      at: new Date()
    }

    recommendation.comments.push(comment)

    return {
      recommendation,
      action: 'commented',
      comment
    }
  }

  async audit(recommendation) {
    const auditLog = {
      recommendationId: recommendation.id,
      currentStatus: recommendation.status,
      history: {
        approvedBy: recommendation.approvedBy || null,
        rejectedBy: recommendation.rejectedBy || null,
        overriddenBy: recommendation.overriddenBy || null,
        comments: recommendation.comments || [],
      },
      auditedAt: new Date()
    }

    return auditLog
  }
}

module.exports = { ReviewRecommendation }