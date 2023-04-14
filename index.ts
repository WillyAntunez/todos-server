import dotenv from 'dotenv';

import { Server } from "./src/Server";
import { dbConnection } from './src/database/config';

dotenv.config();

const server = new Server();

dbConnection();
server.listen();