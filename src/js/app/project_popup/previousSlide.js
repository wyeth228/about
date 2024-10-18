import isFirstSlide from "./isFirstSlide.js";
import projects from "../../data/projects.js";
import setPopupCurrentSlide from "./setPopupCurrentSlide.js";
import setPopupImage from "./setPopupImage.js";

export default function previousSlide(projectPopup) {
  if (isFirstSlide(projectPopup)) {
    return;
  }

  projectPopup.currentSlide--;

  setPopupCurrentSlide(projectPopup.rootElement, projectPopup.currentSlide + 1);

  var previousImageSrc =
    projects[projectPopup.currentProjectIdx].images[projectPopup.currentSlide];

  setPopupImage(projectPopup.rootElement, previousImageSrc);
}
