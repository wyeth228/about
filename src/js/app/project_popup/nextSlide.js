import isLastSlide from "./isLastSlide.js";
import projects from "../../data/projects.js";
import setPopupCurrentSlide from "./setPopupCurrentSlide.js";
import setPopupImage from "./setPopupImage.js";
import makeVisibleLoading from "./makeVisibleLoading.js";
import loadImage from "../../utils/loadImage.js";
import makeVisibleImage from "./makeVisibleImage.js";
import hideLoadingElement from "./hideLoadingElement.js";
import hideImageElement from "./hideImageElement.js";

export default function nextSlide(projectPopup) {
  if (isLastSlide(projectPopup)) {
    return;
  }

  projectPopup.currentSlide++;
  setPopupCurrentSlide(projectPopup.rootElement, projectPopup.currentSlide + 1);

  var nextImageSrc =
    projects[projectPopup.currentProjectIdx].images[projectPopup.currentSlide];

  if (nextImageSrc in projectPopup.imagesCache) {
    setPopupImage(projectPopup.rootElement, nextImageSrc);

    return;
  }

  makeVisibleLoading(projectPopup.rootElement);

  hideImageElement(projectPopup.rootElement);

  loadImage(nextImageSrc, function (newImage) {
    projectPopup.imagesCache[nextImageSrc] = newImage;

    setPopupImage(projectPopup.rootElement, nextImageSrc);

    makeVisibleImage(projectPopup.rootElement);

    hideLoadingElement(projectPopup.rootElement);
  });
}
