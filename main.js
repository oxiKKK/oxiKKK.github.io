// Calls the function on page load
window.onload = function onPageLoad() {
  // Update the last modified timestamp and format it
  lastUpdatedTimestampRefresh();
};

// Returns formatted day (1st, 5th, 3rd, ...)
function getFormattedDay(day) {
  let modDay = day % 10;

  if (modDay == 3) return day + "rd";

  if (modDay == 2) return day + "nd";

  if (modDay == 1) return day + "st";

  return day + "th";
}

// Returns string with formatted date
function getFormattedTime(date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    getFormattedDay(date.getDate()) +
    " " +
    monthNames[date.getMonth()] +
    " " +
    date.getFullYear()
  );
}

function lastUpdatedTimestampRefresh() {
  let date = new Date(document.lastModified);

  document.getElementById("LastUpdatedID").innerHTML =
    "Site last updated on " + getFormattedTime(date);
}