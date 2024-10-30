const apiKey = '.........';
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

// Function to fetch data from the API
function fetchData() {
    // Use fetch to get data from the TMDb API
    fetch(url)
        .then(response => {
            // Check if the response is not OK (e.g., 404 or 500 errors)
            if (!response.ok) {
                throw new Error("ERROR"); // Throw an error to handle in catch block
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            // Map through the movie data to create HTML elements for each movie and insert them into the left split
            const movieHTML = data.results.map(movie => {
                    return `
                    <div class="movie" data-id="${movie.id}">
                        <p>${movie.title}</p>
                    </div>
                    `;
                }
            ).join(""); // Join all movie HTML strings into one string

            // Insert the movie elements into the #movie container in the HTML
            document.querySelector('#movie').insertAdjacentHTML("afterbegin", movieHTML);

            // Add click event listeners to each movie element created in the HTML
            const movieElements = document.querySelectorAll('.movie');
            movieElements.forEach(movie => {
                // Add a click event listener to each movie element
                movie.addEventListener('click', function () {
                    // Remove 'active' class from all movies to deselect them
                    movieElements.forEach(m => m.classList.remove('active'));
                    // Add 'active' class to the clicked movie to highlight it
                    this.classList.add('active');

                    // Get the movie ID of the selected movie
                    const movieId = this.getAttribute('data-id');
                    // Find the selected movie details by matching the ID
                    const selectedMovie = data.results.find(movie => movie.id == movieId);

                    // Update details in the right split area with the selected movie's information
                    document.querySelector("#title h2").textContent = selectedMovie.title;
                    document.querySelector("#description p").textContent = selectedMovie.overview;
                    document.querySelector("#release").textContent = "Release Day: " + selectedMovie.release_date;
                    document.querySelector("#votes").textContent = "Votes: " + selectedMovie.vote_average;
                    // Set the poster image source and alt text
                    document.querySelector("#poster img").src = "https://image.tmdb.org/t/p/w500/" + selectedMovie.poster_path;
                    document.querySelector("#poster img").alt = selectedMovie.title;
                });
            });
        })
        .catch(error => {
            // Log any errors that occur during the fetch or processing
            console.error("Error fetching data:", error);
        });
}

// Fetch movie data when the page loads
fetchData();
