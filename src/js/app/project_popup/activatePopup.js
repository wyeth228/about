/**
 * @param {number} currentProjectIdx
 * @param {array} images
 * @param {string} title
 * @param {array} tags
 * @param {number} dateOfCreation
 * @param {string} link
 */
export default function (
  projectIdx,
  images,
  title,
  tags,
  dateOfCreation,
  link
) {
  document.body.classList.add("body_hidden");

  this.dataState.currentProjectIdx = projectIdx;

  this.viewState.title.value = "💼 " + title;
  this.viewState.tags.value = tags.map((tag) => "#" + tag).join(" ");
  this.viewState.date.value = dateOfCreation;
  this.viewState.image.value = images[0];
  this.viewState.currentSlide.value = 1;
  this.viewState.slidesTotal.value = images.length;

  if (!link) {
    this.viewState.link.hidden = true;
  } else {
    this.viewState.link.hidden = false;
    this.viewState.link.value = link;
  }

  this.viewState.root.hidden = false;
}
