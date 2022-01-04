document.addEventListener('DOMContentLoaded', init);

function init(){
  let list = document.querySelector("#list")
  let engine = document.querySelector(".form")
  engine.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('it submitted')
    console.log(document.querySelector("#teamName").value)
  })
  fetchTeams()
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

//append to side nav
function sideNav(teams){
const li = document.createElement("li")
li.innerText = teams.name
list.appendChild(li)
}
