import LANGUAGES from "./enums/languages.js";
import projects from "./data/projects.js";
import textTranslations from "./data/text_translations.js";
import cloneElements from "./utils/cloneElements.js";
import closePopup from "./app/project_popup/closePopup.js";
import activatePopup from "./app/project_popup/activatePopup.js";
import swipeSlideLeft from "./app/project_popup/swipeSlideLeft.js";
import swipeSlideRight from "./app/project_popup/swipeSlideRight.js";
import reaction from "./libs/reaction/index.js";
import formatDate from "./utils/formatDate.js";

var app = {
  language: LANGUAGES.EN,
  alreadyLoadedImages: {},
};

function initInfiniteSlider() {
  cloneElements("skills-wrapper", "skill");
}

function initProjectPopup() {
  var dataState = {
    currentProjectIdx: 0,
  };

  var viewState = {
    root: {
      className: "project-popup",
      hidden: true,
      hiddenClassName: "project-popup_hidden",
      onclick: function (event) {
        if (
          event.target.classList.contains("project-popup") ||
          event.target.classList.contains("project-popup__close-button")
        ) {
          this.closePopup(viewState);
        }
      },
    },
    loading: {
      className: "project-popup__loading",
      hidden: true,
      hiddenClassName: "project-popup__loading_hidden",
    },
    title: {
      value: "",
      isAttributeValue: false,
      className: "project-popup__title",
    },
    tags: {
      value: "",
      isAttributeValue: false,
      className: "project-popup__tags",
    },
    date: {
      value: "",
      isAttributeValue: false,
      className: "project-popup__date",
    },
    link: {
      value: "",
      isAttributeValue: true,
      attributeName: "href",
      className: "project-popup__link",
      hidden: false,
      hiddenClassName: "project-popup__link_hidden",
    },
    image: {
      value: "",
      hidden: false,
      hiddenClassName: "project-popup__image_hidden",
      isAttributeValue: true,
      attributeName: "src",
      className: "project-popup__image",
    },
    currentSlide: {
      value: 1,
      className: "project-popup__current-slide",
    },
    slidesTotal: {
      value: 1,
      className: "project-popup__slides-total",
    },
    slideButtonLeft: {
      className: "project-popup__slide-button-left",
      onclick: function () {
        var previousImageSrc =
          projects[this.dataState.currentProjectIdx].images[
            this.viewState.currentSlide.value - 2
          ];

        this.swipeSlideLeft(previousImageSrc || "");
      },
    },
    slideButtonRight: {
      className: "project-popup__slide-button-right",
      onclick: function () {
        var nextImageSrc =
          projects[this.dataState.currentProjectIdx].images[
            this.viewState.currentSlide.value
          ];

        this.swipeSlideRight(nextImageSrc || "", app.alreadyLoadedImages);
      },
    },
  };

  var methods = {
    closePopup,
    activatePopup,
    swipeSlideLeft,
    swipeSlideRight,
  };

  return reaction({
    dataState,
    viewState,
    methods,
  });
}

function initProjects(projectPopupComponent) {
  var projectListParent = document.getElementsByClassName("project-list")[0];

  if (!projectPopupComponent) {
    console.error("initProjects error: we need a projectPopupComponent");

    return;
  }

  projects.sort((a, b) => a.dateOfCreation - b.dateOfCreation);

  for (let i = 0; i < projects.length; ++i) {
    var newImageElement = document.createElement("img");
    newImageElement.src = projects[i].images[0];
    newImageElement.classList.add("project__image");

    var newProjectElement = document.createElement("div");
    newProjectElement.classList.add("project");

    newProjectElement.appendChild(newImageElement);

    projectListParent.appendChild(newProjectElement);

    newProjectElement.addEventListener("click", () => {
      projectPopupComponent.activatePopup(
        i,
        projects[i].images,
        projects[i].title[app.language],
        projects[i].tags,
        formatDate(projects[i].dateOfCreation, app.language),
        projects[i].link
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

  var projectPopupComponent = initProjectPopup();
  initProjects(projectPopupComponent);

  particlesJS.load("particles", "./src/json/particles_config.json");
}

document.addEventListener("DOMContentLoaded", initApplication);
