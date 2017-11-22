'use strict';

const Joi = require('joi');

const request = {
	body: Joi.object().keys({
		queueName: Joi.string().required().description('Name of the queue'),
		time: Joi.string().required().description('Seconds you want to increase'),
		taskid: Joi.string().required().description('Taskid of the task')
	}),
	type: 'json'
};

const meta = {
	swagger: {
		summary: 'Increase time for a task for execution',
		description: 'ttr and ttl increased by specified seconds',
		tags: ['Queue']
	}
};

module.exports = {
	request,
	meta
};
