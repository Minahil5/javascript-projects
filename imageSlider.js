const nextE1 = document.querySelector(".next");
const prevE1 = document.querySelector(".prev");

const imageContainerE1 = document.querySelector(".image-container");
const imgsE1 = document.querySelectorAll("img");


let currentImg = 1;

let timeout;
nextE1.addEventListener("click", () => {

    currentImg++;
    clearTimeout(timeout);
    updateImg();
});

updateImg();

prevE1.addEventListener("click", () => {
    currentImg--;
    clearTimeout(timeout);
    updateImg();
    // if (currentImg < 1) {}
});
function updateImg() {
    if (currentImg > imgsE1.length) {
        currentImg = 1;
    }
    else if (currentImg < 1) {
        currentImg = imgsE1.length;
    }
imageContainerE1.style.transform = `translateX(-${(currentImg - 1) * 500}px)`;

 timeout=setTimeout(() => {
    currentImg++;
    updateE1();
}, 3000);
}