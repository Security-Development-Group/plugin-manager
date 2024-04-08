import * as fs from 'fs';
import * as crypto from 'crypto';
import {
    Plugin
} from '../types';

const CONFIG_FILE_NAME : string = 'plugin.json';

/**
 * This class will load the plugins from the specified 
 * plugins path, loading his config and making a way
 * to access and work width these plugins easily
 */
class PluginLoader {

    public static readonly ERROR_PLUGINS_PATH_NOT_FOUND = 'The plugins path doesn\'t exist or can not be found';
    public static readonly ERROR_PLUGIN_CONFIG_FILE = 'Problem ocurred while reading the config file on ${text}';
    public static readonly ERROR_PLUGIN_ROUTER_FILE_NOT_FOUND = 'The router path doesn\'t exist or can not be found';
    public static readonly ERROR_PLUGIN_VIEW_FILE_NOT_FOUND = 'The router path doesn\'t exist or can not be found';

    /**
     * While returing the plugin info, just create a new model
     * that adds the key of it.
     */
    private plugins : Record<string, Plugin> = {};

    /**
     * For now we will just pass the plugins path
     * if some other option is needed then better
     * do an interface for it. Will check if 
     * the plugins folder exists.
     */
    constructor(private pluginsPath : string){
        if(!fs.existsSync(this.pluginsPath)){
            throw new Error(PluginLoader.ERROR_PLUGINS_PATH_NOT_FOUND);
        }

        const plugins : string[] = fs.readdirSync(this.pluginsPath);
        plugins.forEach((pluginDir : string) => {
            const path : string = pluginsPath + '/' + pluginDir;
            const plugin : Plugin = this.loadPlugin(path);
            this.plugins[crypto.randomUUID()] = plugin;
        });
    };

    loadPlugin(path : string) : Plugin {
        let plugin : Plugin;
        try {
            plugin = JSON.parse(fs.readFileSync(path).toString());
        } catch (err) {
            throw new Error(PluginLoader.ERROR_PLUGIN_CONFIG_FILE.replace('${text}', path));
        };

        if(!plugin.routerPath && !plugin.viewPath){
            throw new Error(PluginLoader.ERROR_PLUGIN_CONFIG_FILE.replace('${text}', plugin.name));
        }else if(plugin.routerPath && !fs.existsSync(plugin.routerPath)){
            throw new Error(PluginLoader.ERROR_PLUGIN_ROUTER_FILE_NOT_FOUND);
        }else if(plugin.routerPath && !fs.existsSync(plugin.viewPath)){
            throw new Error(PluginLoader.ERROR_PLUGIN_VIEW_FILE_NOT_FOUND);
        };

        return plugin;
    };

    // Implement more funcionalities depending on the need

};