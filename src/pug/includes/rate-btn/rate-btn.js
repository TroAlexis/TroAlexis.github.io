const DOM = {
    star: '.rate-btn__star'
}

export default class RateBtn {
    constructor(btnElement, options) {
        this.element = btnElement;
        this.stars = btnElement.querySelectorAll(DOM.star)
        this.element.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.stars.forEach((star) => {
                star.classList.remove('active');
            });
            const clickedStar = evt.target.getAttribute('data-index');
            this.stars.forEach((star) => {
              if (star.getAttribute('data-index') <= clickedStar) {
                  star.classList.add('active');
              }
            })

        })
    }
}