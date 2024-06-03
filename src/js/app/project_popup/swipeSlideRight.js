/**
 * @param {string} nextImageSrc
 * @param {object} alreadyLoadedImages
 */
export default function (nextImageSrc, alreadyLoadedImages) {
  if (this.viewState.currentSlide.value >= this.viewState.slidesTotal.value) {
    return;
  }

  this.viewState.currentSlide.value++;

  if (nextImageSrc in alreadyLoadedImages) {
    this.viewState.image.value = nextImageSrc;
  } else {
    this.viewState.loading.hidden = false;

    this.viewState.image.hidden = true;

    var img = new Image();
    img.src = nextImageSrc;
    img.onload = () => {
      alreadyLoadedImages[nextImageSrc] = img;

      this.viewState.image.value = nextImageSrc;
      this.viewState.image.hidden = false;

      this.viewState.loading.hidden = true;
    };
  }
}
