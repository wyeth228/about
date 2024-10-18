import getImage from "./getImage.js";

export default function setPopupImage(rootElement, value) {
  getImage(rootElement).src = value;
}
