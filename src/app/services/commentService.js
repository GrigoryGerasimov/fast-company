import { httpService } from "./httpService.js";

const commentEndpoint = "comment/";

export const commentService = {
    get: async params => {
        const { data } = await httpService.get(commentEndpoint, { params });
        return data;
    },
    getAll: async () => {
        const { data } = await httpService.get(commentEndpoint);
        return data;
    },
    create: async payload => {
        const { data } = await httpService.post(commentEndpoint, payload);
        return data;
    },
    update: async (id, payload) => {
        const { data } = await httpService.put(commentEndpoint + id, payload);
        return data;
    },
    delete: async id => {
        await httpService.delete(commentEndpoint + id);
        return id;
    }
};
