/**
 * @param {string} wrapperClassName
 * @param {string} childClassName: class name of elements which we need to clone
 * @returns {void}
 */
export default function (wrapperClassName, childClassName) {
  var children = document.getElementsByClassName(childClassName);
  var wrapper = document.getElementsByClassName(wrapperClassName)[0];

  if (!children || !wrapper) {
    console.error("cloneElements error: cannot find the wrapper and children");

    return;
  }

  var childrenLength = children.length;

  for (var i = 0; i < childrenLength; ++i) {
    var child = children[i];

    var childNodeClone = child.cloneNode(true);

    wrapper.appendChild(childNodeClone);
  }
}
