/**
 * @returns {void}
 */
export default function loadImage(src, callback) {
  var newImage = new Image();
  newImage.src = src;

  newImage.onload = function () {
    callback(newImage);
  };
}
