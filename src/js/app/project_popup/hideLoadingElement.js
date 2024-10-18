import getLoading from "./getLoading.js";

export default function hideLoadingElement(rootElement) {
  getLoading(rootElement).classList.add("project-popup__loading_hidden");
}
