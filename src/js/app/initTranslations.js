import textTranslations from "../data/text_translations.js";

export default function initTranslations() {
  for (var elementClassName of Object.keys(textTranslations)) {
    var element = document.getElementsByClassName(elementClassName)[0];

    if (!element) {
      console.error(
        "initTranslations error: cannot find the " +
          elementClassName +
          " element"
      );

      continue;
    }

    element.innerHTML = textTranslations[elementClassName][app.language];
  }
}
