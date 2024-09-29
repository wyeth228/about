export default function loadHTMLTemplate(callback) {
  fetch("./src/html/project_popup.html").then(function (response) {
    response.text().then(function (text) {
      callback(text);
    });
  });
}
