define(["utils/requests"], function (utils) {
  var config = {
    ROOT_ID: "slider",
    IMAGE_ID: "slider__image",
    LEFT_BUTTON_ID: "slider__left-button",
    RIGHT_BUTTON_ID: "slider__right-button",
    SLIDES_TOTAL_ID: "slider__slides-total",
    CURRENT_SLIDE_ID: "slider__current-slide",
    HANDLE_ID: "slider__handle",

    HANDLE_HIDDEN_CLASSNAME: "slider__handle_hidden",
  };

  var eventBus = undefined;

  var images = [];

  var currentSlide = 0;

  function changeImage() {
    utils.loadImage(images[currentSlide], function (imageSrc) {
      document.getElementById(config.IMAGE_ID).style.backgroundImage =
        "url(" + imageSrc + ")";
    });
  }

  function changeTotalSlidesQuantity() {
    document.getElementById(config.SLIDES_TOTAL_ID).innerHTML = images.length;
  }

  function changeCurrentSlideNumber() {
    document.getElementById(config.CURRENT_SLIDE_ID).innerHTML =
      currentSlide + 1;
  }

  function updateView() {
    changeImage();
    changeTotalSlidesQuantity();
    changeCurrentSlideNumber();
  }

  function previousSlide() {
    if (currentSlide > 0) {
      currentSlide -= 1;

      updateView();
    }
  }

  function nextSlide() {
    if (currentSlide + 1 <= images.length - 1) {
      currentSlide += 1;

      updateView();
    }
  }

  function activateSlider(imagesData) {
    images = imagesData;

    if (images.length === 1) {
      document
        .getElementById(config.HANDLE_ID)
        .classList.add(config.HANDLE_HIDDEN_CLASSNAME);
    } else {
      document
        .getElementById(config.HANDLE_ID)
        .classList.remove(config.HANDLE_HIDDEN_CLASSNAME);
    }

    currentSlide = 0;

    updateView();
  }

  function initEvents() {
    eventBus.onEventHappens("activateSlider", function (imagesData) {
      activateSlider(imagesData);
    });

    document
      .getElementById(config.LEFT_BUTTON_ID)
      .addEventListener("click", previousSlide);
    document
      .getElementById(config.RIGHT_BUTTON_ID)
      .addEventListener("click", nextSlide);
  }

  return {
    init: function (eventBusDependency) {
      eventBus = eventBusDependency;

      initEvents();
    },
  };
});
