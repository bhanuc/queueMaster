

const Router = require('koa-router');
const path = require('path');
const { validator } = require('koa-joi-router-2');
const appRoot = require('app-root-path');
const pjson = require('../../package.json');

const schemasBasePath = path.join(appRoot.path, 'app/schemas');
const joiValidator = validator(schemasBasePath);

const Common = {
  whoami: (ctx) => {
    ctx.body = {
      version: pjson.version,
    };
  },
  getRouter: () => {
    const router = Router();
    router.get('common_whoami', '/whoami', joiValidator, Common.whoami);
    return router;
  },
};

module.exports = Common;
