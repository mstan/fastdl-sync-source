require('dotenv').config();
const ftp = require('basic-ftp');
const fs = require('fs');
const client = new ftp.Client();
const stockAssets = require('./stock-assets.js');
const debug = require('debug')('fastdl-sync:app');
const { 
	REMOTE_GAME_SERVER_FILE_PATH, 
	LOCAL_SERVER_FILE_PATH,
	REMOTE_GAME_SERVER_IP,
	REMOTE_GAME_SERVER_FTP_USERNAME,
	REMOTE_GAME_SERVER_FTP_PASSWORD
} = process.env;


async function checkForNewMaps() {
	// get a list of all files in each directory
	let remoteGameServerMaps = await client.list(`${REMOTE_GAME_SERVER_FILE_PATH}/maps`);
	// filter to just the filenames and not the whole file. 
	// NOTE: To eventually consider looking at information and performing diffs to override files of same name.
	remoteGameServerMaps = remoteGameServerMaps.map((map) => map.name);
	// now, remove out all the "stock" assets the game engine already provides, we don't want to transfer these.
	let customGameServerMaps = remoteGameServerMaps.filter((map) => stockAssets.maps.indexOf(map) == -1);
	// now, get all of the maps we already have on OUR local server
	const localServerMaps = fs.readdirSync(`${LOCAL_SERVER_FILE_PATH}/maps`);
	const customGameServerMapsToAdd = customGameServerMaps.filter((map) => localServerMaps.indexOf(map) == -1);
	
	if(customGameServerMapsToAdd.length > 0) {
		debug(customGameServerMapsToAdd);	
	} else {
		debug(`No new maps found. Breaking sequence...`);
	}

	for(let map of customGameServerMapsToAdd) {
		debug(`Starting download of ${map}`);

		await client.downloadTo(`${LOCAL_SERVER_FILE_PATH}/maps/${map}`, `${REMOTE_GAME_SERVER_FILE_PATH}/maps/${map}`, );
	}

	return;
}


async function checkForNewFiles() {
	// connect to the server
	await client.access({
		host: process.env.REMOTE_GAME_SERVER_IP,
		user: process.env.REMOTE_GAME_SERVER_FTP_USERNAME,
		password: process.env.REMOTE_GAME_SERVER_FTP_PASSWORD
	});


	try {
		await checkForNewMaps();		
	} catch(error) {
		debug(error);
	}

	return await client.close();
}

module.exports = checkForNewFiles;



