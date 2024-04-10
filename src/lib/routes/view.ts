import express, {
    Router,
    Request,
    Response
} from 'express';
import ViewService from '../services/view';

function createViewRouter(viewService : ViewService) : Router {
    const router : Router = express.Router();

    router.use((req : Request, res : Response) => {

    });

    return router;
};

export {
    createViewRouter
};