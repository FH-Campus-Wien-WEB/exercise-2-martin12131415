window.onload = function () {
  const buildList = function (list) {
    return '<ul class="comma-joined-list">' + list.map(item => {
      return `<li>${item}</li>`
    }).join("") + "</ul>";

  }
  const buildTiledList = function (list) {
    return '<ul class="tiled-list">' + list.map(item => {
      return `<li>${item}</li>`
    }).join("") + "</ul>";
  }
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      for (const movie of movies) {
        /* Task 1.3. Add your code from exercise 1 here 
           and include a non-functional 'Edit' button
           to pass this test */
        const movieCard = `
        <article id="${movie.imdbID}" class="movie-container">
                <section id="movie-top">
                    <div class="movie-basic-info">
                        <header><h1>${movie.Title}</h1></header>
                        <ul class="movie-facts">
                            <li>${new Date(movie.Released).toLocaleDateString("de-AT")}</li>
                            <li>${(movie.Runtime / 60) | 0}h ${movie.Runtime % 60}m</li>
                        </ul>
                    </div>
                    <table class="movie-ratings">
                        <tr>
                            <td>IMDB Rating</td>
                            <td>Metascore</td>
                        </tr>
                        <tr>
                            <td>${movie.imdbRating}</td>
                            <td>${movie.Metascore}</td>
                        </tr>
                    </table>
                </section>

                <img src="${movie.Poster}" alt="${movie.Title}">

                <section class="movie-info">
                    <div class="section">${buildTiledList(movie.Genres)}</div>
                    <p>${movie.Plot}</p>
                    <div class="section"><p><strong>Director${(movie.Directors.length === 1 ? "" : "s")}:</strong></p>${buildList(movie.Directors)}</div>
                    <div class="section"><p><strong>Writer${(movie.Writers.length === 1 ? "" : "s")}:</strong></p> ${buildList(movie.Writers)}</div>
                    <div class="section"><p><strong>Actor${(movie.Actors.length === 1 ? "" : "s")}:</strong></p> ${buildList(movie.Actors)}</div>
                </section>
                <button onclick="window.location.href='edit.html?imdbID=${movie.imdbID}'">Edit</button>
            </div>
        </article>
    `;
        bodyElement.insertAdjacentHTML('beforeend', movieCard);
      }

    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
