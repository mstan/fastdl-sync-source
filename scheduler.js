require('dotenv').config();
const debug = require('debug')('fastdl-sync:app');
const app = require('./app');

if(!process.env.CHECK_INTERVAL_MINUTES) {
	process.env.CHECK_INTERVAL_MINUTES = 1
}

const scheduler = function() {
	debug('Initializing scheduler...');
	return setInterval(async () => {
		debug(`Running scheduler check....`);

		try {
			await app(); 
		} catch(error) {
			debug(error);
		}
	}, process.env.CHECK_INTERVAL_MINUTES * 60 * 1000)
}

scheduler();