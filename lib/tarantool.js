

const TarantoolConnection = require('tarantool-driver');

const config = require('../config');
// const KEEPALIVE_IN_MINUTES = 5;

class Tarantool {
  constructor() {
    this.db = null;
  }

  async init() {
    const conn = new TarantoolConnection({
      port: config.dbport || 3301,
    });
    this.db = conn;
    // await conn.auth(config.dbusername || 'guest', config.dbpassword || '');
    await conn.eval('box.cfg{}');
  }

  getConnection() {
    return this.db;
  }

  async testConnection() {
    if (!this.db) {
      throw new Error('Failed to init db.');
    }

    try {
      return await this.db.eval('return box.session.user()');
    } catch (err) {
      throw new Error('Failed to connect to Tarantool Instance', err.message);
    }
  }
}

module.exports = new Tarantool();
