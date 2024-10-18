import activatePopup from "./project_popup/activatePopup.js";
import loadHTMLTemplate from "./project_popup/loadHTMLTemplate.js";
import onTemplateLoad from "./project_popup/onTemplateLoad.js";

var projectPopup = {
  rootElement: undefined,
  imagesCache: {},
  currentSlide: 0,
  slidesTotal: 0,
  currentProjectIdx: 0,
};

export default function (imagesCache, initProjects) {
  projectPopup.imagesCache = imagesCache;

  initProjects(activatePopup, projectPopup);

  loadHTMLTemplate(function (template) {
    onTemplateLoad(template, projectPopup);
  });
}
