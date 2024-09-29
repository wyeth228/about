import createDivElement from "../../utils/createDivElement.js";
import createImageElement from "../../utils/createImageElement.js";
import formatDate from "../../utils/formatDate.js";
import onClick from "../../utils/onClick.js";

export default function createProjectElements(
  parent,
  projects,
  activatePopup,
  projectPopup
) {
  for (let i = 0; i < projects.length; ++i) {
    var project = projects[i];

    var projectElement = createDivElement(["project"]);

    projectElement.appendChild(
      createImageElement(project.images[0], ["project__image"])
    );

    onClick(projectElement, function () {
      activatePopup(
        i,
        projects[i].images,
        projects[i].title[app.language],
        projects[i].tags,
        formatDate(projects[i].dateOfCreation, app.language),
        projects[i].link || "",
        projectPopup
      );
    });

    parent.appendChild(projectElement);
  }
}
