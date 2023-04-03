// Node modules.


// Third party modules.
import dotenv from 'dotenv';


// Own modules.
import Server from './models/server';


// Dotenv config.
dotenv.config();


// App development.
const server = new Server;

server.listen();