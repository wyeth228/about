import getLoading from "./getLoading.js";

export default function makeVisibleLoading(rootElement) {
  getLoading(rootElement).classList.remove("project-popup__loading_hidden");
}
