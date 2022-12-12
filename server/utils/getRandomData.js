const getRandomData = () => {
    const getRandomNumberInRange = (min, max, option) => {
        const randomNumber = Math.random() * (max - min) + min;
        return option?.withFloor ? Math.floor(randomNumber) : option?.withPrecision ? randomNumber.toPrecision(2) : randomNumber;
    };

    const getRandomImg = () => `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`;

    return {
        rate: getRandomNumberInRange(1, 5, { withFloor: false, withPrecision: true }),
        completedMeetings: getRandomNumberInRange(0, 200, { withFloor: true }),
        image: getRandomImg()
    };
};

module.exports = {
    getRandomData
};
