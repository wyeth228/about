export default function setPopupLink(rootElement, value) {
  var linkElement = rootElement.querySelector(".project-popup__link");

  if (!value) {
    linkElement.classList.add("project-popup__link_hidden");
  } else {
    linkElement.classList.remove("project-popup__link_hidden");
    linkElement.href = value;
  }
}
