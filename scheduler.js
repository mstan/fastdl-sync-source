require('dotenv').config();
const debug = require('debug')('fastdl-sync:app');
const app = require('./app');


const scheduler = function() {
	return setInterval(async () => {
		debug(`Running scheduler check....`);
		await app();
	}, process.env.CHECK_INTERVAL_MINUTES * 60 * 1000)
}



scheduler();