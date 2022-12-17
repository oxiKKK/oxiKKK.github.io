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

// Calls the function on page load
window.onload = function onPageLoad() {
  // Update the last modified timestamp and format it
  lastUpdatedTimestampRefresh();

  resolveArticleAge();
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

// Appends 'NEW!' to the article date if the article is younger than 31 days.
function resolveArticleAge() {
  const elements = document.getElementsByClassName('ArticleDate');

  for (let i = 0, length = elements.length; i < length; i++) {
    const elm = elements[i];
    // Assume the text content is already in a format that 
    // the Date object expects.
    const articleDate = new Date(elm.textContent);
    const currentDate = new Date();

    if (isNaN(articleDate)) {
      console.error(`Unknown article date: ${elm.textContent}`);
      return;
    }

    const totalDays = getDayDifference(articleDate, currentDate);

    console.log(`For ${articleDate}, the difference is ${totalDays} days.`);

    if (totalDays <= 31) {
      elm.textContent += " NEW!";
    }
  }
}