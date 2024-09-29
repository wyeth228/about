import setPopupImage from "./setPopupImage.js";
import hidePopupElement from "./hidePopupElement.js";
import returnBackScrollForBody from "../../utils/returnBackScrollForBody.js";
import translatePopupToBottom from "./translatePopupToBottom.js";
import changePopupOpacity from "./changePopupOpacity.js";
import onTransitionEnd from "../../utils/onTransitionEnd.js";
import removeOnTransitionEnd from "../../utils/removeOnTransitionEnd.js";

function close(rootElement, onTransitionEndCallback) {
  hidePopupElement(rootElement);

  returnBackScrollForBody();

  var popupContent = rootElement.children[0];

  removeOnTransitionEnd(popupContent, onTransitionEndCallback);

  setPopupImage(rootElement, "");
}

export default function closePopup(event, rootElement) {
  if (
    !event.target.classList.contains("project-popup") &&
    !event.target.classList.contains("project-popup__close-button")
  ) {
    return;
  }

  translatePopupToBottom(rootElement);
  changePopupOpacity(rootElement, 0);

  var onTransitionEndCallback = function () {
    close(rootElement, onTransitionEndCallback);
  };

  var popupContent = rootElement.children[0];

  onTransitionEnd(popupContent, onTransitionEndCallback);
}
