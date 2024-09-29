export default function initYear() {
  var date = new Date();
  document.getElementById("year").innerHTML = date.getFullYear();
}
