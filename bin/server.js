'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const tasks = [
	require('./bootstrap_task/init_tarantool')(),
	require('./bootstrap_task/init_app')()
];

async function init() {
	await Promise.all(tasks);
}

(async () => {
	try {
		await init();
	} catch (error) {
		console.error(error);
		console.info('Server bootstrap failed. - ' + error.message);
		process.exit(1);
	}
})();

