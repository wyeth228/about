import LANGUAGES from "../enums/languages.js";

export default function initLanguage(app) {
  if (!navigator.language) {
    app.language = LANGUAGES.EN;

    return;
  }

  var navigatorLanguage = navigator.language.split("-")[0];

  if (
    navigatorLanguage === LANGUAGES.EN ||
    navigatorLanguage === LANGUAGES.RU
  ) {
    app.language = navigatorLanguage;
  } else {
    app.language = LANGUAGES.EN;
  }
}
