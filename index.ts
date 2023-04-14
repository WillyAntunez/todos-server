import dotenv from 'dotenv';

import { Server } from "./src/Server";

dotenv.config();

const server = new Server();

server.listen();
