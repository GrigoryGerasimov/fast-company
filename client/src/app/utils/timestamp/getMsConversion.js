import { msConstants } from "./msConstants";

export const getMsConversion = (time) => {
    const { msInYear, msInMonth, msInDay, msInHour, msInMinute } = msConstants;

    const remainders = {
        fromYear: time % msInYear,
        fromMonth: (time % msInYear) % msInMonth,
        fromDay: ((time % msInYear) % msInMonth) % msInDay,
        fromHour: (((time % msInYear) % msInMonth) % msInDay) % msInHour
    };

    const computedYear = Math.floor(time / msInYear);
    const computedMonth = Math.floor(remainders.fromYear / msInMonth);
    const computedDay = Math.floor(remainders.fromMonth / msInDay);
    const computedHour = Math.floor(remainders.fromDay / msInHour);
    const computedMin = Math.floor(remainders.fromHour / msInMinute);

    return [
        computedYear,
        computedMonth,
        computedDay,
        computedHour,
        computedMin
    ];
};
