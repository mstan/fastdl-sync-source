# fastdl-sync

## what does this do?

This app is meant to allow for automatic syncing of downloadable content from a source engine based game to its fastdl server.  
  
This service aims to be particularly useful for hosted game services like GameServers by not requiring SSH access to the game server itself.


### Pre-requisites
- FTP access to a Source Engine based game server (SSH not required)
- SSH access to a private VPS 
	
## Config

Configure the .env as follows

Update the config file with the following: 
REMOTE_GAME_SERVER_FILE_PATH (this is the base path of your Source game (e.g. orangebox/tf)  
LOCAL_SERVER_FILE_PATH= (this is the base path of your fastdl server files)  
REMOTE_GAME_SERVER_IP (this is the IP of your game server)  
REMOTE_GAME_SERVER_FTP_USERNAME (this is your game server's FTP user)  
REMOTE_GAME_SERVER_FTP_PASSWORD (this is your game server's FTP password)  
CHECK_INTERVAL_MINUTES (how often the server should check for new files in minutes)  

Example config file:  
REMOTE_GAME_SERVER_FILE_PATH=/orangebox/tf  
LOCAL_SERVER_FILE_PATH=./  
REMOTE_GAME_SERVER_IP=192.168.0.1  
REMOTE_GAME_SERVER_FTP_USERNAME=username  
REMOTE_GAME_SERVER_FTP_PASSWORD=password  
CHECK_INTERVAL_MINUTES=1  
	
	
## Setup
- [Install Node v16 and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Clone this repository into a working directory
- cd into the directory and run npm install
- copy the .env.sample to .env
- Run scheduler.js on a service like [forever](https://github.com/foreversd/forever)


## Support

If you like my work, consider checking out my [Patreon](https://www.patreon.com/gamemaster1379?fan_landing=true)


