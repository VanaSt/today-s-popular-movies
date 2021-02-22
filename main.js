function fetchData() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=9198fa6d9a9713bc6b03ee9582525917&language=en-US&page=1")
        .then(response => {
            console.log(response);
            if(!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
    })
    .then(data => {
        const html = data.results
        .map(movie => {
            return `
            <div class = "movie">
                <p data-id="${movie.id}">${movie.title}</p>
            </div>
            `;
        })
        .join("");

        document
        .querySelector('#movie')
        .insertAdjacentHTML("afterbegin", html);

        
        $(".movie p ").on("click",function() {

            $(".movie").removeClass("active");

            var _this=$(this);
            var _posterid=_this.data("id");

            _this.closest(".movie").addClass("active");
            
            var filtered = data.results.filter(i => i.id == _posterid)[0];

            $("#description p").html(filtered.overview);
            $("#poster img").attr("src", "https://image.tmdb.org/t/p/w500/" + filtered.poster_path).attr("alt", filtered.title);
            
        });
  
    })

    .catch(error => {
        console.log(error);
    });

    
}

fetchData();


