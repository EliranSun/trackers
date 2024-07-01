export const getFirstDayOfYearIndex = (year) => {
    return new Date(year, 0, 1).getDay();
}