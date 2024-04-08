import {
    Application,
    Router
} from 'express';

function useRouters(app : Application, routers : Router[]){
    routers.forEach((router : Router) => {
        app.use(router);
    });
};