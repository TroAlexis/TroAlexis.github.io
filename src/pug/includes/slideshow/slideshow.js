const DOM = {
  controls: {
    prev: '.slideshow__prev',
    next: '.slideshow__next',
    dots: '.slideshow__dots',
  },
  slide: '.slideshow__slide',
};

export default class Slideshow {
  constructor(slideshowEl) {
    this.element = slideshowEl;
    this.controls = {
      prev: slideshowEl.querySelector(DOM.controls.prev),
      next: slideshowEl.querySelector(DOM.controls.next),
      dots: slideshowEl.querySelector(DOM.controls.dots).childNodes,
    };
    this.slides = slideshowEl.querySelectorAll(DOM.slide);
    this.currentSlide = 0;
    this.slides[this.currentSlide].classList.add('active');
    this.controls.dots[this.currentSlide].classList.add('active');
    this.element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(noDot(DOM.controls.prev))) {
        this.changeSlide('prev');
      } else if (evt.target.classList.contains(noDot(DOM.controls.next))) {
        this.changeSlide();
      } else if (evt.target.parentElement.classList.contains(noDot(DOM.controls.dots))) {
        this.changeSlide('', evt.target.getAttribute('data-index'));
      }
    });
    setTimeout(() => this.changeSlide('show'), 18000);
  }

  changeSlide(direction, index) {
    this.slides[this.currentSlide].classList.remove('active');
    this.controls.dots[this.currentSlide].classList.remove('active');
    if (direction === 'show') {
      this.currentSlide += 1;
      if (this.currentSlide >= this.slides.length) {
        this.currentSlide = 0;
      }
      setTimeout(() => this.changeSlide('show'), 18000);
    } else if (direction === 'prev') {
      this.currentSlide -= 1;
      if (this.currentSlide < 0) {
        this.currentSlide = this.slides.length - 1;
      }
    } else if (index >= 0) {
      this.currentSlide = index;
    } else {
      this.currentSlide += 1;
      if (this.currentSlide >= this.slides.length) {
        this.currentSlide = 0;
      }
    }
    this.slides[this.currentSlide].classList.add('active');
    this.controls.dots[this.currentSlide].classList.add('active');
  }
}

function noDot(string) {
  return string.replace('.', '');
}
