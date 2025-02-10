define(["utils/dom"], function (utils) {
  var config = {
    RESUME_WRAPPER_ID: "resume-wrapper",

    RESUME_PART_CLASSNAME: "resume-part",
    RESUME_PART_TITLE_CLASSNAME: "resume-part__title",
  };

  var eventBus = undefined;

  function initYear() {
    var date = new Date();

    document.getElementById("year").innerHTML = date.getFullYear();
  }

  function renderResume(resumeWrapper, resumeTranslations, language) {
    for (var i = 0; i < resumeTranslations.length; ++i) {
      var resumePart = resumeTranslations[i];

      var resumePartElement = utils.createDivElement([
        config.RESUME_PART_CLASSNAME,
      ]);

      var resumePartTitleElement = utils.createParagraphElement(
        [config.RESUME_PART_TITLE_CLASSNAME],
        resumePart.title[language]
      );

      resumePartElement.appendChild(resumePartTitleElement);

      for (var y = 0; y < resumePart.p.length; ++y) {
        var resumeParagraph = resumePart.p[y];

        var paragraphElement = utils.createParagraphElement(
          [],
          resumeParagraph[language]
        );

        resumePartElement.appendChild(paragraphElement);
      }

      resumeWrapper.appendChild(resumePartElement);
    }
  }

  function initResume() {
    var resumeWrapper = document.getElementById(config.RESUME_WRAPPER_ID);

    eventBus.sendEvent("getResumeTranslations", function (resumeTranslations) {
      eventBus.sendEvent("getAppLanguage", function (language) {
        renderResume(resumeWrapper, resumeTranslations, language);
      });
    });
  }

  function handleAllHashLinks() {
    var links = document.querySelectorAll('[href^="#"]');

    for (var i = 0; i < links.length; ++i) {
      var link = links[i];

      link.addEventListener("click", function (event) {
        event.preventDefault();

        document
          .getElementById(event.target.href.split("#")[1])
          .scrollIntoView({
            behavior: "smooth",
          });
      });
    }
  }

  function initEvents() {
    handleAllHashLinks();
  }

  return {
    init: function (eventBusDependency) {
      eventBus = eventBusDependency;

      initEvents();

      initYear();

      initResume();
    },
  };
});
