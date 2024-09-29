import projects from "../data/projects.js";
import sortByKey from "../utils/sortByKey.js";
import createProjectElements from "./projects/createProjectElements.js";

export default function initProjects(activatePopup, projectPopup) {
  if (!activatePopup || !projectPopup) {
    console.error(
      "initProjects error: we need a activatePopup and projectPopup"
    );

    return;
  }

  var parent = document.getElementsByClassName("project-list")[0];

  if (!parent) {
    console.error("initProjects error: we need a parent");

    return;
  }

  sortByKey(projects, "dateOfCreation", "asc");

  createProjectElements(parent, projects, activatePopup, projectPopup);
}
