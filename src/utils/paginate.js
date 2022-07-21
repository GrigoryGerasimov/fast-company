export const paginate = (items, pageNumber, pageSize) =>
    [...items].splice((pageNumber - 1) * pageSize, pageSize);
