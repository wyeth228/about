import months from "../data/months.js";

/**
 * @param {number} dateInSeconds
 * @param {string} language
 * @returns {string} like: january 01, 2024
 */
export default function (dateInSeconds, language) {
  if (typeof dateInSeconds !== "number") {
    console.error("formatDateInSeconds error: We need a number");

    return;
  }

  if (typeof language !== "string") {
    console.error("formatDateInSeconds error: We need a correct language code");

    return;
  }

  var date = new Date(dateInSeconds);
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

  return `${
    months[date.getMonth() + 1][language]
  } ${day}, ${date.getFullYear()}`;
}
