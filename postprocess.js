// Calls the function on page load
window.onload = function onPageLoad() {
  resolveArticleAge();

  // Update the last modified timestamp and format it
  lastUpdatedTimestampRefresh();

  // Update the year automatically cuz I'm LaZY tO Do Dathhh
  fillFooterCopyright();

  // Articles
  collectArticles();
  displayArticles();
};

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

// Appends 'NEW!' to the article date if the article is younger than 31 days.
function resolveArticleAge() {
  const elements = document.getElementsByClassName('article__date');

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

    //console.log(`For ${articleDate}, the difference is ${totalDays} days.`);

    if (totalDays <= 31) {
      elm.textContent += " NEW!";
    }
  }
}

const containerArticles = document.getElementById('articles');
const sectionElements = containerArticles.querySelectorAll('.section');

const article = {
  titleStr: "none",
  dateStr: "unset",
  descriptionStr: "none",
  pathTo: "./",
};

const section = {
  articles: [],
  sectionNameStr: "unknown",
};
const sortedSections = [];

function collectArticles() {
  // Iterate over all sections and create a list...
  sectionElements.forEach(function (sec, i) {
    const articleElements = sec.querySelectorAll('.article');

    // And all articles in such section...
    let articles = [];
    articleElements.forEach(function (art, i) {
      const currentArticle = {
        titleStr: art.querySelector('.article__name').innerHTML,
        dateStr: art.querySelector('.article__date').innerHTML,
        descriptionStr: art.querySelector('.article__desc').innerHTML,
        sectionStr: art.querySelector('.article__desc').innerHTML,
        pathTo: art.querySelector('.article__name').href,
      };
      articles.push(currentArticle);

      art.remove();
    });

    sortedSections.push({
      articles: articles,
      sectionNameStr: sec.id,
    });
  });

  // Sort by date
  sortedSections.forEach(function (sec) {
    sec.articles.sort((a, b) => {
      const dt1 = new Date(a.dateStr);
      const dt2 = new Date(b.dateStr);

      return dt2 - dt1; // the newer one'll be first
    });
  })

  //console.log(sortedSections);
}

function displayArticles() {
  // Now create the elements manually...
  sortedSections.forEach(function (sec) {
    const elmSection = document.getElementById(sec.sectionNameStr);
    sec.articles.forEach(function (art) {
      const html = `
        <div class="article">
          <div class="article__date">${art.dateStr}</div>
          <a class="article__name" href="${art.pathTo}">${art.titleStr}</a><br>
          <div class="article__desc">${art.descriptionStr}</div>
          <a href="${art.pathTo}" class="article__readmore">Read More</a>
        </div>
      `;

      elmSection.insertAdjacentHTML('beforebegin', html);
    });
  });
}