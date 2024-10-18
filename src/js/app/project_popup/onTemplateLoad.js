import getTreeFromHTMLString from "../../utils/getTreeFromHTMLString.js";
import closePopup from "../project_popup/closePopup.js";
import previousSlide from "../project_popup/previousSlide.js";
import nextSlide from "../project_popup/nextSlide.js";

export default function onTemplateLoad(htmlTemplate, projectPopup) {
  var rootElement = getTreeFromHTMLString(htmlTemplate);

  projectPopup.rootElement = rootElement;

  var popupPlaceElement = document.getElementById("project-popup");
  popupPlaceElement.parentNode.replaceChild(rootElement, popupPlaceElement);

  rootElement.addEventListener("click", function (event) {
    closePopup(event, rootElement);
  });

  rootElement
    .querySelector(".project-popup__slide-button-left")
    .addEventListener("click", function () {
      previousSlide(projectPopup);
    });
  rootElement
    .querySelector(".project-popup__slide-button-right")
    .addEventListener("click", function () {
      nextSlide(projectPopup);
    });
}
