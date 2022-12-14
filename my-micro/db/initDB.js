const { Profession } = require("../models/Profession");
const { Quality } = require("../models/Quality");
const professionsMock = require("../mockData/professions.json");
const qualitiesMock = require("../mockData/qualities.json");

const uploadToDB = async (Model, data) => {
    Model.collection.drop();
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id;
                const result = new Model(item);
                await result.save();
                return item;
            } catch (err) {
                console.error(err.message);
                return err;
            }
        })
    );
};

const initDB = async () => {
    const professions = await Profession.find();
    const qualities = await Quality.find();

    if (qualities.length !== qualitiesMock.length) {
        await uploadToDB(Quality, qualitiesMock);
    }
    if (professions.length !== professionsMock.length) {
        await uploadToDB(Profession, professionsMock);
    }
};

module.exports = {
    initDB
};
