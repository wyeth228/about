/**
 * creates image element
 * @param {string} src
 * @param {Array<string>} classNames
 * @returns {HTMLImageElement}
 */
export default function createImageElement(src, classNames) {
  var img = document.createElement("img");
  img.src = src;

  for (var i = 0; i < classNames.length; ++i) {
    var className = classNames[i];

    img.classList.add(className);
  }

  return img;
}
