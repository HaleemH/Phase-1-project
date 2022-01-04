document.addEventListener('DOMContentLoaded', init);

let list = document.querySelector("#list")
let engine = document.querySelector(".form")
let searchInput;

function init(){
  fetchTeams()
  createSearchFunction()
}

//fetch all teams
  function fetchTeams() {
      fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((teams) => {
          console.log(teams);
          teams.forEach(element => {
          sideNav(element)
        });
      });
}

//establish eventlistener
//check to see if input matches teamname, if so display it
function createSearchFunction(){
  engine.addEventListener('submit', (e) => {
    e.preventDefault();
    searchInput = document.querySelector("#teamName").value;
    console.log(searchInput);

    //check teams and display...need to change html elements here
    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((teams) => {
          teams.forEach(element => {
            if(element.name === searchInput){
              //element.name
              //element.city
              //element.conference
              //element.division
            }
          });
        });
  })
}

//append to side nav
function sideNav(teams){
  const li = document.createElement("li")
  li.innerText = teams.name
  list.appendChild(li)
}
