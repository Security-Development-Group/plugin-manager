interface Plugin {
    uuid : string;
    name : string;
    description : string;
    routerPath? : string;
    viewPath? : string;
};

export {
    Plugin
};