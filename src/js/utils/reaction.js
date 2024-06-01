var elements = {};

function registerProxyToElement(elementState) {
  var handler = {
    set: function (target, key, value) {
      target[key] = value;

      if (key === "hidden") {
        if (target.hiddenClassName) {
          if (value) {
            elements[target.className].classList.add(target.hiddenClassName);
          } else {
            elements[target.className].classList.remove(target.hiddenClassName);
          }

          return true;
        }
      }

      if (target.isAttributeValue) {
        elements[target.className][target.attributeName] = value;
      } else {
        elements[target.className].innerHTML = value;
      }

      return true;
    },
  };

  return new Proxy(elementState, handler);
}

export default function (viewState) {
  for (var elementStateKey in viewState) {
    var elementState = viewState[elementStateKey];

    viewState[elementStateKey] = registerProxyToElement(elementState);

    elements[elementState.className] = document.getElementsByClassName(
      elementState.className
    )[0];

    if (elementState.onclick) {
      elements[elementState.className].addEventListener(
        "click",
        elementState.onclick
      );
    }
  }

  return viewState;
}
