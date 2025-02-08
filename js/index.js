window.APP_VERSION = "0.1.2";

var main = function (renderer, localizator, eventBus) {
  localizator.init();

  renderer.onPageRender(localizator.localizeHandler);

  renderer.init(eventBus, "app", ["/about/"]);

  eventBus.onEventHappens("getAppLanguage", function (callback) {
    callback(localizator.getLanguage());
  });

  eventBus.onEventHappens("getMonthsTranslation", function (callback) {
    var localizations = localizator.getLocalizations();

    if ("months" in localizations) {
      callback(localizations.months);
    } else {
      callback(null);
    }
  });

  eventBus.onEventHappens(
    "getProjectNameTranslation",
    function (index, callback) {
      var localizations = localizator.getLocalizations();

      if ("project_names" in localizations) {
        callback(localizations.project_names[index]);
      } else {
        callback(null);
      }
    }
  );

  eventBus.onEventHappens("getResumeTranslations", function (callback) {
    var localizations = localizator.getLocalizations();

    if ("resume" in localizations) {
      callback(localizations.resume);
    } else {
      callback(null);
    }
  });
};

requirejs.config({
  waitSeconds: 200,
  urlArgs: function (id, url) {
    var args = "v=" + window.APP_VERSION;

    if (url.indexOf("?") === -1) {
      return "?" + args;
    } else {
      return "&" + args;
    }
  },
});

requirejs(["renderer", "localizator", "eventBus"], main);
