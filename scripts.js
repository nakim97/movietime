const api_url = 'https://api.themoviedb.org/3'
const api_key = '831004296f374b1a0723bb4e809b453a'
let page = 1

const popularMovieContainer = document.getElementById('popularMoviesContainer');
const topRatedMovieContainer = document.getElementById('topRatedContainer');
const upcomingMovieContainer = document.getElementById('upcomingContainer');

const loadBtn = document.getElementById('loadBtn');
const loadContainer = document.getElementById("loadContainer")


// Fetch Popular Movies 
async function popularMovies(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${page}`);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    
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
    console.log(jsonResponse);

    jsonResponse.results.map((result) =>
    topRatedMovieContainer.innerHTML += `
    <div id="currentplayingMovies" onclick=movieDetails(${result.id})>
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
    console.log(jsonResponse);
    
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
    console.log(json);

    const trailer = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}`);
    const jsonResponse = await trailer.json()
    console.log(jsonResponse);

    const cast = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`);
    const castResponse = await cast.json()
    console.log(castResponse);
   
    nowPlayingPopup = document.createElement("div");
    nowPlayingPopup.innerHTML =`
                    <div id="modal">
                    <div id="modal-content">
                    <button id="close-btn" onclick=closeModal() > X </button>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${jsonResponse.results[0].key} "></iframe>
                    <div class="modal-container">
                        <h1 id="modalTitle">${json.title}</h1>
                        <span id="modalRating">⭐${json.vote_average}</span>
                    </div>
                    <div class="modalDetails">
                        <span id="modalGenre">${json.genres[0].name} , ${json.genres[1].name}</span>
                        <span id="modalDate">${json.release_date}</span>
                        <span id="modalCast">${castResponse.cast[0].name} , ${castResponse.cast[1].name} , ${castResponse.cast[3].name} </span>

                    </div>
                    <p id="modalPlot">${json.overview}</p>
                    <button id="modalShowtime"  onclick="location.href='showtimes.html'"> SHOWTIMES </button>
                    </div>
                
                </div>
                `
                document.body.append(nowPlayingPopup );
                
                
}

// Load More Popular Movies
loadBtn.addEventListener("click", function(){
    async function loadMore(){
        page ++;
        popularMovies();
        topMovies();
        upcomingMovies();
    }
    loadMore();
})

function closeModal(){
    document.getElementById('modal').style.display='none';
}



