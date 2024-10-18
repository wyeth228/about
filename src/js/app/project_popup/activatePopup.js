import removeScrollForBody from "../../utils/removeScrollForBody.js";
import setPopupTitle from "./setPopupTitle.js";
import setPopupTags from "./setPopupTags.js";
import setPopupDate from "./setPopupDate.js";
import setPopupImage from "./setPopupImage.js";
import setPopupCurrentSlide from "./setPopupCurrentSlide.js";
import setPopupSlidesTotal from "./setPopupSlidesTotal.js";
import setPopupLink from "./setPopupLink.js";
import makeVisiblePopupElement from "./makeVisiblePopupElement.js";

export default function activatePopup(
  projectIdx,
  images,
  title,
  tags,
  dateOfCreation,
  link,
  projectPopup
) {
  removeScrollForBody();

  projectPopup.currentProjectIdx = projectIdx;
  projectPopup.slidesTotal = images.length;
  projectPopup.currentSlide = 0;

  setPopupTitle(projectPopup.rootElement, "💼 " + title);
  setPopupTags(
    projectPopup.rootElement,
    tags.map((tag) => "#" + tag).join(" ")
  );
  setPopupDate(projectPopup.rootElement, dateOfCreation);
  setPopupImage(projectPopup.rootElement, images[0]);
  setPopupCurrentSlide(projectPopup.rootElement, projectPopup.currentSlide + 1);
  setPopupSlidesTotal(projectPopup.rootElement, images.length);
  setPopupLink(projectPopup.rootElement, link);

  makeVisiblePopupElement(projectPopup.rootElement);

  /**
   * test
   */
  projectPopup.rootElement.style.opacity = 0;
  projectPopup.rootElement.children[0].style.transform = `translate(0px, 4%)`;
  setTimeout(function () {
    projectPopup.rootElement.children[0].style.transform = `translate(0px, 0%)`;
    projectPopup.rootElement.style.opacity = 1;
  });
}
