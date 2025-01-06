const searchSongs = async function () {
    // alert(document.getElementById("titleBarContent").querySelector("input").value);
    let result = await window.operator.searchSongs(document.getElementById("titleBarContent").querySelector("input").value);
    let resultText = JSON.stringify(result);
    // document.getElementById("mainContentsBox").textContent = resultText
    // document.getElementById("mainContentsBox-mainRecommendation")    
}