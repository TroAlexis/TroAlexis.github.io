const DOM = {
    dropdown: '.dropdown', // DEFAULT
    select: '.dropdown__select',
    content: '.dropdown__content',
}

export default class Dropdown {
    constructor(dropdownElement) {
        this.element = dropdownElement;
        this.select = dropdownElement.querySelector(DOM.select);
        this.content = dropdownElement.querySelector(DOM.content);
        this.select.addEventListener('click', () => this.toggleSelectContent());
    }
    get domstrings() {
        return DOM;
    }
    toggleSelectContent() {
        this.content.classList.toggle('open');
    }
    closeSelectContent() {
        this.content.classList.remove('open');
    }
}