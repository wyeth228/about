import getTreeFromHTMLString from "../utils/getTreeFromHTMLString.js";
import activatePopup from "./project_popup/activatePopup.js";
import loadHTMLTemplate from "./project_popup/loadHTMLTemplate.js";
import closePopup from "./project_popup/closePopup.js";
import previousSlide from "./project_popup/previousSlide.js";
import nextSlide from "./project_popup/nextSlide.js";

var projectPopup = {
  rootElement: undefined,
  imagesCache: {},
  currentSlide: 0,
  slidesTotal: 0,
  currentProjectIdx: 0,
};

function onTemplateLoad(htmlTemplate, imagesCache) {
  projectPopup.rootElement = getTreeFromHTMLString(htmlTemplate);

  var popupPlaceElement = document.getElementById("project-popup");
  popupPlaceElement.parentNode.replaceChild(
    projectPopup.rootElement,
    popupPlaceElement
  );

  projectPopup.imagesCache = imagesCache;

  projectPopup.rootElement.addEventListener("click", function (event) {
    closePopup(event, projectPopup.rootElement);
  });

  projectPopup.rootElement
    .querySelector(".project-popup__slide-button-left")
    .addEventListener("click", function () {
      previousSlide(projectPopup);
    });
  projectPopup.rootElement
    .querySelector(".project-popup__slide-button-right")
    .addEventListener("click", function () {
      nextSlide(projectPopup);
    });
}

export default function (imagesCache, onInit) {
  onInit(activatePopup, projectPopup);

  loadHTMLTemplate((template) => onTemplateLoad(template, imagesCache));
}
