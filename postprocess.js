// Calls the function on page load
window.addEventListener(
  "load",
  function () {
    // Update the last modified timestamp and format it
    lastUpdatedTimestampRefresh();

    // Update the year automatically cuz I'm LaZY tO Do Dathhh
    fillFooterCopyright();
  },
  true
);

function fillFooterCopyright() {
  document.querySelector('.footer__copyright').textContent = `Copyright © ${new Date().getFullYear()} oxiKKK`;
}

// We use this on multiple places
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

  document.getElementById("last_update_id").innerHTML =
    "Updated on " + getFormattedTime(date);
}

// Days between two dates
const getDayDifference = (date1, date2) => Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
