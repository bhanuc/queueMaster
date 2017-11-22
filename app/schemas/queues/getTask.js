'use strict';

const Joi = require('joi');

const request = {
	body: Joi.object().keys({
		queueName: Joi.string().required().description('Name of the queue'),
		timeout: Joi.string().optional().description('Timeout of the task')
	}),
	type: 'json'
};

const meta = {
	swagger: {
		summary: 'Get a Task',
		description: 'Get a task for execution, Timeout is the time, you would like to wait for getting the task if there are not tasks ready.',
		tags: ['Queue']
	}
};

module.exports = {
	request,
	meta
};
