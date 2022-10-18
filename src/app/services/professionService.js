import { httpService } from "./httpService.js";

const professionEndpoint = "profession/";

export const professionService = {
    get: async id => {
        const { data } = await httpService.get(professionEndpoint + id);
        return data;
    },
    getAll: async () => {
        const { data } = await httpService.get(professionEndpoint);
        return data;
    },
    update: async (id, payload) => {
        await httpService.put(professionEndpoint + id, payload);
        return id;
    },
    delete: async id => {
        await httpService.delete(professionEndpoint + id);
        return id;
    }
};
