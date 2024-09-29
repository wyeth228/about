import LANGUAGES from "./enums/languages.js";
import initProjectPopup from "./app/initProjectPopup.js";
import initLanguage from "./app/initLanguage.js";
import initYear from "./app/initYear.js";
import initTranslations from "./app/initTranslations.js";
import initProjects from "./app/initProjects.js";

window.app = {
  language: LANGUAGES.EN,
  imagesCache: {},
};

function initApplication() {
  initLanguage(app);

  initYear();

  initTranslations();

  initProjectPopup(app.imagesCache, initProjects);
}

document.addEventListener("DOMContentLoaded", initApplication);
