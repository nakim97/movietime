const api_url = 'https://api.themoviedb.org/3'
const api_key = '831004296f374b1a0723bb4e809b453a'
const page = 1

const nowPlaying = document.getElementById('homeMoviesContainer');


async function getMovies(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&page=${page}`);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    
    jsonResponse.results.map((result) =>
    nowPlaying.innerHTML += `
    <div id="currentplayingMovies" onclick=movieDetails(${result.id})>
        <img src="https://image.tmdb.org/t/p/w400${result.poster_path}" style="margin-bottom: 50px"  id="${result.id}" class="modalImg"/>
    </div>
    `,
    ); 
    
    }
getMovies();

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

function closeModal(){
    document.getElementById('modal').style.display='none';
}


window.onclick = function(event) {
    if (event.target == document.getElementById('modal')){
      document.getElementById('modal').style.display = "none";
    }
  }


