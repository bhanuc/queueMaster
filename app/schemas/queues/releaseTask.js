

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
    summary: 'Release the task',
    description: 'Releasing the task puts the data back in queue',
    tags: ['Queue'],
  },
};

module.exports = {
  request,
  meta,
};
