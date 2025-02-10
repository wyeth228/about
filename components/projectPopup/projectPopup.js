define(function () {
  var config = {
    ROOT_ID: "project-popup",
    CLOSE_BUTTON_ID: "project-popup__close-button",
    TITLE_ID: "project-popup__title",
    TAGS_ID: "project-popup__tags",
    DATE_ID: "project-popup__date",
    LINK_ID: "project-popup__link",

    ROOT_CLASSNAME: "project-popup",
    CLOSE_BUTTON_CLASSNAME: "project-popup__close-button",
    LINK_HIDDEN_CLASSNAME: "project-popup__link_hidden",
    ROOT_HIDDEN_CLASSNAME: "project-popup_hidden",
  };

  var eventBus = undefined;

  function removeScrollForBody() {
    document.body.style.overflow = "hidden";
  }

  function setPopupTitle(titleText) {
    document.getElementById(config.TITLE_ID).innerText = titleText;
  }

  function setPopupTags(tags) {
    tags = tags
      .map(function (tag) {
        return "#" + tag;
      })
      .join(" ");

    document.getElementById(config.TAGS_ID).innerText = tags;
  }

  function setPopupDate(dateString) {
    document.getElementById(config.DATE_ID).innerText = dateString;
  }

  function setPopupLink(value) {
    var linkElement = document.getElementById(config.LINK_ID);

    if (!value) {
      linkElement.classList.add(config.LINK_HIDDEN_CLASSNAME);
    } else {
      linkElement.classList.remove(config.LINK_HIDDEN_CLASSNAME);
      linkElement.href = value;
    }
  }

  function makeVisiblePopupElement() {
    getRoot().classList.remove(config.ROOT_HIDDEN_CLASSNAME);
  }

  function activatePopup(title, tags, dateOfCreation, link) {
    removeScrollForBody();

    setPopupTitle("💼 " + title);
    setPopupTags(tags);
    setPopupDate(dateOfCreation);
    setPopupLink(link);

    makeVisiblePopupElement();
  }

  function getRoot() {
    return document.getElementById(config.ROOT_ID);
  }

  function returnBackScrollForBody() {
    document.body.style.overflow = "visible";
  }

  function hidePopupElement() {
    getRoot().classList.add(config.ROOT_HIDDEN_CLASSNAME);
  }

  function closePopup(event) {
    if (
      !event.target.classList.contains(config.ROOT_CLASSNAME) &&
      !event.target.classList.contains(config.CLOSE_BUTTON_CLASSNAME)
    ) {
      return;
    }

    returnBackScrollForBody();

    hidePopupElement();
  }

  function initEvents() {
    getRoot().addEventListener("click", closePopup);

    eventBus.onEventHappens("activateProjectPopup", function (data) {
      activatePopup(data.title, data.tags, data.dateOfCreation, data.link);

      eventBus.sendEvent("activateSlider", data.images);
    });
  }

  return {
    init: function (eventBusDependency) {
      eventBus = eventBusDependency;

      initEvents();
    },
  };
});
