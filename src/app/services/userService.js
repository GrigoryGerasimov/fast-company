import { httpService } from "./httpService.js";

const userEndpoint = "user/";

export const userService = {
    get: async id => {
        const { data } = await httpService.get(userEndpoint + id);
        return data;
    },
    getAll: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(userEndpoint, payload);
        return data;
    },
    update: async (id, payload) => {
        const { data } = await httpService.put(userEndpoint + id, payload);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(userEndpoint + id);
        return data;
    }
};
