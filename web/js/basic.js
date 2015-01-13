// Melting image section
const MELT = 'sect1';

function init() {
    document.getElementById('layer1').addEventListener('click', showLayer, false);
    document.getElementById('layer2').addEventListener('click', showLayer, false);
    document.getElementById('layer3').addEventListener('click', showLayer, false);
}

function mouseOver() {
    document.getElementById(MELT).className = "moveImg";
}

function mouseOut() {
    document.getElementById(MELT).className = "noClass";
}

function changeText() {
    var hdr_text = document.getElementById('txtHdr').value ;
    document.getElementById('title').innerHTML = hdr_text;
}

function changeMusic(urlMusic)
{
   document.getElementById("mySel").setAttribute("src", urlMusic); 
   document.getElementById("myMusic").load();
   document.getElementById("myMusic").play();
}

function showLayer(e) {
    var layer1 = document.getElementById('layer1');
    var layer2 = document.getElementById('layer2');
    var layer3 = document.getElementById('layer3');

    var youtube = document.getElementById('youtube');
    var cube = document.getElementById('cube');
    var ocean = document.getElementById('ocean');

    youtube.setAttribute("style","height: 0px");
    cube.setAttribute("style","height: 0px");
    ocean.setAttribute("style","height: 0px");

    if (e.target === layer1) {
        youtube.setAttribute("style","height: 400px");
    } else if (e.target === layer2) {
        cube.setAttribute("style","height: 400px");
    } else if (e.target === layer3) {
        ocean.setAttribute("style","height: 400px");
        if (ocean.getAttribute("src") === "") 
            ocean.setAttribute("src","adv/ocean.html");
   }
}

window.addEventListener("load", init, false);