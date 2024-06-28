import getTreeFromHTMLString from "../utils/getTreeFromHTMLString.js";

/**
 * @typedef {object} PopupHandles
 * @property {function} activatePopup
 */

/**
 * @type {Element}
 */
var root = undefined;
/**
 * @type {Project[]}
 */
var allProjects = undefined;
/**
 * @type {object}
 */
var imagesCache = undefined;

var currentSlide = 0;
var slidesTotal = 0;

var currentProjectIdx = 0;

var template = `
	<div class="project-popup project-popup_hidden">
		<div class="project-popup__content">
			<div class="project-popup__title-wrapper">
				<h3 class="project-popup__title">Title</h3>

				<a class="project-popup__link" href="#" target="_blank">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						version="1.1"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
					>
						<polyline
							points="8.25 2.75,2.75 2.75,2.75 13.25,13.25 13.25,13.25 7.75"
						/>
						<path d="m13.25 2.75-5.5 5.5m3-6.5h3.5v3.5" />
					</svg>
				</a>
			</div>

			<span class="project-popup__tags">information</span>

			<div class="project-popup__date">январь 01, 2024</div>

			<div class="project-popup__image-wrapper">
				<img
					class="project-popup__image"
					src="./src/assets/images/projects/weather_knower.png"
				/>
			</div>

			<button class="project-popup__close-button">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
					/>
				</svg>
			</button>

			<div class="project-popup__slides">
				<button
					class="project-popup__slide-button project-popup__slide-button-left"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							d="M13.9783 5.31877L10.7683 8.52877L8.79828 10.4888C7.96828 11.3188 7.96828 12.6688 8.79828 13.4988L13.9783 18.6788C14.6583 19.3588 15.8183 18.8688 15.8183 17.9188V12.3088V6.07877C15.8183 5.11877 14.6583 4.63877 13.9783 5.31877Z"
						/>
					</svg>
				</button>

				<div class="project-popup__slide-quantity">
					<span class="project-popup__current-slide">1</span> /
					<span class="project-popup__slides-total">3</span>
				</div>
				
				<button
					class="project-popup__slide-button project-popup__slide-button-right"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							d="M15.1997 10.4919L13.2297 8.52188L10.0197 5.31188C9.33969 4.64188 8.17969 5.12188 8.17969 6.08188V12.3119V17.9219C8.17969 18.8819 9.33969 19.3619 10.0197 18.6819L15.1997 13.5019C16.0297 12.6819 16.0297 11.3219 15.1997 10.4919Z"
						/>
					</svg>
				</button>
			</div>

			<div class="project-popup__loading project-popup__loading_hidden">
				<div class="project-popup__loading-dot"></div>
			</div>
		</div>
	</div>
`;

/**
 * @returns {HTMLImageElement}
 */
function getImage() {
  return root.querySelector(".project-popup__image");
}

/**
 * @returns {HTMLDivElement}
 */
function getLoading() {
  return root.querySelector(".project-popup__loading");
}

/**
 * @returns {void}
 */
function loadImage(src, callback) {
  var newImage = new Image();
  newImage.src = src;

  newImage.onload = function () {
    callback(newImage);
  };
}

/**
 * @param {number} projectIdx
 * @param {string[]} images
 * @param {string} title
 * @param {string[]} tags
 * @param {string} dateOfCreation
 * @param {string} link
 */
function activatePopup(projectIdx, images, title, tags, dateOfCreation, link) {
  /**
   * removing scroll for body
   */
  document.body.classList.add("body_hidden");

  currentProjectIdx = projectIdx;
  slidesTotal = images.length;
  currentSlide = 0;

  /**
   * placing some data to the popup content
   */
  root.querySelector(".project-popup__title").innerText = "💼 " + title;
  root.querySelector(".project-popup__tags").innerText = tags
    .map((tag) => "#" + tag)
    .join(" ");
  root.querySelector(".project-popup__date").innerText = dateOfCreation;
  getImage().src = images[0];
  root.querySelector(".project-popup__current-slide").innerText = 1;
  root.querySelector(".project-popup__slides-total").innerText = images.length;

  var linkElement = root.querySelector(".project-popup__link");

  if (!link) {
    linkElement.classList.add("project-popup__link_hidden");
  } else {
    linkElement.classList.remove("project-popup__link_hidden");
    linkElement.href = link;
  }

  /**
   * make popup visible
   */
  root.classList.remove("project-popup_hidden");
}

function closePopup(event) {
  if (
    event.target.classList.contains("project-popup") ||
    event.target.classList.contains("project-popup__close-button")
  ) {
    root.querySelector(".project-popup__image").src = "";
    document.body.classList.remove("body_hidden");
    root.classList.add("project-popup_hidden");
  }
}

function previousSlide() {
  if (currentSlide > 0) {
    currentSlide--;

    root.querySelector(".project-popup__current-slide").innerText =
      currentSlide + 1;

    var previousImageSrc = allProjects[currentProjectIdx].images[currentSlide];

    getImage().src = previousImageSrc;
  }
}

function nextSlide() {
  if (currentSlide >= slidesTotal - 1) {
    return;
  }

  currentSlide++;

  root.querySelector(".project-popup__current-slide").innerText =
    currentSlide + 1;

  var nextImageSrc = allProjects[currentProjectIdx].images[currentSlide];

  /**
   * if the image is already loaded, we just place his path to the image src tag
   */
  if (nextImageSrc in imagesCache) {
    getImage().src = nextImageSrc;

    return;
  }

  /**
   * but if image is not loaded, load image and save to the cache
   */
  getLoading().classList.remove("project-popup__loading_hidden");
  getImage().classList.add("project-popup__image_hidden");
  loadImage(nextImageSrc, function (newImage) {
    imagesCache[nextImageSrc] = newImage;

    var imageElement = getImage();
    imageElement.src = nextImageSrc;
    imageElement.classList.remove("project-popup__image_hidden");

    getLoading().classList.add("project-popup__loading_hidden");
  });
}

/**
 *
 * @param {string} placeElementID
 * @param {object[]} projects
 * @param {object} alreadyLoadedImages
 * @returns {PopupHandles}
 */
export default function (placeElementID, projects, alreadyLoadedImages) {
  /**
   * placing this popup element to the html document
   */
  root = getTreeFromHTMLString(template);
  var replaceWith = document.getElementById(placeElementID);
  replaceWith.parentNode.replaceChild(root, replaceWith);

  allProjects = projects;
  imagesCache = alreadyLoadedImages;

  root.addEventListener("click", closePopup);

  root
    .querySelector(".project-popup__slide-button-left")
    .addEventListener("click", previousSlide);

  root
    .querySelector(".project-popup__slide-button-right")
    .addEventListener("click", nextSlide);

  return {
    activatePopup,
  };
}
