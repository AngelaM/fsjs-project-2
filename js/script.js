/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Creates a search bar
*/
function search() {
   let nameToSearch = document.querySelector('#search').value.toUpperCase();
   console.log(nameToSearch);
   let filteredNames = [];
   for (let i=0; i<data.length; i++) {
      let concatName = (data[i].name.first + data[i].name.last).toUpperCase();
      if (concatName.includes(nameToSearch)) {
         filteredNames.push(data[i]);
      }
   }
   showButtons(filteredNames);
}

/*
Creates and inserts/appends the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   let start = (page * 9) - 9;
   let end = page * 9;
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = "";
   let html = "";
   if (list.length === 0) {
      html += `<span id="no-results">No results found</span>`;
   }
   for (let i=0; i<list.length; i++) {
      if (i>=start && i<end) {
         html += 
            `<li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>`
      }
   }
   studentList.innerHTML = html;
}

/*
Creates and inserts/appends the elements needed for the pagination buttons
*/
function showButtons(list) {
   showPage(list, 1);
   let numOfButtons = Math.ceil(list.length / 9);
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = "";
   let html = "";
   for (let i=1; i<=numOfButtons; i++) {
      html += `<li><button`;
      if (i===1) {html += ` class = "active"`};
      html += ` type="button">${i}</button></li>`;
   }
   linkList.innerHTML = html;
   linkList.addEventListener('click', (e) => {
      let chosen = e.target.innerHTML;
      if (chosen.length === 1) {
         document.querySelector('.active').className = "";
         e.target.className = "active";
         showPage(list, chosen);
      }
  });
}

document.querySelector('header').insertAdjacentHTML('beforeend',  
`<label for="search" class="student-search">
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`);
document.querySelector('.student-search button').addEventListener('click', search);
document.querySelector('#search').addEventListener('keyup', search);

showButtons(data);

