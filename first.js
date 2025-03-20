const sections = document.querySelectorAll('.section');

const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

const revealSections = () => {
    sections.forEach(section => {
        if (isInViewport(section)) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', revealSections);

document.addEventListener('DOMContentLoaded', () => {
    revealSections(); // Run on page load to show sections already in viewport
});
// Make the translator widget draggable
var translator = document.getElementById("google_translate_element");
var isDragging = false;
var offsetX, offsetY;

translator.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - translator.offsetLeft;
    offsetY = e.clientY - translator.offsetTop;
    translator.style.cursor = "grabbing"; // Change cursor
});

document.addEventListener("mousemove", function (e) {
    if (isDragging) {
        translator.style.left = (e.clientX - offsetX) + "px";
        translator.style.top = (e.clientY - offsetY) + "px";
    }
});

document.addEventListener("mouseup", function () {
    isDragging = false;
    translator.style.cursor = "grab"; // Reset cursor
});
document.addEventListener("DOMContentLoaded", function () {
    let widget = document.getElementById("google_translate_element");

    // Make it expand when clicked
    widget.addEventListener("click", function () {
        widget.style.width = "90%";
        widget.style.right = "5%";
        widget.style.left = "5%";
    });
});
