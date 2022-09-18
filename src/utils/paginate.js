import _ from "lodash";

export const paginate = (items, pageNumber, pageSize) =>
    [...items].splice((pageNumber - 1) * pageSize, pageSize);

export const getPagesRange = (itemsCount, pageSize) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pageCount + 1);
    return [pageCount, pages];
};
