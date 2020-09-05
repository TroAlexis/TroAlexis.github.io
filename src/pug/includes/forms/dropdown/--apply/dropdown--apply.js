import Dropdown from 'Includes/forms/dropdown/dropdown';

const DOM = {
  applyBtn: '.dropdown__apply',
  clearBtn: '.dropdown__clear',
};

export default class DropdownApplyTotal extends Dropdown {
  constructor(dropdownElement, forms) {
    super(dropdownElement);
    this.forms = forms;
    this.element.totalCounters = 0;
    this.element.addEventListener('click', (evt) => {
      // IF A BUTTON IS CLICKED (EITHER PLUS OR MINUS)
      if (evt.target.classList.contains('dropdown__plus') || evt.target.classList.contains('dropdown__minus')) {
        const button = evt.target;
        const label = button.parentElement.querySelector(this.domstrings.label);
        // CHANGE COUNTER
        this.changeCounter(button);
      // IF APPLY BUTTON CLICKED
      } else if (evt.target.classList.contains(DOM.applyBtn.replace('.', ''))) {
        evt.preventDefault();
        this.updateAll();
        this.closeSelectContent();
        // IF CLEAR BUTTON CLICKED
      } else if (evt.target.classList.contains(DOM.clearBtn.replace('.', ''))) {
        evt.preventDefault();
        this.resetAll();
      }
    });
  }

  resetAll() {
    this.element.totalCounters = 0;
    Object.keys(this.counters).forEach((key) => {
      this.counters[key] = 0;
    });
    this.element.querySelectorAll(this.domstrings.counter).forEach((counter) => {
      counter.textContent = '0';
      if (!counter.previousElementSibling.classList.contains('disabled')) {
        counter.previousElementSibling.classList.add('disabled');
      }
    });
    this.element.counters = this.counters;
    // eslint-disable-next-line no-underscore-dangle
    this.input.element.textContent = this.input.default;
  }

  updateAll() {
    // GET TOTAL OF ALL COUNTERS
    this.element.totalCounters = Object.values(this.counters).reduce((a, b) => a + b);
    // CHANGE INPUT ELEMENT TEXT
    this.input.element.textContent = `${this.element.totalCounters} ${Dropdown.getWordForm(this.element.totalCounters, this.forms)}`;
  }
}
