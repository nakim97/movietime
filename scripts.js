const api_key = 'ee04596001b19a1964b017c76bc5d185'
let page = 1

const popularMovieContainer = document.getElementById('popularMoviesContainer');
const topRatedMovieContainer = document.getElementById('topRatedContainer');
const upcomingMovieContainer = document.getElementById('upcomingContainer');

const loadBtn = document.getElementById('loadBtn');
const searchloadBtn = document.getElementById('searchloadBtn');
const loadContainer = document.getElementById("loadContainer");

const searchBar = document.getElementById("searchbar");


// Fetch Popular Movies 
async function popularMovies(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${page}`);
    const jsonResponse = await response.json();
    
    jsonResponse.results.map((result) =>
    popularMovieContainer.innerHTML += `
    <div id="currentplayingMovies" onclick=movieDetails(${result.id})>
        <img src="https://image.tmdb.org/t/p/w400${result.poster_path}" style="margin-bottom: 50px"  id="${result.id}" class="modalImg"/>
    </div>
    `,
    ); 
    
    }
popularMovies();

// Fetch Top Rated Movies
async function topMovies(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&page=${page}`);
    const jsonResponse = await response.json();
  
    jsonResponse.results.map((result) =>
    topRatedMovieContainer.innerHTML += `
    <div id="currentplayingMovies" onclick="movieDetails(${result.id})">
        <img src="https://image.tmdb.org/t/p/w400${result.poster_path}" style="margin-bottom: 50px"  id="${result.id}"/>
    </div>
    `,
    
    ); 
    
    }
topMovies();

// Fetch Upcoming Movies 
async function upcomingMovies(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&page=${page}`);
    const jsonResponse = await response.json();
    
    jsonResponse.results.map((result) =>
    upcomingMovieContainer.innerHTML += `
    <div id="currentplayingMovies" onclick=movieDetails(${result.id})>
        <img src="https://image.tmdb.org/t/p/w400${result.poster_path}" style="margin-bottom: 50px"  id="${result.id}"/>
    </div>
    `,
    ); 
    
    }
upcomingMovies();


// Fetch Movie Details and implement Modal Box 
async function movieDetails(id){
  
    const responses = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
    const json= await responses.json();

    const trailer = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}`);
    const jsonResponse = await trailer.json()

    const cast = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`);
    const castResponse = await cast.json()
   
    const nowPlayingPopup = document.createElement("div");
    nowPlayingPopup.innerHTML =`
                    <div id="modal">
                    <div id="modal-content">
                    <button id="close-btn" onclick=closeModal() > X </button>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${jsonResponse.results[0].key} "></iframe>
                    <div class="modal-container">
                        <h1 id="modalTitle">${json.title}</h1>
                        <span id="modalRating">???${json.vote_average}</span>
                    </div>
                    <div class="modalDetails">
                        <span id="modalGenre">${json.genres[0].name} , ${json.genres[1].name}</span>
                        <span id="modalDate">${json.release_date}</span>
                        <span id="modalCast">${castResponse.cast[0].name} , ${castResponse.cast[1].name} , ${castResponse.cast[3].name} </span>

                    </div>
                    <p id="modalPlot">${json.overview}</p>
                    </div>
                
                </div>
                `
                document.body.append(nowPlayingPopup);     
}

// function to fetch search results of searched movies 
async function searchMovies(){
    const query = document.getElementById("searchbar").value;
    const searchContainer = document.getElementById("searchResults");
    const searchDiv = document.getElementById("searchContainer");
    const closeSearch = document.getElementById("closeSearch");
    const responses = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}`);
    const json= await responses.json();

    const searchDisplay = document.getElementById("movieContainer");
 
    searchDisplay.style.display="none";
 
    query.innerHTML ="";
 
    searchDiv.style.display = "block";

    json.results.map((result) =>
    searchContainer.innerHTML += `
    <div id="searchContainerDiv">
        <div id="searchData" onclick=movieDetails(${result.id})>
        <img src="https://image.tmdb.org/t/p/w400${result.poster_path}" style="margin-bottom: 50px"  id="${result.id}" class="modalImg"/>
     </div>
    </div>
    
`,
); 
// function to close modal box 
closeSearch.addEventListener("click",function(){
    searchDisplay.style.display ="block";
    searchDiv.style.display = "none";
})
}

// Implement search bar 
document.getElementById("searchbar").addEventListener("keyup",function(e){
    if(e.key =="Enter"){
        e.preventDefault();
        document.getElementById("searchResults").innerHTML = "";
        searchMovies();
    }
})

// Load More Movies Function 
loadBtn.addEventListener("click", function(){
    async function loadMore(){
        page ++;
        popularMovies();
        topMovies();
        upcomingMovies();
    }
    loadMore();
})

// load More Movies in Search Results 
searchloadBtn.addEventListener("click", function(){
    async function loadMoreSearch(){
        page++;
        searchMovies();
    }
    loadMoreSearch();
})

// Close Modal Box 
function closeModal(){
    const modal = document.querySelectorAll("#modal");
        for(var i=0; i < modal.length; i++){
            modal[i].style.display = "none";
        }
}

// Close Modal Box when clicking anywhere outside of modal box 
window.addEventListener('click', function(){
    const modal = document.querySelectorAll("#modal");
    for(var i=0; i < modal.length; i++){
        modal[i].style.display = "none";
    }
})