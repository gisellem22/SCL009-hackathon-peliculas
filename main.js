const urlTMDB = "https://api.themoviedb.org/3/discover/movie?api_key=84e6f5776910ff2a185d7cde218db4b7";
const urlOMDB = "http://www.omdbapi.com/?";
const omdbKey = "&apikey=5ce9d42d";
const showYear = document.getElementById("search_byYear");
const showTitle = document.getElementById("search_byTitle");
const containerYear = document.getElementById("searchYear");
const containerTitle = document.getElementById("searchTitle");
const btnSearchYear = document.getElementById("btnsearch_year");
const btnSearchTitle = document.getElementById("btnsearch_title");
const containerResult = document.getElementById("result");
let cardHTML = "";
let yearValue;
let idiomValue;
let titleValue;
let yearValueT;
showYear.addEventListener("click", () => {
  containerResult.innerHTML = "";
  document.getElementById("year").value = "";
  document.getElementById("idiom_year").value = "";
  containerYear.style.display = (containerYear.style.display == "none") ? "block" : "none";
  containerTitle.style.display = "none";
});
showTitle.addEventListener("click", () => {
  containerResult.innerHTML = "";
  document.getElementById("titles").value = "";
  document.getElementById("year_title").value = "";
  containerTitle.style.display = (containerTitle.style.display == "none") ? "block" : "none";
  containerYear.style.display = "none";
})
btnSearchYear.addEventListener("click", () => {
  yearValue = document.getElementById("year").value;
  idiomValue = "&language=" + document.getElementById("idiom_year").value;
  callApis(idiomValue, yearValue);
})
btnSearchTitle.addEventListener("click", () => {
  cardHTML = "";
  titleValue = "t=" + document.getElementById("titles").value;
  console.log(titleValue);
  yearValueT = document.getElementById("year_title").value;
  console.log(yearValueT);
  createCardOfTitle(titleValue, yearValueT)

})

// const byDefault = () =>{
//     fetch("https://api.themoviedb.org/3/discover/movie?api_key=84e6f5776910ff2a185d7cde218db4b7&with_genres=27")
//     .then(function(response) {
//         return response.json();
//     })

//     .then(function(showSomeData) {
//         const data = showSomeData.results;
//         console.log(data);
//         showElements(data,year);   
//    })
// };
// byDefault()
const callApis = (idiom, year) => {
  let url = urlTMDB + "&primary_release_year=" + year + "&with_genres=27" + idiom;
  console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })

    .then(function (dataJson) {
      const data = dataJson.results;
      console.log(data);
      showElements(data, year);
    })
};

const showElements = (data, year) => {

  cardHTML = "";
  data.forEach(element => {
    let title = "t=" + element.title;
    console.log(title)
    fetch(urlOMDB + title + omdbKey + "&y=" + year)

      .then(function (response) {
        return response.json();
      })

      .then(function (oneTitle) {
        console.log(oneTitle);
        createCard(oneTitle)
      })
  })
};

const createCard = (myTitle) => {
  cardHTML +=
    `<div class="card s12 m12 l3 xl3" style="max-width: 540px;"data-toggle="modal" data-target="#${myTitle.imdbID}" >
    <div class="row no-gutters">
      <div class="col-md-6">
        <img src="${myTitle.Poster}" class="card-img" alt="..."onerror="this.onerror=null;this.src='img/descarga.png';"/>
      </div>
      <div class="col-md-6">
        <div class="card-body">
          <h5 class="card-title">  ${myTitle.Title}</h5>
          <br>
          <p class="card-text"> <small class="text-muted">Director: </small> ${myTitle.Director}</p>
          <p class="card-text"><small class="text-muted"> Runtime: </small> ${myTitle.Runtime}</p>
          <p class="card-text"><small class="text-muted">Released: </small>${myTitle.Released}</p>

        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="${myTitle.imdbID}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
        <img class='modal-img' src="${myTitle.Poster}"/>
        <h5> ${myTitle.Title}</h5>
        <p><b>Sinopsis</b>: ${myTitle.Plot}</p>
        <p><b>Actores</b>: ${myTitle.Actors}</p>
        <p><b>Subgénero</b>: ${myTitle.Genre}</p>
        <p><b>País</b>: ${myTitle.Country}</p>
        <p><b>Premios</b>: ${myTitle.Awards}</p>  
        <p><b>Puntuación</b>: ${myTitle.Ratings[0].Value}</p> 
        <p><b>Website</b>:<a href= "${myTitle.Website}">${myTitle.Website}</a> </p>  
        <button type="button" class="btn btn-dark" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>`
  containerResult.innerHTML = cardHTML;
}
const createCardOfTitle = (title, year) => {
  fetch(urlOMDB + title + omdbKey + "&y=" + year)

    .then(function (response) {
      return response.json();
    })

    .then(function (myTitle) {
      console.log(myTitle);
      createCard(myTitle)
    })
  cardHTML +=
    `<div class="card s12 m12 l3 xl3" style="max-width: 540px;"data-toggle="modal" data-target="#${myTitle.imdbID}" >
               <div class="row no-gutters">
                 <div class="col-md-6">
                   <img src="${myTitle.Poster}" class="card-img" alt="..."onerror="this.onerror=null;this.src='img/descarga.png';"/>
                 </div>
                 <div class="col-md-6">
                   <div class="card-body">
                     <h5 class="card-title">  ${myTitle.Title}</h5>
                     <br>
                     <p class="card-text"> <small class="text-muted">Director: </small> ${myTitle.Director}</p>
                     <p class="card-text"><small class="text-muted"> Runtime: </small> ${myTitle.Runtime}</p>
                     <p class="card-text"><small class="text-muted">Released: </small>${myTitle.Released}</p>

                   </div>
                 </div>
               </div>
             </div>

             <div class="modal fade" id="${myTitle.imdbID}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
               <div class="modal-dialog modal-dialog-centered" role="document">
                 <div class="modal-content">
                   <div class="modal-body">
                   <img class='modal-img' src="${myTitle.Poster}"/>
                   <h5> ${myTitle.Title}</h5>
                   <p><b>Sinopsis</b>: ${myTitle.Plot}</p>
                   <p><b>Actores</b>: ${myTitle.Actors}</p>
                   <p><b>Subgénero</b>: ${myTitle.Genre}</p>
                   <p><b>País</b>: ${myTitle.Country}</p>
                   <p><b>Premios</b>: ${myTitle.Awards}</p>  
                   <p><b>Puntuación</b>: ${myTitle.Ratings[0].Value}</p> 
                   <p><b>Website</b>:<a href= "${myTitle.Website}">${myTitle.Website}</a> </p>   
                   <button type="button" class="btn btn-dark" data-dismiss="modal">Cerrar</button>
                   </div>
                 </div>
               </div>
             </div>
    
`
  containerResult.innerHTML = cardHTML;
}
