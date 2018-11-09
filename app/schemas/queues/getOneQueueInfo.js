

const Joi = require('joi');

const request = {
  params: Joi.object().keys({ queueName: Joi.string().required().description('Name of the queue') }),
  type: 'json',
};

const meta = {
  swagger: {
    summary: 'Info of Single Queue',
    description: 'Get info of a single queue',
    tags: ['Queue'],
  },
};

module.exports = { request, meta };
