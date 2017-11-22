'use strict';

const appRoot = require('app-root-path');

const DB = require(`${appRoot}/lib/tarantool`);

module.exports = async () => {
	console.info('Try to connect to tarantool ...');


	await DB.init();
	await DB.testConnection();

	console.info('Database Connected');
};

