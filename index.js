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
          teams.forEach(element => {
          sideNav(element)
        });
      });
}

//establish eventlistener
//check to see if input matches teamname, if so display it
function createSearchFunction(){
  engine.addEventListener('submit', handleSubmit);
}

function handleSubmit(e){
    e.preventDefault();
    searchInput = document.querySelector("#name").value;
    console.log(searchInput);

    //check teams and display...need to change html elements here
    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((teams) => {

            //const fuse = new Fuse(teams, {keys: ['name', 'full_name']});
            //const results = fuse.search(searchInput);
            console.log(results);
          
            // if(element.name.toLowerCase() === searchInput.toLowerCase()){
            //   document.querySelector("#teamName").innerText = element.name;
            //   document.querySelector("#teamCity").innerText = element.city;
            //   document.querySelector("#teamConference").innerText = element.conference;
            //   document.querySelector("#teamDivision").innerText = element.division;
            //   document.querySelector("#teamImg").src = element.img;
      })
}

//append to side nav
function sideNav(teams){
  const li = document.createElement("li")
  li.innerText = teams.name
  list.appendChild(li)
}
