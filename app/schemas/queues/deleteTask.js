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
		summary: 'Delete a task',
		description: 'Delete the task identified by task_id. Effect: the current state of task_state is not checked. The task is removed from the queue.',
		tags: ['Queue']
	}
};

module.exports = {
	request,
	meta
};
