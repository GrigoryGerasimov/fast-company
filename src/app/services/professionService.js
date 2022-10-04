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
    update: async (id, content) => {
        const { data } = await httpService.put(professionEndpoint + id, content);
        return data;
    },
    delete: async id => {
        const { data } = await httpService.delete(professionEndpoint + id);
        return data;
    }
};
