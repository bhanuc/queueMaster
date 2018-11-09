

const Joi = require('joi');

const request = {
  body: Joi.object().keys({
    queueName: Joi.string().required().description('Name of the queue'),
    queueType: Joi.string().required().description('Type of the queue ππ'),
  }),
  type: 'json',
};

const meta = {
  swagger: {
    summary: 'Create a Queue',
    description: 'Create a single queue of many types',
    tags: ['Queue'],
  },
};

module.exports = {
  request,
  meta,
};
