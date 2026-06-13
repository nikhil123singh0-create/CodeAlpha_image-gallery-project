// Select Elements

const cards = document.querySelectorAll(".card");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// Store Images

const images = Array.from(cards).map(card =>
card.querySelector("img"));

let currentIndex = 0;

/* =========================
   FILTER FUNCTIONALITY
========================= */

filterButtons.forEach(button => {

button.addEventListener("click", () => {

filterButtons.forEach(btn =>
btn.classList.remove("active"));

button.classList.add("active");

const filter = button.dataset.filter;

cards.forEach(card => {

if (
filter === "all" ||
card.classList.contains(filter)
) {

card.style.display = "block";

} else {

card.style.display = "none";

}

});

});

});

/* =========================
   OPEN LIGHTBOX
========================= */

cards.forEach((card, index) => {

card.addEventListener("click", () => {

currentIndex = index;

lightboxImg.src =
images[currentIndex].src;

lightbox.classList.add("active");

document.body.style.overflow =
"hidden";

});

});

/* =========================
   SHOW IMAGE
========================= */

function showImage(index) {

lightboxImg.src = images[index].src;

}

/* =========================
   NEXT IMAGE
========================= */

nextBtn.addEventListener("click", () => {

currentIndex++;

if (currentIndex >= images.length) {

currentIndex = 0;

}

showImage(currentIndex);

});

/* =========================
   PREVIOUS IMAGE
========================= */

prevBtn.addEventListener("click", () => {

currentIndex--;

if (currentIndex < 0) {

currentIndex = images.length - 1;

}

showImage(currentIndex);

});

/* =========================
   CLOSE LIGHTBOX
========================= */

function closeLightbox() {

lightbox.classList.remove("active");

document.body.style.overflow =
"auto";

}

closeBtn.addEventListener(
"click",
closeLightbox
);

/* =========================
   CLOSE WHEN CLICKING
   OUTSIDE IMAGE
========================= */

lightbox.addEventListener("click",
(e) => {

if (e.target === lightbox) {

closeLightbox();

}

});

/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener(
"keydown",
(e) => {

if (
!lightbox.classList.contains("active")
) return;

if (e.key === "ArrowRight") {

nextBtn.click();

}

if (e.key === "ArrowLeft") {

prevBtn.click();

}

if (e.key === "Escape") {

closeBtn.click();

}

}
);

/* =========================
   TOUCH SWIPE SUPPORT
========================= */

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener(
"touchstart",
(e) => {

touchStartX =
e.changedTouches[0].screenX;

}
);

lightbox.addEventListener(
"touchend",
(e) => {

touchEndX =
e.changedTouches[0].screenX;

handleSwipe();

}
);

function handleSwipe() {

if (touchEndX < touchStartX - 50) {

nextBtn.click();

}

if (touchEndX > touchStartX + 50) {

prevBtn.click();

}

}

/* =========================
   IMAGE LOADING EFFECT
========================= */

window.addEventListener("load", () => {

cards.forEach((card, index) => {

card.style.opacity = "0";
card.style.transform =
"translateY(30px)";

setTimeout(() => {

card.style.transition =
"0.5s ease";

card.style.opacity = "1";
card.style.transform =
"translateY(0px)";

}, index * 60);

});

});