document.addEventListener("DOMContentLoaded", init);

let list = document.querySelector("#list");
let engine = document.querySelector(".form");
let searchInput;
//formIds
const fName = document.querySelector("#teamName"); //.innerText = element.name;
const fCity = document.querySelector("#teamCity"); //.innerText = element.city;
const fConf = document.querySelector("#teamConference"); //.innerText = element.conference;
const fDiv = document.querySelector("#teamDivision"); //.innerText = element.division;
const display = document.querySelector("#display");

function init() {
  fetchTeams();
  createSearchFunction();
}

//fetch all teams
function fetchTeams() {
  fetch("http://localhost:3000/data")
    .then((res) => res.json())
    .then((teams) => {
      // console.log(teams);
      teams.forEach((element) => {
        sideNav(element);
      });
    });
}

//establish eventlistener
//check to see if input matches teamname, if so display it
function createSearchFunction() {
  engine.addEventListener("submit", handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();
  searchInput = document.querySelector("#name").value;
  console.log(searchInput);

  //check teams and display...need to change html elements here
  fetch("http://localhost:3000/data")
    .then((res) => res.json())
    .then((teams) => {
      teams.forEach((element) => {
        if (element.name.toUpperCase() === searchInput.toUpperCase()) {
          const img = document.createElement("img");
          img.src = element.img;
          display.prepend(img);
          const name = element.name;
          fName.append(name);
          const city = element.city;
          fCity.append(city);
          const conf = element.conference;
          fConf.append(conf);
          const div = element.division;
          fDiv.append(div);
        }
      });
    });
}

//append to side nav
function sideNav(teams) {
  const li = document.createElement("li");
  li.innerText = teams.name;
  list.appendChild(li);

  //click event on list items
  const clicked = li.addEventListener("click", (e) => {
    const click = e.target.innerHTML;
    console.log(click);

    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((teams) => {
        teams.forEach((element) => {
          if (element.name === click) {
            const img = document.createElement("img");
            img.src = element.img;
            display.prepend(img);
            const name = element.name;
            fName.append(name);
            const city = element.city;
            fCity.append(city);
            const conf = element.conference;
            fConf.append(conf);
            const div = element.division;
            fDiv.append(div);
          }
        });
      });
  });
}
