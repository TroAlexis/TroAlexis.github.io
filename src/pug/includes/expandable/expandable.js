const DOM = {
  element: '.expandable',
  button: '.expandable__button',
  content: '.expandable__content',
};

export default class Expandable {
  constructor(expElement) {
    this.element = expElement;
    this.button = this.element.querySelector(DOM.button);
    this.content = this.element.querySelector(DOM.content);
    this.button.addEventListener('click', () => {
      this.expandContent();
    });
  }

  expandContent() {
    this.element.classList.toggle('active');
    if (this.element.classList.contains('active')) {
      this.content.style.maxHeight = `${this.content.scrollHeight}px`;
    } else {
      this.content.style.maxHeight = null;
    }
  }

  static get domstrings() {
    return DOM;
  }
}
