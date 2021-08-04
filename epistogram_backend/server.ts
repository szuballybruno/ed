import {Connection} from "./services/connectMongo";
import fileUpload from 'express-fileupload'
import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';
import {router as articleRoutes} from './api/articles/routes'
import {router as courseRoutes} from './api/courses/routes'
import {router as organizationRoutes} from './api/organizations/routes'
import {router as usersRoutes} from './api/users/routes'
import {router as videosRoutes} from './api/videos/routes'
import {router as generalDataRoutes} from './api/votes/routes'
import {router as filesRoutes} from './api/files/routes'
import {router as overlaysRoutes} from './api/overlays/routes'
import {router as tasksRoutes} from './api/tasks/routes'
import {router as tagsRoutes} from './api/tags/routes'
import {router as groupsRoutes} from './api/groups/routes'

Connection.connectToMongo()

const server = express();

server.use(bodyParser.json());
server.use(fileUpload());
server.use(cors());

server.use((req: express.Request, res: express.Response, next: () => void) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

server.use('/articles', articleRoutes)
server.use('/courses', courseRoutes)
server.use('/groups', groupsRoutes)
server.use('/organizations', organizationRoutes)
server.use('/tags', tagsRoutes)
server.use('/tasks', tasksRoutes)
server.use('/upload', filesRoutes)
server.use('/overlays', overlaysRoutes)
server.use('/users', usersRoutes);
server.use('/videos', videosRoutes);
server.use('/votes', generalDataRoutes);

server.use(() => {
    throw new Error('Nem létezik ilyen útvonal');
});

server.use((error: express.Errback, req: express.Request, res: express.Response) => {
    return res.status(500).send(error.toString());
});

const port = process.env.PORT || 5000;
server.listen(port, function () {
    console.log(`A szerver a(z) ${port}-s porton fut`)
});

