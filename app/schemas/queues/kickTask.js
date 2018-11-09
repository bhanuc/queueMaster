

const Joi = require('joi');

const request = {
  body: Joi.object().keys({
    queueName: Joi.string().required().description('Name of the queue'),
    count: Joi.string().required().description('Count of the task to be kicked'),
  }),
  type: 'json',
};

const meta = {
  swagger: {
    summary: 'Kick certain number of tasks',
    description: 'Reverse the effect of a bury request on one or more tasks.',
    tags: ['Queue'],
  },
};

module.exports = {
  request,
  meta,
};
