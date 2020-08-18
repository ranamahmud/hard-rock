let searchInput = document.querySelector("input.form-control");

let button = document.querySelector(".search-btn");
let searchResult = document.querySelector(".search-result");
button.addEventListener('click', function () {
    let inputText = searchInput.value;
    let url = 'https://api.lyrics.ovh/suggest/';
    let searchUrl = url + inputText;
    searchResult.innerHTML = "";
    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            showData(data);
        })
})

function showData(data) {
    let data10 = data.data.splice(0, 10);
    data10.map(song => {

        showSearch(song);
    })

}

function showSearch(song) {
    let title = song.title;
    let artist = song.artist.name;
    let album = song.album.title;
    let result = `<div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${title}</h3>
                        <p class="author lead">Album: ${album} by <span>${artist}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>`
    searchResult.insertAdjacentHTML('beforeend', result);
}
