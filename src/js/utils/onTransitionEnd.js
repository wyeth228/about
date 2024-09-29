export default function onTransitionEnd(element, callback) {
  element.addEventListener("transitionend", callback);
}
