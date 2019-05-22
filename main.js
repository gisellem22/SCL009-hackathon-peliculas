const urlTMDB = "https://api.themoviedb.org/3/discover/movie?api_key=84e6f5776910ff2a185d7cde218db4b7";
const urlOMDB = "http://www.omdbapi.com/?";
const omdbKey = "&apikey=5ce9d42d";
const btnSearch = document.getElementById("btnsearch");
let containerResult = document.getElementById("result");
let cardHTML;
btnSearch.addEventListener("click", ()=>{
    let yearValue = document.getElementById("year").value;
    let idiomValue = "&language=" + document.getElementById("idiom").value;
    console.log(yearValue);
    //let pages = "&page=" + 1;

    fetch(urlTMDB+idiomValue+"&primary_release_year="+ yearValue+"&with_genres=27")
    .then(function(response) {
        return response.json();
    })
   
    .then(function(dataJson) {
        const data = dataJson.results;
        console.log(data);
        showElements(data,yearValue);


          
   });
})
       
const reneratePages =(num) =>{
    let pages = "&page=" + num;
fetch(urlTMDB+idiomValue+yearValue+"&with_genres=27"+pages)
.then(function(response) {
    return response.json();
})

.then(function(dataJson) {
    const data = dataJson.results;
    console.log(data);
    showElements(data);
    
})
};

const showElements = (data, year) => {
            
            let title;
                cardHTML = "";
            for (let i = 0; i < data.length; i++){
                title = "t="+data[i].title;
                fetch(urlOMDB+title+omdbKey+"&y="+year)

                .then(function(response) {
                    return response.json();
                })
               
                .then(function(myTitle) {
                    console.log(myTitle);
               cardHTML +=
               `<div class="card mb-3" style="max-width: 540px;">
               <div class="row no-gutters">
                 <div class="col-md-4">
                   <img src="${myTitle.Poster}" class="card-img" alt="..."onerror="this.onerror=null;this.src='img/descarga.png';"/>>
                 </div>
                 <div class="col-md-8">
                   <div class="card-body">
                     <h5 class="card-title">${myTitle.Title}</h5>
                     <p class="card-text"> Director: ${myTitle.Director}</p>
                     <p class="card-text"><small class="text-muted">${myTitle.Released}</small></p>
                     <p class="card-text"> Actors: ${myTitle.Actors}</p>
                   </div>
                 </div>
               </div>
             </div>` 
             containerResult.innerHTML = cardHTML;             
   
        })
            }
        };

// fetch("http://www.omdbapi.com/?s=harry%20potter&apikey=5ce9d42d")

//     .then(function(response) {
//         return response.json();
//         console.log(response)
//     })
   
//     .then(function(data) {
//         const arr = data.Search;
//         console.log(arr);


//    });