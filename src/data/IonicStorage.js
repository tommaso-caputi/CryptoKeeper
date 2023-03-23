import { Storage, Drivers } from "@ionic/storage";

var storage = false;

export const createStore = () => {
    storage = new Storage({
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    });
    storage.create();
}


export const set = (key, val) => {
    storage.set(key, val);
}

export const get = async key => {
    const val = await storage.get(key);
    return val;
}

export const remove = async key => {
    await storage.remove(key);
}

export const clear = async () => {
    await storage.clear();
}

export const getJson = async (key) => {
    let all = await storage.get(key);
    return all;
}

export const getJsonOfJson = async (key, id) => {
    let all = await storage.get(key);
    return all[id];
}

export const setJsonOfJson = async (key, id, value) => {
    let all = await storage.get(key);
    all[id] = value
    set('wallets', all)
    //return all[id];
}

export const addJsonToJson = async (key, id, js) => {
    let all = await storage.get(key);
    all[id] = js;
    set(key, all);
}
