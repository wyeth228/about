define(["utils/string", "utils/dom", "utils/requests", "utils/algo"], function (
  utilsString,
  utilsDOM,
  utilsRequests,
  utilsAlgo
) {
  var config = {
    ROOT_ID: "project-list",

    PROJECT_CLASSNAME: "project",
    PROJECT_IMAGE_CLASSNAME: "project__image",

    PROJECTS_SRC: "./json/projects.json",
  };

  var eventBus = undefined;

  function getDateOfCreation(dateOfCreation, language, monthsTranslations) {
    return utilsString.formatDate(dateOfCreation, language, monthsTranslations);
  }

  function getLink(link) {
    if (link) {
      return link;
    }

    return "";
  }

  function getLanguage(callback) {
    eventBus.sendEvent("getAppLanguage", callback);
  }

  function getMonthsTranslation(callback) {
    eventBus.sendEvent("getMonthsTranslation", callback);
  }

  function getProjectNameTranslation(index, callback) {
    eventBus.sendEvent("getProjectNameTranslation", index, callback);
  }

  function onProjectElementClick(projects, index) {
    getLanguage(function (language) {
      getMonthsTranslation(function (monthsTranslations) {
        getProjectNameTranslation(index, function (projectName) {
          var popupData = {
            images: projects[index].images,
            title: projectName[language],
            tags: projects[index].tags,
            dateOfCreation: getDateOfCreation(
              projects[index].date_of_creation,
              language,
              monthsTranslations
            ),
            link: getLink(projects[index].link),
          };

          eventBus.sendEvent("activateProjectPopup", popupData);
        });
      });
    });
  }

  function createProjectElements(projects, parentElement) {
    for (let i = 0; i < projects.length; ++i) {
      var project = projects[i];

      var projectElement = utilsDOM.createDivElement([
        config.PROJECT_CLASSNAME,
      ]);

      // var size = blob.size / Math.pow(1024, 2);

      //   if (size < 1) {
      //     size = blob.size / Math.pow(1024, 1);

      //     size = size.toFixed(2) + " kB";
      //   } else {
      //     size = size.toFixed(2) + " mB";
      //   }

      //   console.log(size);

      (function (pElement) {
        utilsRequests.loadImage(project.images[0], function (image) {
          pElement.style.backgroundImage = "url(" + image + ")";
        });
      })(projectElement);

      projectElement.addEventListener("click", function () {
        onProjectElementClick(projects, i);
      });

      parentElement.appendChild(projectElement);
    }
  }

  return {
    init: function (eventBusDependency) {
      eventBus = eventBusDependency;

      utilsRequests.loadJSON(config.PROJECTS_SRC, function (projects) {
        utilsAlgo.sortByKey(projects, "dateOfCreation", "asc");

        createProjectElements(
          projects,
          document.getElementById(config.ROOT_ID)
        );
      });
    },
  };
});
