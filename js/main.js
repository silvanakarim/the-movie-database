let moviesCards = document.getElementById('movies-cards');
let menuLinks = document.querySelectorAll('.menu a')
let searchInput1 = document.getElementById('search-input1')
let moviesList = [];
let movieNames = [];
let moviesUrl = '';
let searchItem = '';

//Fetch data 
async function getMovies(url = `https://api.themoviedb.org/3/movie/now_playing?api_key=446058e1c18af08e9233590e09e734cf&language=en-US&page=1`) {
    let result = await fetch(url);
    let finalResult = await result.json();
    moviesList = finalResult.results;
    displayMovies(moviesList)
}
getMovies();

//choose type of movies from menu
for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', function (e) {
        if (e.target.innerText == 'Now playing') {
            moviesUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=446058e1c18af08e9233590e09e734cf&language=en-US&page=1`
        }
        else if (e.target.innerText == 'Popular') {
            moviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=446058e1c18af08e9233590e09e734cf&language=en-US&page=1`
        }
        else if (e.target.innerText == 'Top Rated') {
            moviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=446058e1c18af08e9233590e09e734cf&language=en-US&page=1`
        }
        else if (e.target.innerText == 'Trending') {
            moviesUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
        }
        else if (e.target.innerText == 'Upcoming') {
            moviesUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=446058e1c18af08e9233590e09e734cf&language=en-US&page=1`
        }

        getMovies(moviesUrl)
    })
}

//display movies 
function displayMovies(moviesList) {
    let cartona = '';
    let movieName = '';
    let movieDate = '';
    let baseUrl = 'https://image.tmdb.org/t/p/w500';
    for (let i = 0; i < moviesList.length; i++) {
        if (moviesList[i].original_title != undefined) {
            movieName = moviesList[i].original_title
        }
        else {
            movieName = moviesList[i].original_name
        }
        if (moviesList[i].release_date != undefined) {
            movieDate = moviesList[i].release_date
        }
        else {
            movieDate = moviesList[i].first_air_date
        }
        cartona +=
            `<div class="col-md-4">
            <div class="movie">
                <img src="${baseUrl + moviesList[i].poster_path}" class="w-100">
                <div class="layer text-center">
                    <div class="content">
                        <h2 class="font-32 font-500">${movieName}</h2>
                        <p class="px-1 font-800">${moviesList[i].overview}</p>
                        <p class="font-800">rate: ${moviesList[i].vote_average}</p>
                        <p class="font-800">${movieDate}</p>
                    </div>
                </div>
            </div>
        </div>`
    }

    moviesCards.innerHTML = cartona

}


//control side bar
let sideBarWidth = $('.col-md-10').innerWidth()
$('.side-bar').css('left', -sideBarWidth)
$('.toggle-icon').click(function () {
    if ($('.side-bar').css('left') == '0px') {
        $('.toggle-icon').html('<i class="fa-solid fa-bars"></i>')
        $('.side-bar').animate({ 'left': -sideBarWidth }, 1000)
    }
    else {
        $('.menu a').hide(5)
        $('.toggle-icon').html('<i class="fa-solid fa-xmark"></i>')
        $('.side-bar').animate({ 'left': '0px' }, 1000, () => {
            let links = $('.menu a')
            for (let i = 0; i < links.length; i++) {
                $('.menu a').eq(i).slideDown(600, () => {
                    $('.menu a').eq(i + 1).slideDown(600)
                })
            }
        })
    }

})


//To get value of the input and search
searchInput1.addEventListener('keyup', function () {
    searchItem = document.querySelector('#search-input1').value;
    search(moviesList, searchItem)
})

//get movie by word 
function search(list, term) {
    let name = '';
    let searchItems = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i].original_title != undefined && list[i].original_title.toLowerCase().includes(term.toLowerCase()) == true) {
            searchItems.push(list[i])
        }
        else if(list[i].original_title == undefined && list[i].original_name.toLowerCase().includes(term.toLowerCase()) == true) {
            searchItems.push(list[i])
        }
    }
    displayMovies(searchItems)
}


