

const Joi = require('joi');

const request = {
  body: Joi.object().keys({
    queueName: Joi.string().required().description('Name of the queue'),
    taskid: Joi.string().required().description('Taskid of the task'),
  }),
  type: 'json',
};

const meta = {
  swagger: {
    summary: 'Peek task',
    description: 'Look at a task without changing its state.',
    tags: ['Queue'],
  },
};

module.exports = {
  request,
  meta,
};
