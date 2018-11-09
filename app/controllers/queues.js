const Router = require('koa-router');
const tarantool = require('../../lib/tarantool');
// const { validator } = require('koa-joi-router-2');
// const path = require('path');

// const schemasBasePath = path.join(appRoot.path, 'app/schemas');
// const joiValidator = validator(schemasBasePath);


const Queues = {
  getAllQueuesInfo: async (ctx) => {
    const conn = tarantool.getConnection();
    const results = await conn.eval('return require("queue").stats()');
    ctx.body = results;
  },
  getOneQueueInfo: async (ctx) => {
    const { queueName } = ctx.params;
    const conn = tarantool.getConnection();
    const results = await conn.eval(`return require("queue").statistics("${queueName}")`);
    ctx.body = results;
  },
  createOneQueue: async (ctx) => {
    const { queueName, queueType } = ctx.request.body;
    // const {options} = ctx.request.body;
    const conn = tarantool.getConnection();
    const results = await conn.eval(`return require("queue").create_tube('${queueName}', '${queueType}', {temporary = true})`);
    ctx.body = results;
  },
  putTask: async (ctx) => {
    const { queueName } = ctx.request.body;
    const { data } = ctx.request.body;
    // const {options} = ctx.request.body;
    const conn = tarantool.getConnection();
    const results = await conn.eval(`return require("queue").queue.tube.${queueName}:put(${data})`);
    ctx.body = results;
  },
  getTask: async (ctx) => {
    const { queueName } = ctx.request.body;
    const { timeout } = ctx.body || '';
    // const {options} = ctx.request.body;
    const conn = tarantool.getConnection();
    const results = await conn.eval(`return require("queue").queue.tube.${queueName}:take(${timeout})`);
    ctx.body = results;
  },
  increaseTaskTime: async (ctx) => {
    const { queueName } = ctx.request.body;
    const { time } = ctx.request.body;
    const { taskid } = ctx.request.body;
    // const {options} = ctx.request.body;
    const conn = tarantool.getConnection();
    const results = await conn.eval(`return require("queue").queue.tube.${queueName}:touch(${taskid}, ${time})`);
    ctx.body = results;
  },
  completeTask: async (ctx) => {
    const { queueName } = ctx.request.body;
    const { taskid } = ctx.request.body;
    const conn = tarantool.getConnection();
    const results = await conn.eval(`return require("queue").queue.tube.${queueName}:ack(${taskid})`);
    ctx.body = results;
  },
  releaseTask: async (ctx) => {
    const { queueName } = ctx.request.body;
    const { taskid } = ctx.request.body;
    const conn = tarantool.getConnection();
    // const {options} = ctx.request.body;
    const results = await conn.eval(`return require("queue").queue.tube.${queueName}:release(${taskid})`);
    ctx.body = results;
  },
  peekTask: async (ctx) => {
    const { queueName } = ctx.request.body;
    const { taskid } = ctx.request.body;
    const conn = tarantool.getConnection();
    const results = await conn.eval(`return require("queue").queue.tube.${queueName}:peek(${taskid})`);
    ctx.body = results;
  },
  buryTask: async (ctx) => {
    const { queueName } = ctx.request.body;
    const { taskid } = ctx.request.body;
    const conn = tarantool.getConnection();
    const results = await conn.eval(`return require("queue").queue.tube.${queueName}:bury(${taskid})`);
    ctx.body = results;
  },
  kickTask: async (ctx) => {
    const { queueName } = ctx.request.body;
    const { count } = ctx.request.body;
    const conn = tarantool.getConnection();
    const results = await conn.eval(`return require("queue").queue.tube.${queueName}:kick(${count})`);
    ctx.body = results;
  },
  deleteTask: async (ctx) => {
    const { queueName } = ctx.request.body;
    const { taskid } = ctx.request.body;
    const conn = tarantool.getConnection();
    const results = await conn.eval(`return require("queue").queue.tube.${queueName}:drop(${taskid})`);
    ctx.body = results;
  },
  dropQueue: async (ctx) => {
    const { queueName } = ctx.request.body;
    const conn = tarantool.getConnection();
    const results = await conn.eval(`return require("queue").queue.tube.${queueName}:drop()`);
    ctx.body = results;
  },
  getRouter: () => {
    const router = Router();
    router.get('queues_getAllQueues', '/v1/queues', Queues.getAllQueuesInfo);
    router.get('queues_getOneQueueInfo', '/v1/queues/:queue', Queues.getOneQueueInfo);
    router.post('queues_createOneQueue', '/v1/queues/create', Queues.createOneQueue);
    router.post('queues_putTask', '/v1/queues/:queue/task/create', Queues.putTask);
    router.post('queues_getTask', '/v1/queues/:queue/task/get', Queues.getTask);
    router.post('queues_increaseTaskTime', '/v1/queues/:queue/task/update', Queues.increaseTaskTime);
    router.post('queues_completeTask', '/v1/queues/:queue/task/complete', Queues.completeTask);
    router.post('queues_releaseTask', '/v1/queues/:queue/task/release', Queues.releaseTask);
    router.post('queues_peekTask', '/v1/queues/:queue/task/peek', Queues.putTask);
    router.post('queues_buryTask', '/v1/queues/:queue/task/bury', Queues.buryTask);
    router.post('queues_kickTask', '/v1/queues/:queue/task/kick', Queues.kickTask);
    router.del('queues_dropQueue', '/v1/queues/:queue', Queues.dropQueue);
    router.del('queues_deleteTask', '/v1/queues/:queue/:taskid', Queues.deleteTask);
    return router;
  },
};

module.exports = Queues;
