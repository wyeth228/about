/**
 * @param {string} nextImageSrc
 * @param {object} alreadyLoadedImages
 */
export default function (nextImageSrc, alreadyLoadedImages) {
  if (this.viewState.currentSlide.value < this.viewState.slidesTotal.value) {
    this.viewState.currentSlide.value++;

    this.viewState.loading.hidden = false;

    this.viewState.image.hidden = true;

    if (nextImageSrc in alreadyLoadedImages) {
      this.viewState.image.value = nextImageSrc;
      this.viewState.image.hidden = false;

      this.viewState.loading.hidden = true;
    } else {
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
}
