import getImage from "./getImage.js";

export default function hideImageElement(rootElement) {
  getImage(rootElement).classList.add("project-popup__image_hidden");
}
