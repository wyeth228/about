/**
 * @param {string} string
 * @returns {Element}
 */
export default function (string) {
  var div = document.createElement("div");
  div.innerHTML = string.trim();

  return div.children[0];
}
