const urlTMDB = "https://api.themoviedb.org/3/discover/movie?api_key=84e6f5776910ff2a185d7cde218db4b7";
const urlOMDB = "http://www.omdbapi.com/?";
const omdbKey = "&apikey=5ce9d42d";
const btnSearch = document.getElementById("btnsearch");
const containerResult = document.getElementById("result");
let cardHTML;



btnSearch.addEventListener("click", ()=>{
    let yearValue = document.getElementById("year").value;
    //let titleValue = "t="+document.getElementById("titles").value;
    //console.log(titleValue);
    let idiomValue = "&language=" + document.getElementById("idiom").value;
    console.log(yearValue);
    //let pages = "&page=" + 1;
    callApis(idiomValue,yearValue);
})

const callApis = (idiom, year) =>{
    fetch(urlTMDB+idiom+"&primary_release_year="+year+"&with_genres=27")
    .then(function(response) {
        return response.json();
    })
   
    .then(function(dataJson) {
        const data = dataJson.results;
        console.log(data);
        showElements(data,year);


          
   });
}

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
                   <p>Sinopsis: ${myTitle.Plot}</p>
                   <p>Actores: ${myTitle.Actors}</p>
                   <p>Subgénero: ${myTitle.Genre}</p>
                   <p>País: ${myTitle.Country}</p>
                   <p>Premios: ${myTitle.Awards}</p>  
                   <p>Puntuación: ${myTitle.Ratings[0].Value}</p> 
                   <p>Website:<a href= "${myTitle.Website}">${myTitle.Website}</a> </p>  
                   <button type="button" class="btn btn-dark" data-dismiss="modal">Cerrar</button>
                   </div>
                 </div>
               </div>
             </div>

             
             ` 
             containerResult.innerHTML = cardHTML;             
   
        })
            }
        };

        // const showByTitle = (title,year) =>{
        //         fetch(urlOMDB+title+omdbKey+"&y="+year)

        //         .then(function(response) {
        //             return response.json();
        //         })
               
        //         .then(function(myTitle) {
        //             console.log(myTitle);
        //        cardHTML +=
        //        `<div class="card s12 m12 l3 xl3" style="max-width: 540px;">
        //        <div class="row no-gutters">
        //          <div class="col-md-6">
        //            <img src="${myTitle.Poster}" class="card-img" alt="..."onerror="this.onerror=null;this.src='img/descarga.png';"/>
        //          </div>
        //          <div class="col-md-6">
        //            <div class="card-body">
        //              <h5 class="card-title">  ${myTitle.Title}</h5>
        //              <br>
        //              <p class="card-text"> <small class="text-muted">Director: </small> ${myTitle.Director}</p>
        //              <p class="card-text"><small class="text-muted"> Runtime: </small> ${myTitle.Runtime}</p>
        //              <p class="card-text"><small class="text-muted">Released: </small>${myTitle.Released}</p>
        //            </div>
        //          </div>
        //        </div>
        //      </div>` 
        //      containerResult.innerHTML = cardHTML;             
   
        // })
        // };

// fetch("http://www.omdbapi.com/?s=harry%20potter&apikey=5ce9d42d")

//     .then(function(response) {
//         return response.json();
//         console.log(response)
//     })
   
//     .then(function(data) {
//         const arr = data.Search;
//         console.log(arr);


//    });