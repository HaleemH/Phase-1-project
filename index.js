document.addEventListener("DOMContentLoaded", init);

let list = document.querySelector("#list");
let engine = document.querySelector(".form");
let commentsButton = document.querySelector(".commentForm");
let searchInput;
let like = document.querySelector("#like")

const options = {
  keys: [
	"name",
	"full_name",
  "city"
  ]
};

// const fName = document.querySelector("#teamName"); //.innerText = element.name;
// const fCity = document.querySelector("#teamCity"); //.innerText = element.city;
// const fConf = document.querySelector("#teamConference"); //.innerText = element.conference;
// const fDiv = document.querySelector("#teamDivision"); //.innerText = element.division;
// const fImg = document.querySelector("#teamImg");

function init() {
  fetchTeams();
  createEventListeners();
}

//fetch all teams
function fetchTeams() {
  fetch("http://localhost:3000/data")
    .then((res) => res.json())
    .then((teams) => {
      teams.forEach((element) => {
        sideNav(element);
      });
    });
}

//establish eventlistener
//check to see if input matches teamname, if so display it
function createEventListeners() {
  engine.addEventListener("submit", handleSubmit);
  commentsButton.addEventListener("submit", handleSubmitComment);
}


function handleSubmit(e) {
  e.preventDefault();
  searchInput = document.querySelector("#name").value;

  //check teams and display...need to change html elements here
  fetch("http://localhost:3000/data")
    .then((res) => res.json())
    .then((teams) => {
        const fuse = new Fuse(teams, options)

        console.log(fuse.search(searchInput)[0].item.img);
        document.querySelector("#teamName").innerText = `Team Name: ${(fuse.search(searchInput)[0].item.name)}`;
        document.querySelector("#teamCity").innerText = `Team City: ${(fuse.search(searchInput)[0].item.city)}`;
        document.querySelector("#teamConference").innerText = `Conference: ${(fuse.search(searchInput)[0].item.conference)}`;
        document.querySelector("#teamDivision").innerText = `Division: ${(fuse.search(searchInput)[0].item.division)}`;
        document.querySelector("#teamImg").src = fuse.search(searchInput)[0].item.img;
        //Like feature
        document.querySelector("#like").innerText = `Vote For ${(fuse.search(searchInput)[0].item.name)}: ${(fuse.search(searchInput)[0].item.likes)}`;
        like.addEventListener("click", (e) => {
          document.querySelector("#like").innerText = `Keep Voting: ${(fuse.search(searchInput)[0].item.likes) += 1}`;
        })
      //THIS IS THE OLD METHOD BEFORE FUZZY SEARCH//
      // teams.forEach((element) => {
        // if (element.name.toUpperCase() === searchInput.toUpperCase()) {
        //   document.querySelector("#teamName").innerText = `Team Name: ${element.name}`;
        //   document.querySelector("#teamCity").innerText = `Team City: ${element.city}`;
        //   document.querySelector("#teamConference").innerText = `Conference: ${element.conference}`;
        //   document.querySelector("#teamDivision").innerText = `Divison: ${element.division}`;
        //   document.querySelector("#teamImg").src = element.img;
        // }
      // });
    });
}

function handleSubmitComment(e){
  e.preventDefault();
  const li = document.createElement("li");
  li.innerText = document.querySelector("#comment").value;
  document.querySelector("#commentsList").appendChild(li);
}


//append to side nav
function sideNav(teams) {
  const li = document.createElement("li");
  li.innerText = teams.name;
  list.appendChild(li);

  //click event on list items
  const clicked = li.addEventListener("click", (e) => {
    const click = e.target.innerHTML;
    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((teams) => {
        teams.forEach((element) => {
          if (element.name === click) {
            document.querySelector("#teamName").innerText = `Team Name: ${element.name}`;
            document.querySelector("#teamCity").innerText = `Team City: ${element.city}`;
            document.querySelector("#teamConference").innerText = `Conference: ${element.conference}`;
            document.querySelector("#teamDivision").innerText = `Divison: ${element.division}`;
            document.querySelector("#teamImg").src = element.img;
            //Like feature
            document.querySelector("#like").innerText = `Click to increase Likes: ${(fuse.search(searchInput)[0].item.likes)}`;
            like.addEventListener("click", (e) => {
              document.querySelector("#like").innerText = `Click to increase Likes: ${(fuse.search(searchInput)[0].item.likes) += 1}`;
        })
          }
        });
      });
  });
}
