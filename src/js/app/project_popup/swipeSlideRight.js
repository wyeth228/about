/**
 * @param {string} nextImageSrc
 */
export default function (nextImageSrc) {
  if (this.viewState.currentSlide.value < this.viewState.slidesTotal.value) {
    this.viewState.currentSlide.value++;

    this.viewState.loading.hidden = false;

    this.viewState.image.hidden = true;

    var img = new Image();
    img.src = nextImageSrc;
    img.onload = () => {
      this.viewState.image.value = nextImageSrc;
      this.viewState.image.hidden = false;

      this.viewState.loading.hidden = true;
    };
  }
}
