import Dropdown from "../dropdown";

const DOM = {
    applyBtn: '.dropdown__apply',
    clearBtn: '.dropdown__clear'
}

export default class DropdownApplyTotal extends Dropdown {
    constructor(dropdownElement, forms) {
        super(dropdownElement);
        this.forms = forms;
        this.element.totalCounters = 0;
        this.element.addEventListener('click', (evt) => {
            // IF A BUTTON IS CLICKED
            if (evt.target.tagName === 'BUTTON') {
                const button = evt.target;
                const label = button.parentElement.querySelector(this.domstrings.label);
                // CHANGE COUNTER
                this.changeCounter(button);
            }
            // IF APPLY BUTTON CLICKED
            else if (evt.target.classList.contains(DOM.applyBtn.replace('.', ''))) {
                evt.preventDefault();
                // GET TOTAL OF ALL COUNTERS
                this.element.totalCounters = Object.values(this.counters).reduce((a, b) => {
                  return a+b;
                });
                // CHANGE INPUT ELEMENT TEXT
                this.input.element.textContent = `${this.element.totalCounters} ${Dropdown.getWordForm(this.element.totalCounters, this.forms)}`
            }
            // IF CLEAR BUTTON CLICKED
            else if (evt.target.classList.contains(DOM.clearBtn.replace('.', ''))) {
                evt.preventDefault();
                this.resetAll();
            }
        })
    }
    resetAll() {
        this.element.totalCounters = 0;
        Object.keys(this.counters).forEach(key => {
            this.counters[key] = 0;
        })
        this.element.querySelectorAll(this.domstrings.counter).forEach((counter) => {
            counter.textContent = '0';
            if (!counter.previousElementSibling.classList.contains('disabled')) {
                counter.previousElementSibling.classList.add('disabled');
            }
        })
        this.element.counters = this.counters;
        this.input.element.textContent = this.input._default;
    }
};