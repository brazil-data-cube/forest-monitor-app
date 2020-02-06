/**
 * convert date to string with USA template
 */
export function formatDateUSA(date: Date): string {
    let month: string = (date.getMonth() + 1).toString();
    month = month.toString().length === 1 ? `0${month}` : month;
    let day: string = (date.getDate()).toString();
    day = day.toString().length === 1 ? `0${day}` : day;

    return `${date.getFullYear()}-${month}-${day}`;
}

/**
 * add on month in date
 */
export function addMonth(date: Date): Date {
    return new Date(date.setMonth(date.getMonth() + 1));
}

/**
 * sum days in date
 */
export function addDays(date: Date, qntDays: number): Date {
    return new Date(date.setDate(date.getDate() + qntDays));
}

/**
 * subtract on month in date
 */
export function subMonth(date: Date): Date {
    return new Date(date.setMonth(date.getMonth() - 1));
}

/**
 * subtract days in date
 */
export function subDays(date: Date, qntDays: number): Date {
    return new Date(date.setDate(date.getDate() - qntDays));
}

/**
 * get last day by month
 */
export function getLastDateMonth(date: Date): number {
    const nextMonth = addMonth(new Date(date.setDate(1)));
    const thisMonthDate = new Date(nextMonth.setDate(nextMonth.getDate() - 1));
    return thisMonthDate.getDate();
}

/**
 * convert julian date to gregorian
 */
export function julianIntToDate(n) {
    // convert a Julian number to a Gregorian Date.
    //    S.Boisseau / BubblingApp.com / 2014
    var a = n + 32044;
    var b = Math.floor(((4*a) + 3)/146097);
    var c = a - Math.floor((146097*b)/4);
    var d = Math.floor(((4*c) + 3)/1461);
    var e = c - Math.floor((1461 * d)/4);
    var f = Math.floor(((5*e) + 2)/153);

    var D = e + 1 - Math.floor(((153*f) + 2)/5);
    var M = f + 3 - 12 - Math.round(f/10);
    var Y = (100*b) + d - 4800 + Math.floor(f/10);

    return new Date(Y,M,D);
}