'use strict';

const Joi = require('joi');

const request = {
	body: Joi.object().keys({
		queueName: Joi.string().required().description('Name of the queue'),
		taskid: Joi.string().required().description('Taskid of the task')
	}),
	type: 'json'
};

const meta = {
	swagger: {
		summary: 'Mark the task completed',
		description: 'Mark the task to be completed',
		tags: ['Queue']
	}
};

module.exports = {
	request,
	meta
};
