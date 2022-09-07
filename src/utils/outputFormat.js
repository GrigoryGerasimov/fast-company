export const getProfessionById = (id, professions) => {
    for (const prof of professions) {
        if (prof.label === id) return { name: prof.label, _id: prof.value };
    }
};
export const getQualities = (elems, qualities) => {
    const qualitiesArray = [];
    for (const elem of elems) {
        for (const quality of qualities) {
            if (elem.value === quality.value) {
                qualitiesArray.push({
                    name: quality.label,
                    _id: quality.value,
                    color: quality.color
                });
            }
        }
    }
    return qualitiesArray;
};
