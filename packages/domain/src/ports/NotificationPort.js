class NotificationPort {
  async sendNotification(message) { throw new Error('Not implemented'); }
  async sendBulkNotification(messages) { throw new Error('Not implemented'); }
}

module.exports = { NotificationPort };
