
const app = require('../../app/app');
const config = require('../../config');

module.exports = async () => {
  console.info('Initializing the app ...');

  app.init();
  console.log(`Server started and listeing in port ${config.api_port}`);
  await app.listen(config.api_port);
};
