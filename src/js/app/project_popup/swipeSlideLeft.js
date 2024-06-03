export default function (previousImageSrc) {
  if (this.viewState.currentSlide.value > 1) {
    this.viewState.currentSlide.value--;

    this.viewState.image.value = previousImageSrc;
  }
}
