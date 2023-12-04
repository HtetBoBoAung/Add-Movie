const addBtn = document.getElementById("add-btn");
const addModal = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
const cancelBtn = document.querySelector(".btn--passive")
const movieAddBtn = document.querySelector(".btn--success");
const deleteMovieModal = document.getElementById("delete-modal");
//
const movieTitle = document.getElementById("title");
const movieImage = document.getElementById("image-url");
const movieRating = document.getElementById("rating");
const entryText = document.getElementById("entry-text");
const movieList = document.getElementById("movie-list");

const storedMovies = JSON.parse(localStorage.getItem("movies"));
const movies = storedMovies ? storedMovies : [];

function toggleFunction() {
     addModal.classList.toggle("visible");
     backDrop.classList.toggle("visible");
}

function cancelFunction() {
     toggleFunction();
     cancelMovieModal();
}

function movieListFunction(id,title, image, rating) {
     const currentDate = new Date();
     const lastUpdateDate = currentDate.toLocaleDateString();
     const lastUpdateTime = currentDate.toLocaleTimeString();

     const addNewMovie = document.createElement("li");
     addNewMovie.className = "movie-element";
     addNewMovie.innerHTML = `
          
          <div class="movie-element__image">
          <div class="image-div">
          <img src=${image} alt=${title} class="movie-card-image">
          </div>
          <div class="movie-element__info">
               <li class="first-list">
               <h2 class="movie-title">${title}</h2>
               <p class="ratting-text"><span>${rating}</span>/10</p>
               </li>
               <li class="second-list">
               <p class="para">Last Update</p>
               <p class="para">Running Time</p>
               </li>
               <li class="third-list">
               <p class="time-para">${lastUpdateDate}</p>
               <p class="time-para">${lastUpdateTime}</p>
               </li>
          </div>
     </div>`
     
     const movieList = document.getElementById("movie-list");
     movieList.append(addNewMovie);
     addNewMovie.addEventListener("click", deleteFunction.bind(null, id));
}

function cancelMovieModal() {
     deleteMovieModal.classList.remove("visible");
     backDrop.classList.remove("visible");
     movieTitle.value = "";
     movieImage.value = "";
     movieRating.value = "";
}

function deleteFunction(movieId) {
     deleteMovieModal.classList.add("visible");
     backDrop.classList.add("visible");
 
     const cancelDeleteBtn = deleteMovieModal.querySelector('.btn--passive');
     const confirmDeleteBtn = deleteMovieModal.querySelector('.btn--danger');

     confirmDeleteBtn.removeEventListener("click", deleteMovie);
 
     const newConfirmDeleteBtn = confirmDeleteBtn.cloneNode(true);
     confirmDeleteBtn.replaceWith(newConfirmDeleteBtn);
 
     newConfirmDeleteBtn.addEventListener("click", function () {
         deleteMovie(movieId);
         movieCardDelete(movieId);
     });
 
     cancelDeleteBtn.addEventListener("click", cancelMovieModal);
 }

 function deleteMovie(movieId) {
     deleteMovieModal.classList.remove("visible");
     backDrop.classList.remove("visible");
 }

function movieCardDelete(movieId) {
      let movieIndex = 0;
     for(item of movies){
          if(item.id == movieId){
               break;
          }
          movieIndex++;
     }
     movies.splice(movieIndex, 1);
     const movieList = document.getElementById("movie-list");
     movieList.children[movieIndex].remove();
     // deleteMovieModal.classList.remove("visible");
     deleteFunction(movieId);
     deleteMovie(movieId);
}

function entryTextFunction() {
     if(movies.length == 0){
          entryText.style.display = "block";
     }else {
          entryText.style.display = "none";
     }
}

function addMovieHandler() {
     let title = movieTitle.value;
     let image = movieImage.value;
     let rating = movieRating.value;

     if(title == "" ||
        image == "" ||
        rating == "" ||
        rating < 1 || 
        rating > 10) {
          alert("Enter The Valid Rating");
          return;
     }
     const movie = {
          id: Math.random(),
          title: title,
          image: image,
          rating: rating
     }
     movies.push(movie);
     localStorage.setItem("movies", JSON.stringify(movies));
     deleteMovieModal.classList.remove("visible");
     addModal.classList.toggle("visible");
     backDrop.classList.toggle("visible");
     movieListFunction(movie.id,movie.title, movie.image, movie.rating);
     entryTextFunction();
     movieTitle.value = "";
     movieImage.value = "";
     movieRating.value = "";
}

addBtn.addEventListener("click",toggleFunction);
cancelBtn.addEventListener("click", cancelFunction);
movieAddBtn.addEventListener("click", addMovieHandler);


document.addEventListener("DOMContentLoaded", function () {
     showMovieList();
 });
 
 function showMovieList() {
     if (storedMovies && storedMovies.length > 0) {
         storedMovies.forEach(function (movie) {
             movieListFunction(movie.id, movie.title, movie.image, movie.rating);
         });
     }
 
     entryTextFunction();
 }
 