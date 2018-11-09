

const requireAll = require('require-all');
const Koa = require('koa');
const appRoot = require('app-root-path');
const _ = require('lodash');


const controllers = requireAll(`${appRoot}/app/controllers`);
const bodyParser = require('koa-bodyparser');
const path = require('path');
const cors = require('@koa/cors');

const { generator } = require('koa-joi-router-2');
const errorHandler = require('../app/middlewares/error_handler');

const schemasBasePath = path.join(appRoot.path, 'app/schemas');
const baseSpec = require('./utils/base-spec');


const ENV = process.env.NODE_ENV || 'development';
const DEV = ENV === 'development';

class App {
  constructor() {
    this.app = null;
  }

  init() {
    const app = new Koa();
    if (DEV) {
      const transformedControllers = _.map(controllers, controller => controller.getRouter());
      const docRouter = generator(transformedControllers, schemasBasePath, baseSpec);
      app.use(cors());
      app.use(docRouter.middleware());
    }

    app.use(errorHandler);
    app.use(bodyParser());

    _.each(controllers, (ctl) => {
      const router = ctl.getRouter();
      app.use(router.middleware());
    });
    this.app = app;
    return app;
  }

  listen(port) {
    return this.app.listen(port);
  }
}

module.exports = new App();
