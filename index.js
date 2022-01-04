let list = document.querySelector("#list")

//fect all teams
  function fetchTeams() {
      fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((teams) => {
        teams.forEach(element => {
          sideNav(element)
        });
      });
}

//append to side nav
function sideNav(teams){
const li = document.createElement("li")
li.innerText = teams.name
list.appendChild(li)
}

fetchTeams()