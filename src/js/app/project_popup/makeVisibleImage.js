import getImage from "./getImage.js";

export default function makeVisibleImage(rootElement) {
  getImage(rootElement).classList.remove("project-popup__image_hidden");
}
