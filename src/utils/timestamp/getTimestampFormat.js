import { getMsConversion } from "./getMsConversion.js";

export const getTimestampFormat = timestamp => {
    if (typeof timestamp !== "number") timestamp = Number(timestamp);
    const timeElapsed = Date.now() - timestamp;
    const timestampDate = new Date(timestamp);

    const [year, month, day, hour, min] = getMsConversion(timeElapsed);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (year) {
        return `${timestampDate.getDate()} ${months[timestampDate.getMonth()]} ${timestampDate.getFullYear()}`;
    } else if (month || day) {
        return `${timestampDate.getDate()} ${months[timestampDate.getMonth()]}`;
    } else if (hour || min > 30) {
        return `${timestampDate.getHours()}:${timestampDate.getMinutes()}`;
    } else {
        if (min > 10 && min <= 30) {
            return "30 минут назад";
        } else if (min > 5 && min <= 10) {
            return "10 минут назад";
        } else if (min > 1 && min <= 5) {
            return "5 минут назад";
        } else if (min <= 1) {
            return "1 минуту назад";
        }
    }
};
