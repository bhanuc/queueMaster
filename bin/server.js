

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const initDB = require('./bootstrap_task/init_tarantool')();
const initApp = require('./bootstrap_task/init_app')();

async function init() {
  await Promise.all([initDB, initApp]);
}

(async () => {
  try {
    await init();
  } catch (error) {
    console.error(error);
    console.info(`Server bootstrap failed. - ${error.message}`);
    process.exit(1);
  }
})();
