let slideshows = document.querySelectorAll('.slideshow')
for (let i = 0; i < slideshows.length; i++) {
    let slideshow = slideshows[i];
    slideshow.slider = {
        'controls' : {'prev' : slideshow.querySelector('.slideshow__prev'),
                      'next' : slideshow.querySelector('.slideshow__next'),
                      'dots' : slideshow.querySelector('.slideshow__dots').childNodes},
        'slides' : slideshow.querySelectorAll('.slideshow__slide'),
        'currentSlide' : 0,
        'changeSlide' : function (direction, index) {
            this.slides[this.currentSlide].classList.remove('active')
            this.controls.dots[this.currentSlide].classList.remove('active')
            if (direction === 'show') {
                this.currentSlide++
                if (this.currentSlide >= this.slides.length) {
                    this.currentSlide = 0;
                }
            }
            else {
                if (direction === 'prev') {
                    this.currentSlide -= 1;
                    if (this.currentSlide < 0) {
                        this.currentSlide = this.slides.length - 1;
                    }
                }
                else if (index >= 0) {
                    this.currentSlide = index;
                }
                else {
                    this.currentSlide += 1;
                    if (this.currentSlide >= this.slides.length) {
                        this.currentSlide = 0;
                    }
                }
            }
            this.slides[this.currentSlide].classList.add('active')
            this.controls.dots[this.currentSlide].classList.add('active')
            if (direction === 'show') {
                const _this = this;
                setTimeout(function () { _this.changeSlide('show') }, 2000)
            }
        }
    }
    let slider = slideshow.slider;
    slider.slides[slideshow.slider.currentSlide].classList.add('active')
    slider.controls.dots[slideshow.slider.currentSlide].classList.add('active')
    slider.controls.prev.addEventListener('click', function () {
        slider.changeSlide('prev');
    })
    slider.controls.next.addEventListener('click', function () {
        slider.changeSlide();
    })
    slider.controls.dots.forEach((dot, index) => dot.addEventListener('click', function () {
        slider.changeSlide('', index)
    }))
    setTimeout(function () { slider.changeSlide('show')}, 10000)

}

// function changeSlide(slider, direction, index) {
//     slider.slides[slider.currentSlide].classList.remove('active')
//     slider.controls.dots[slider.currentSlide].classList.remove('active')
//     if (direction === 'show') {
//         slider.currentSlide++
//         if (slider.currentSlide >= slider.slides.length) {
//             slider.currentSlide = 0;
//         }
//     }
//     else {
//         if (direction === 'prev') {
//             slider.currentSlide -= 1;
//             if (slider.currentSlide < 1) {
//                 slider.currentSlide = slider.slides.length - 1;
//             }
//         }
//         else if (index >= 0) {
//             slider.currentSlide = index;
//         }
//         else {
//             slider.currentSlide += 1;
//             if (slider.currentSlide >= slider.slides.length) {
//                 slider.currentSlide = 0;
//             }
//         }
//     }
//     slider.slides[slider.currentSlide].classList.add('active')
//     slider.controls.dots[slider.currentSlide].classList.add('active')
// }

