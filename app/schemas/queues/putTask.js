

const Joi = require('joi');

const request = {
  body: Joi.object().keys({
    queueName: Joi.string().required().description('Name of the queue'),
    data: Joi.string().required().description('String Data of the task'),
  }),
  type: 'json',
};

const meta = {
  swagger: {
    summary: 'Create a task',
    description: 'Create a single task with a data',
    tags: ['Queue'],
  },
};

module.exports = {
  request,
  meta,
};
