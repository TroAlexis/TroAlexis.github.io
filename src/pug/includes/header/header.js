import '../../../js/dAdapt';

const DOM = {
    burger: '.burger',
    mobNav: '.header__mob-nav',
    backDrop: '.backdrop',

};

// INITIALISING HEADER BURGER
export default class Header {
    constructor(headerElement) {
        this.element = headerElement
        this.burger = headerElement.querySelector(DOM.burger);
        this.mobNav = headerElement.querySelector(DOM.mobNav);
        this.backDrop = document.querySelector(DOM.backDrop);
        this.burger.addEventListener('click', (evt) => {
            this.toggleMenu();
        })
        this.backDrop.addEventListener('click', (evt) => {
            this.closeMenu();
        })
    }
    toggleMenu() {
        this.burger.classList.toggle('open');
        this.mobNav.classList.toggle('open');
        this.backDrop.classList.toggle('active')
    }
    closeMenu() {
        this.burger.classList.remove('open');
        this.mobNav.classList.remove('open');
        this.backDrop.classList.remove('active');
    }
}