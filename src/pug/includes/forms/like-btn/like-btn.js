const DOM = {
    likeBtn: '.like-btn',
    count: '.like-btn__count'
}

export default class LikeBtn {
    //inf ----Btn element and options whether to set listeners or not---
    constructor(btnElement, options = {
        listeners: true
    }) {
        // Button element
        this.element = btnElement
        this.elements = {
            // Count element
            count: btnElement.querySelector(DOM.count)
        }
        // Set state object to track if active and contain count number
        this.state = {
            active: btnElement.classList.contains('active'),
            count: parseInt(this.elements.count.textContent, 10)
        }
        // Init listeners if stated in opts
        if (options.listeners) {
            this.element.addEventListener('click', (evt) => {
                evt.preventDefault();
                if (evt.target.closest(DOM.likeBtn)) {
                    // if click in the button
                    // change counter
                    this.changeCount(this.state.active)
                    // toggle active class on element
                    this.state.active = this.element.classList.toggle('active');
                }
            })
        }
    }
    // Changes counter both in code and UI
    changeCount(isActive, number = 1) {
        // If button is active already
        if (isActive) {
            // decrement count
            this.state.count -= number;
            // take active class away
        } else {
            // increment count
            this.state.count += number;
            // add active class
        }
        this.elements.count.textContent = this.state.count;
    }
}