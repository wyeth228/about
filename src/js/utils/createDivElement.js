/**
 * creates div element
 * @param {Array<string>} classNames
 * @returns {HTMLImageElement}
 */
export default function createDivElement(classNames) {
  var div = document.createElement("div");

  for (var i = 0; i < classNames.length; ++i) {
    var className = classNames[i];

    div.classList.add(className);
  }

  return div;
}
