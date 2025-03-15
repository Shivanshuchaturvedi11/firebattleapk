let images = [];
let currentIndex = 0;

async function fetchImages() {
    const url = "https://script.google.com/macros/s/AKfycbxm1G5rJ9P7GpplXbCjSW7r7Q7H5y4tmlJ2wNUcIJrMU3ckFuXnKRPz7A6zPnEkop9Q5Q/exec";
    try {
        const response = await fetch(url, { method: "POST" });
        const data = await response.json();

        images = data;
        if (images.length > 0) {
            showImage(0);
            createDots();
            setInterval(nextImage, 3000);
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

function showImage(index) {
    let imgElement = document.getElementById("currentImage");
    imgElement.src = images[index].imageUrl;
    imgElement.onclick = () => window.location.href = images[index].link;
    updateDots(index);
}

function createDots() {
    let dotsContainer = document.getElementById("dotsContainer");
    dotsContainer.innerHTML = "";
    images.forEach((_, i) => {
        let dot = document.createElement("span");
        dot.classList.add("dot");
        dot.onclick = () => { 
            currentIndex = i; 
            showImage(i); 
        };
        dotsContainer.appendChild(dot);
    });
    updateDots(0);
}

function updateDots(activeIndex) {
    let dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === activeIndex);
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

fetchImages();
