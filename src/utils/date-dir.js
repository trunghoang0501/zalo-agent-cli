/**
 * Helpers for --save-daily: map a timestamp to a YYYY-MM-DD folder name in a given IANA timezone.
 */

/** Default timezone for daily save folders (Vietnam). */
export const DEFAULT_SAVE_TZ = "Asia/Ho_Chi_Minh";

/**
 * Throw a RangeError if `timeZone` is not a valid IANA timezone name.
 * @param {string} timeZone
 */
export function assertValidTimeZone(timeZone) {
    // Intl throws RangeError for unknown zones
    new Intl.DateTimeFormat("en-CA", { timeZone });
}

/**
 * Return the calendar date of `date` in `timeZone`, formatted as YYYY-MM-DD.
 * @param {Date} date
 * @param {string} [timeZone]
 * @returns {string}
 */
export function dayKey(date, timeZone = DEFAULT_SAVE_TZ) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(date);
    const get = (type) => parts.find((p) => p.type === type).value;
    return `${get("year")}-${get("month")}-${get("day")}`;
}
