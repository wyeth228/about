import LANGUAGES from "./enums/languages.js";
import projects from "./data/projects.js";
import textTranslations from "./data/text_translations.js";
import cloneElements from "./utils/cloneElements.js";
import initProjectPopup from "./app/initProjectPopup.js";
import formatDate from "./utils/formatDate.js";

/**
 * @typedef App
 * @property {string} language
 * @property {Object.<string, string>} alreadyLoadedImages
 */

/**
 * @type App
 */
var app = {
  language: LANGUAGES.EN,
  alreadyLoadedImages: {},
};

function initInfiniteSlider() {
  cloneElements("skills-wrapper", "skill");
}

function initProjects(activatePopup) {
  var projectListParent = document.getElementsByClassName("project-list")[0];

  if (!activatePopup) {
    console.error("initProjects error: we need a projectPopupComponent");

    return;
  }

  projects.sort(function (a, b) {
    return a.dateOfCreation - b.dateOfCreation;
  });

  for (let i = 0; i < projects.length; ++i) {
    var newImageElement = document.createElement("img");
    newImageElement.src = projects[i].images[0];
    newImageElement.classList.add("project__image");

    var newProjectElement = document.createElement("div");
    newProjectElement.classList.add("project");

    newProjectElement.appendChild(newImageElement);

    projectListParent.appendChild(newProjectElement);

    newProjectElement.addEventListener("click", function () {
      activatePopup(
        i,
        projects[i].images,
        projects[i].title[app.language],
        projects[i].tags,
        formatDate(projects[i].dateOfCreation, app.language),
        projects[i].link || ""
      );
    });
  }
}

function initYear() {
  var date = new Date();
  document.getElementById("year").innerHTML = date.getFullYear();
}

function initTranslations() {
  for (var elementClassName of Object.keys(textTranslations)) {
    var element = document.getElementsByClassName(elementClassName)[0];

    if (!element) {
      console.error(
        "initTranslations error: cannot find the " +
          elementClassName +
          " element"
      );

      continue;
    }

    element.innerHTML = textTranslations[elementClassName][app.language];
  }
}

function initLanguage() {
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

function initApplication() {
  initLanguage();
  initYear();
  initInfiniteSlider();
  initTranslations();

  var { activatePopup } = initProjectPopup(
    "project-popup",
    projects,
    app.alreadyLoadedImages
  );
  initProjects(activatePopup);

  particlesJS.load("particles", "./src/json/particles_config.json");
}

document.addEventListener("DOMContentLoaded", initApplication);
