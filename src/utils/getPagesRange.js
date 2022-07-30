import _ from "lodash";

export default function getPagesRange(itemsCount, pageSize) {
    const pageCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pageCount + 1);
    return [pageCount, pages];
};
