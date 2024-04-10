import express, {
    Router
} from 'express';
import { 
    PluginsLoader 
} from './core/index.js';
import {
    useRouters
} from './utils'
import { createViewRouter } from './routes/view.js';

const router : Router = express.Router();
const pluginsPath = './plugins'
const pluginsLoader : PluginsLoader = new PluginsLoader(pluginsPath);
const routers : Router[] = pluginsLoader.getRouters();

useRouters(router, routers);

export default router;