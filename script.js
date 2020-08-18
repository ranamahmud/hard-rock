let searchInput = document.querySelector("input.form-control");
let url = 'https://api.lyrics.ovh/suggest/';

let button = document.querySelector(".search-btn");
let searchResult = document.querySelector(".search-result");
button.addEventListener('click', function () {
    let inputText = searchInput.value;
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

    });

    let lyricButton = document.querySelectorAll(".get-lyrics");
    let results = document.querySelectorAll(".single-result");

    for (let i = 0; i < data10.length; i++) {
        let button = lyricButton[i];
        button.addEventListener('click', function () {
            let artist = data10[i].artist.name;
            let title = data10[i].title;
            //  song.artist + '/' + song.title
            let songUrl = 'https://api.lyrics.ovh/v1/' + artist + '/' + title;
            fetch(songUrl)
                .then(response => response.json())
                .then(data => {

                    lyric = data['lyrics'];
                    if (lyric !== undefined) {
                        let lyricsHTML = document.createElement('p');
                        lyricsHTML.innerText = lyric;
                        lyricsHTML.className = "lyric text-white"
                        results[i].appendChild(lyricsHTML);
                    } else {
                        let lyricsHTML = document.createElement('p');
                        lyricsHTML.innerText = "Lyrics Not Found";
                        lyricsHTML.style = "color:red";
                        results[i].appendChild(lyricsHTML);
                    }


                })
        })

    }


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
                        <button class="get-lyrics btn btn-success">Get Lyrics</button>
                    </div>
                </div>`
    searchResult.insertAdjacentHTML('beforeend', result);
}

