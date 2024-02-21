$("#next").click(function () {
    nextSlide();
  });
  
  $("#prev").click(function () {
    prevSlide();
  });
  
  $("#dot1").click(function () {
    showSlide(1);
  });
  
  $("#dot2").click(function () {
    showSlide(2);
  });
  
  $("#dot3").click(function () {
    showSlide(3);
  });
  
  $("#dot4").click(function () {
    showSlide(4);
  });
  
  $("#dot5").click(function () {
    showSlide(5);
  });
  
  const SLIDES = $(".slide");
  const DOTS = $(".dot")
  const CAPTIONS = $(".caption")
  
  function nextSlide() {
    let nextNum = SLIDES.index($(".slide:not(.hidden)")) + 1 + 1;
    if (nextNum > SLIDES.length) {
      nextNum = 1;
    }
    showSlide(nextNum);
  }
  
  function prevSlide() {
    let prevNum = SLIDES.index($(".slide:not(.hidden)")) - 1 + 1;
    if (prevNum <= 0) {
      prevNum = SLIDES.length;
    }
    showSlide(prevNum);
  }
  
  function showSlide(num) {
    SLIDES.addClass("hidden");
  
    let index = num - 1;
    let currentSlide = SLIDES.eq(index);
    let currentDot = DOTS.eq(index);
  
    currentSlide.removeClass("hidden");
  
    DOTS.removeClass("active");
    currentDot.addClass("active");
    let capindex = num - 1;
    let currentCaption = CAPTIONS.eq(capindex);
    CAPTIONS.addClass("hidden");
    currentCaption.removeClass("hidden");
  }
  
/* Autoplay */ 

let autoPlayInterval;

function playPause() {
  const carousel = $('.carousel');
  carousel.toggleClass('auto-play');

  if (carousel.hasClass('auto-play')) {
    autoPlayInterval = setInterval(() => {
      nextSlide();
    }, 3000); // Change the duration as needed
  } else {
    clearInterval(autoPlayInterval);
  }
}

function stopAutoPlay() {
  const carousel = $('.carousel');
  carousel.removeClass('auto-play');
  clearInterval(autoPlayInterval);
}

function goToSlide(slideNumber) {
  const currentSlide = $('.slide:not(.hidden)');
  const targetSlide = $(`#slide${slideNumber}`);
  
  if (currentSlide.length && targetSlide.length) {
    currentSlide.addClass('hidden');
    targetSlide.removeClass('hidden');
  }
}

function dotClickHandler(dotNumber) {
  stopAutoPlay();
  goToSlide(dotNumber);
}

function arrowClickHandler(direction) {
  stopAutoPlay();
  playPause(); // Start or stop auto-play after arrow click
}

// Auto-play when the page is refreshed
function startAutoPlayOnRefresh() {
  playPause();
}

// Event listeners for play/pause and stop buttons
$('#next').click(() => arrowClickHandler('next'));
$('#prev').click(() => arrowClickHandler('prev'));

// Event listeners for dot buttons
$('.dot').each((index, dot) => {
  $(dot).click(() => {
    dotClickHandler(index + 1);
    playPause(); // Start or stop auto-play after dot click
  });
});

// Start auto-play when the page is refreshed
$(window).on('load', startAutoPlayOnRefresh);