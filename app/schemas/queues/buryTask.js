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
		summary: 'Bury task',
		description: 'If it becomes clear that a task cannot be executed in the current circumstances, you can "bury" the task -- that is, disable it until the circumstances change.',
		tags: ['Queue']
	}
};

module.exports = {
	request,
	meta
};
