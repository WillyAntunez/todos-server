
import express, {Application} from 'express';
import cors from 'cors';

import { authRoutes } from './routes';

export class Server {

    private app:Application;
    private port:string;
    private apiPaths = {
        auth: '/auth/',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    private routes() {
        this.app.use(this.apiPaths.auth, authRoutes)
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port 8080')
        })
    }

}
