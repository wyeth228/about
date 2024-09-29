function sortAsc(array, key) {
  array.sort(function (a, b) {
    if (a[key] < b[key]) {
      return -1;
    } else if (a[key] > b[key]) {
      return 1;
    }

    return 0;
  });
}

function sortDesc(array, key) {
  array.sort(function (a, b) {
    if (a[key] < b[key]) {
      return 1;
    } else if (a[key] > b[key]) {
      return -1;
    }

    return 0;
  });
}

export default function sortByKey(array, key, order) {
  switch (order) {
    case "asc":
      sortAsc(array, key);
      break;
    case "desc":
      sortDesc(array, key);
      break;
    default:
      sortAsc(array, key);
  }
}
