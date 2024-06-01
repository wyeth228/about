import LANGUAGES from "./enums/languages.js";
import projects from "./data/projects.js";
import textTranslations from "./data/text_translations.js";
import formatDate from "./utils/formatDate.js";
import cloneElements from "./utils/cloneElements.js";
import reaction from "./utils/reaction.js";

var app = {
  language: LANGUAGES.EN,
};

function initInfiniteSlider() {
  cloneElements("skills-wrapper", "skill");
}

function initProjectPopup() {
  var currentProjectIdx = 0;

  var popupViewState = reaction({
    root: {
      className: "project-popup",
      hidden: true,
      hiddenClassName: "project-popup_hidden",
      onclick: function (event) {
        if (
          event.target.classList.contains("project-popup") ||
          event.target.classList.contains("project-popup__close-button")
        ) {
          popupViewState.root.hidden = true;
        }
      },
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
    imageSrc: {
      value: "",
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
        if (popupViewState.currentSlide.value > 1) {
          popupViewState.currentSlide.value--;

          popupViewState.imageSrc.value =
            projects[currentProjectIdx].images[
              popupViewState.currentSlide.value - 1
            ];
        }
      },
    },
    slideButtonRight: {
      className: "project-popup__slide-button-right",
      onclick: function () {
        if (
          popupViewState.currentSlide.value < popupViewState.slidesTotal.value
        ) {
          popupViewState.currentSlide.value++;

          popupViewState.imageSrc.value =
            projects[currentProjectIdx].images[
              popupViewState.currentSlide.value - 1
            ];
        }
      },
    },
  });

  var closePopup = function () {
    popupViewState.root.hidden = true;
  };

  var activatePopup = function (projectIdx) {
    currentProjectIdx = projectIdx;

    popupViewState.slidesTotal.value = projects[projectIdx].images.length;

    popupViewState.title.value =
      "💼 " + projects[currentProjectIdx].title[app.language];
    popupViewState.tags.value = projects[currentProjectIdx].tags
      .map((tag) => "#" + tag)
      .join(" ");
    popupViewState.date.value = formatDate(
      projects[currentProjectIdx].dateOfCreation,
      app.language
    );
    popupViewState.imageSrc.value = projects[currentProjectIdx].images[0];
    popupViewState.currentSlide.value = 1;
    popupViewState.slidesTotal.value =
      projects[currentProjectIdx].images.length;

    if (!projects[currentProjectIdx].link) {
      popupViewState.link.hidden = true;
    } else {
      popupViewState.link.hidden = false;
      popupViewState.link.value = projects[currentProjectIdx].link;
    }

    popupViewState.root.hidden = false;
  };

  return [closePopup, activatePopup];
}

function initProjects(closePopup, activatePopup) {
  var projectListParent = document.getElementsByClassName("project-list")[0];

  if (!closePopup || !projectListParent) {
    console.error(
      "initProjects error: cannot find the root or popup not initialed"
    );

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

    newProjectElement.addEventListener("click", function () {
      activatePopup(i);
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

  var [closePopup, activatePopup] = initProjectPopup();

  initProjects(closePopup, activatePopup);

  initTranslations();

  particlesJS.load("particles", "./src/json/particles_config.json");
}

document.addEventListener("DOMContentLoaded", initApplication);
