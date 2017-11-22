'use strict';


const appRoot = require('app-root-path');
const TarantoolConnection = require('tarantool-driver');

const config = require(`${appRoot}/config`);
// const KEEPALIVE_IN_MINUTES = 5;

class Tarantool {
	constructor() {
		this.db = null;
	}

	async init() {
		const conn = new TarantoolConnection({
			port: config.dbport || 3301
		});
		await conn.connect();
		this.db = conn;
		await conn.auth(config.dbusername || 'myusername', config.dbpassword || 'mysecretpassword');
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
			console.log(err);
			throw new Error('Failed to connect to Tarantool Instance');
		}
	}
}

module.exports = new Tarantool();
