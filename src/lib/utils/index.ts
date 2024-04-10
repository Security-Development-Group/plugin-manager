import {
    Application,
    Router
} from 'express';

function useRouters(app : Application | Router, routers : Router[]){
    routers.forEach((router : Router) => {
        app.use(router);
    });
};

export {
    useRouters
};