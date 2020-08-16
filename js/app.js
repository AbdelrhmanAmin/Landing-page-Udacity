// selecting all sections with dataset of nav, converting the nodelist to an Array
const sections = Array.from(document.querySelectorAll("section[data-nav]"));
const nav = document.querySelector("#navbar__list");
const collapse = Array.from(document.querySelectorAll("#collapse"));
const contents = Array.from(document.querySelectorAll("#content"));
const btn = document.querySelector("#btn");
//looping through each section and creating an unordered list and adding a unique dataset key to each li utilizing the section id
// using section dataset nav as the innerText of the navigation menu.
//appending each item to the navbar menu
//on page load; the navigation menu will be created & appended from all the sections that exist in the HTML

for (let x of collapse) {
  x.addEventListener("click", (e) => {
    for (let section of sections) {
      // if the clicked button target parentElement id match any section id of the section array
      if (
        section.id == e.srcElement.parentElement.parentElement.parentElement.id
      ) {
        // wrapped the paragraph in a div to make the collapsing effect easier
        for (let content of contents) {
          // if the content parent id match the targeted section id then toggle collapse.
          if (content.parentElement.parentElement.id == section.id) {
            content.classList.toggle("hider");
          }
        }
      }
    }
  });
}
window.onscroll = () => {
  if (
    document.body.scrollTop > 250 ||
    document.documentElement.scrollTop > 250
  ) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};
btn.addEventListener("click", () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
sectionCreator = () => {
  for (let section of sections) {
    let item = document.createElement("li");
    item.className = "menu__link";
    item.dataset.nav = section.id;
    item.innerText = section.dataset.nav;
    nav.appendChild(item);
  }
};
//locating the target by utilizing the unique dataset nav key and using javascript method scrollIntoView()
// Clicking on an item in the navigation menu should scroll to the choosen section
// this function is used as an event listener on the navigation menu as a click event.
clicker = (e) => {
  e.preventDefault();
  let item = document.getElementById(e.target.dataset.nav);
  item.classList.add("your-active-class");
  item.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
};

//test which section should be highlighted using .getBoundingClientRect();
/*
  calculating the top of the section item (by default first one) and when the next section starts to be on viewport the previous section classList will remove the highlight 
  and the current new section will be hightlighted 
*/
isInViewport = () => {
  let currentElem = sections[0]; // highlight first section on default
  let top = 500;
  let navMenu = Array.from(document.querySelectorAll(".menu__link"));
  for (item of sections) {
    let rect = item.getBoundingClientRect();
    //returns the size of an element and its position relative to the viewport.
    // console.log(rect, item.id);
    if (rect.top > -top && rect.top < top) {
      top = rect.top;
      currentElem = item;
    }
  }
  //highlight the section on the viewport and disable the rest of sections
  //usung classList methods to change the CSS
  for (let item of navMenu) {
    if (item.dataset.nav == currentElem.id) {
      item.classList.add("menu-active");
    } else {
      item.classList.remove("menu-active");
    }
  }
  currentElem.classList.add("your-active-class");
  for (item of sections) {
    if (item.id != currentElem.id) {
      item.classList.remove("your-active-class");
    }
  }
};
sectionCreator();
nav.addEventListener("click", clicker);
window.addEventListener("scroll", isInViewport);
