const news = document.getElementById('newsData');
async function getMovieNews(){
    const response = await fetch(`http://localhost:5000/imdbnews`);
    const jsonResponse = await response.json();
    console.log(jsonResponse);

    jsonResponse.results.map((result) =>
    news.innerHTML += `
    <div id="newsdataContainer>
    <div id="newsimgContainer>
      <img src=${result.larger_img} id="newsImg">
    </div>

    <div id="newsContent">
      <h2 id="newsTitle">${result.title}</h2>
      <span id="newsWriter">${result.writer}</span>
      <span id="newsDate">${result.date}</span>
      <span id="magazine">${result.magazine}</span>
      <p id="newsBody">${result.body}</p>
      <span id="readMore" onclick="location.href='${result.link}'";> Read More</span>
    </div>
  
     
    </div>
    `
    )
    
  }
  getMovieNews();

