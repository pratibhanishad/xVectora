class Asset {
  constructor(id, name, type, status) {
    this.id = id
    this.name = name
    this.type = type
    this.status = status
  }
 
  calculateHealthScore() {
    if (this.status === 'critical') return 20
    if (this.status === 'warning')  return 60
    return 95
  }
}

module.exports = { Asset }