var on = document.getElementById('off');

function yes() {
    var img = document.getElementById('image');
    img.src = 'pngwing.com (2).png';
    on.innerHTML = "On";
    on.style.color = "red"
}
function no() {
    document.getElementById('image').src = 'pngwing.com.png';
    on.innerHTML = "Off";
    on.style.color = "black"
}