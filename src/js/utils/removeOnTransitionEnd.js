export default function removeOnTransitionEnd(element, callback) {
  element.removeEventListener("transitionend", callback);
}
