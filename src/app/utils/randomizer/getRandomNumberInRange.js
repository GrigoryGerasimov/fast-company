export const getRandomNumberInRange = (min, max, option) => {
    const randomNumber = Math.random() * (max - min) + min;
    return option?.withFloor ? Math.floor(randomNumber) : option?.withPrecision ? randomNumber.toPrecision(2) : randomNumber;
};
