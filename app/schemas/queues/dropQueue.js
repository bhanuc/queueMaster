'use strict';

const Joi = require('joi');

const request = {
	body: Joi.object().keys({
		queueName: Joi.string().required().description('Name of the queue')
	}),
	type: 'json'
};

const meta = {
	swagger: {
		summary: 'Dropping a queue',
		description: 'Reverse the effect of a create request.',
		tags: ['Queue']
	}
};

module.exports = {
	request,
	meta
};
