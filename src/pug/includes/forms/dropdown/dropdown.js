const DOM = {
    dropdown: '.dropdown', // DEFAULT
    select: '.dropdown__select',
    content: '.dropdown__content',
    input: '.dropdown__select span',
    label: '.dropdown__label',
    counter: '.dropdown__count',
    plusBtn: '.dropdown__plus',
    minusBtn: '.dropdown__minus',
}

export default class Dropdown {
    constructor(dropdownElement) {
        // PARENT ELEMENT (DROPDOWN)
        this.element = dropdownElement;
        // SELECT ELEMENT
        this.select = dropdownElement.querySelector(DOM.select);
        // CONTENT ELEMENT
        this.content = dropdownElement.querySelector(DOM.content);
        // INPUT ELEMENT AND DEFAULT TEXT
        this.input = {
            element: dropdownElement.querySelector(this.domstrings.input),
            _default: dropdownElement.querySelector(this.domstrings.input).textContent
        };
        // INIT COUNTERS FOR EVERY LABEL
        this.counters = {}
        // GET ALL LABELS
        Array.from(this.content.querySelectorAll(this.domstrings.label))
            // GET LABEL NAMES
            .map((label) => {return label.textContent;})
            // CREATE COUNTER FOR EACH LABEL NAME
            .forEach((labelName) => this.counters[labelName] = 0)
        // SET COUNTERS TO THE DOM ELEMENT
        this.element.counters = this.counters;
        // ADD EVENT LISTENER FOR SELECT
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
    changeCounter(button) {
        // GET COUNTER
        const counter = button.parentElement.querySelector(DOM.counter);
        // GET LABEL
        const label = button.parentElement.querySelector(DOM.label);
        // SET VARIABLE TO CHANGE INPUT AFTERWARDS OR NOT
        let changeInput = false;
        // IF BUTTON IS PLUS
        if (button.className === DOM.plusBtn.replace('.', '')) {
                    // MAKE MINUS BUTTON ACTIVE IF NOT ACTIVE ALREADY
            if (counter.previousElementSibling.classList.contains('disabled')) {
                counter.previousElementSibling.classList.remove('disabled');
            }
            //    INCREASE COUNTER OF CLICKED LABEL
            this.counters[label.textContent] += 1;
            this.element.counters = this.counters;
            // CHANGE INPUT ACCORDING TO COUNTER AND BUTTON LABEL
            changeInput = true;
        // IF BUTTON IS MINUS
        } else {
            // IF COUNTER IS NOT NEGATIVE
            if (this.counters[label.textContent] > 0) {
                // DECREASE COUNTER
                this.counters[label.textContent] -= 1;
                this.element.counters = this.counters;
                // CHANGE INPUT ACCORDING TO COUNTER AND BUTTON LABEL
                changeInput = true;
            }
            // DISABLE BUTTON IF COUNTER IS ZERO
            if (this.counters[label.textContent] === 0) {
              button.classList.add('disabled');
            }
        }
        // CHANGE COUNTER VIEW
        counter.textContent = this.counters[label.textContent].toString();
        return changeInput;
    }
    static getWordForm(num, forms) {
        const [form1, form2, form3] = forms;
        if (num % 10 === 1 && num !== 11) {
            return form1;
        }
        else if ((num % 10 === 2 || num % 10 === 3 || num % 10 === 4) && (num < 10 || num >20)) {
            return form2;
        }
        else {
            return form3;
        }
    }
}