
const searchSongs = async function () {
    // alert(document.getElementById("titleBarContent").querySelector("input").value);
    let contents = await window.operator.searchSongs(document.getElementById("titleBarContent").querySelector("input").value);
    if (contents.code == -460) {
        alert('网络拥挤，请稍后再试')
        return
    }

    let name = document.getElementById("titleBarContent").querySelector("input").value
    let resultText = JSON.stringify(contents);
    console.log(contents);

    // document.getElementById("mainContentsBox").textContent = resultText
    // document.getElementById("mainContentsBox-mainRecommendation")    
    
    // let songsListBox = document.createElement('div');
    // songsListBox.id = "songs-list-box";
    // songsListBox.style.display = "flex";
    let songsListBox = document.getElementById("songs-list-box");
    let songsList = document.getElementsByClassName('songs-list')[0];
    let songsListOl = songsList.querySelector('ol');
    songsListOl.innerHTML = ''
    document.getElementById('mainPage').style.display = "none";
    songsListBox.style.display = "flex";
    // let text = ''
    for (var i = 0; i < contents.result.songs.length; i++) {
        let artists = ''
        // text += `title:${contents.result.songs[i].name}\n`
        // text += `   artist:${contents.result.songs[i].ar[0].name}`
        for (var j = 0; j < contents.result.songs[i].ar.length; j++) {
            // text += `,${contents.result.songs[i].ar[j].name}`
            artists += contents.result.songs[i].ar[j].name;
        }
        // text += '\n'
        let time = new Date(contents.result.songs[i].dt);
        // <div> is in <li>
        let songItemLi = document.createElement('li');
        let songItemDiv = document.createElement('div');
        songItemDiv.className = "songs-list-item";
        songItemDiv.innerHTML = `
            <a class="songs-list-item-title">${contents.result.songs[i].name}</a>
            <a class="songs-list-item-artists">${artists}</a>
            <a class="songs-list-item-album">${contents.result.songs[i].al.name}</a>
            <a class="songs-list-item-time">${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}</a>
        `
        songItemLi.appendChild(songItemDiv);
        let songItemA = songItemDiv.querySelectorAll('a');
        songItemA[0].href = "https://music.163.com/song/?id=" + contents.result.songs[i].privilege.id;// 歌曲id拼接的详情页链接
        songItemA[2].href = "https://music.163.com/album?id=" + contents.result.songs[i].al.id;// 专辑id拼接的详情页链接
        songItemA[0].style.textDecoration = songItemA[2].style.textDecoration = "none";
        songsListOl.appendChild(songItemLi);
    }
}