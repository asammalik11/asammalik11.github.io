/**
 * Created by Saim on 3/23/2015.
 */

$(document).ready(function() {
    document.getElementById('titleText').innerHTML = "Home Page";
});

function homeText() {
    activeStyle('homeBtn');
    defaultStyle('aboutBtn');
    document.getElementById('titleText').innerHTML = "Home Page";
}

function aboutText() {
    activeStyle('aboutBtn');
    defaultStyle('homeBtn');
    document.getElementById('titleText').innerHTML = "About Me (Coming Soon)";
}

function activeStyle(name) {
//			document.getElementById(name).style.color = "red";
//			document.getElementById(name).style.backgroundColor = "black";
//			document.getElementById(name).style.border = "1px solid red";
    document.getElementById(name).className = "customSelected";
}

function defaultStyle(name) {
//			document.getElementById(name).style.color = "white";
//			document.getElementById(name).style.backgroundColor = "#404040";
//			document.getElementById(name).style.border = "1px solid #404040";
    document.getElementById(name).className = "customNotSelected";
}
