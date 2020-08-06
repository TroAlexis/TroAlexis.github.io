import Dropdown from '../drop';

const DOM = {
    input: '.dropdown__select span',
    label: '.dropdown__label',
    counter: '.dropdown__count',
    plusBtn: '.dropdown__plus',
    minusBtn: '.dropdown__minus'
};

export default class DropdownAuto extends Dropdown {
    constructor(dropdownElement) {
        super(dropdownElement);
        // INPUT ELEMENT
        this.input = {
            element: dropdownElement.querySelector(DOM.input),
            _default: dropdownElement.querySelector(DOM.input).textContent
        };
        // INIT COUNTERS FOR EVERY LABEL
        this.counters = {}
        // GET ALL LABELS
        Array.from(this.content.querySelectorAll(DOM.label))
            // GET LABEL NAMES
            .map((label) => {return label.textContent;})
            // CREATE COUNTER FOR EACH LABEL NAME
            .forEach((labelName) => this.counters[labelName] = 0)
        // ADD EVENT LISTENER FOR CONTENT ELEMENTS
        this.content.addEventListener('click', (evt) => {
            // IF A BUTTON IS CLICKED
            if (evt.target.tagName === 'BUTTON') {
                const button = evt.target;
                // CHANGE COUNTER
                this.changeCounter(button);
                // this.changeInput(labelText);
            }
        })
    }
    get domstrings() {
        return {...super.domstrings, ...DOM};
    }
    changeCounter(button) {
        // GET COUNTER
        const counter = button.parentElement.querySelector(DOM.counter);
        // GET LABEL
        const label = button.parentElement.querySelector(DOM.label);
        // IF BUTTON IS PLUS
        if (button.className === DOM.plusBtn.replace('.', '')) {
                    // MAKE MINUS BUTTON ACTIVE IF NOT ACTIVE ALREADY
            if (counter.previousElementSibling.classList.contains('disabled')) {
                counter.previousElementSibling.classList.remove('disabled');
            }
            //    INCREASE COUNTER OF CLICKED LABEL
            this.counters[label.textContent] += 1;
            // CHANGE INPUT ACCORDING TO COUNTER AND BUTTON LABEL
            this.changeInput(label.textContent);
        // IF BUTTON IS MINUS
        } else {
            // IF COUNTER IS NOT NEGATIVE
            if (this.counters[label.textContent] > 0) {
                this.counters[label.textContent] -= 1;
                // CHANGE INPUT ACCORDING TO COUNTER AND BUTTON LABEL
                this.changeInput(label.textContent);
            }
            // DISABLE BUTTON IF COUNTER IS ZERO
            if (this.counters[label.textContent] === 0) {
              button.classList.add('disabled');
            }
        }
        // CHANGE COUNTER VIEW
        counter.textContent = this.counters[label.textContent].toString();
    }
    changeInput(labelText) {
        // GET COUNTER FOR THE LABEL
        const count = this.counters[labelText];
        if (labelText === 'спальни') {
            const exp = /\d+\sспал[а-яё]+/;
            this.changeInputText(count, ['спальня', 'спальни', 'спален'], exp);
        }
        else if (labelText === 'кровати') {
            const exp = /\d+\sкроват[а-яё]+/;
            this.changeInputText(count, ['кровать', 'кровати', 'кроватей'], exp);
        }
        else {
            const exp = /\d+\sванн[а-яё]{2}\sкомнат[а-яё]?/;
            this.changeInputText(count, ['ванная комната', 'ванные комнаты', 'ванных комнат'], exp);
        }
    }
    changeInputText(count, forms, exp) {
        // SEE WHETHER TEXT IS DEFAULT
        const defaultText = () => {
            return this.input.element.textContent === this.input._default;
        }
        // GET WORD-FORMS
        const [form1, form2, form3] = forms;
        // TEXT OF THE LABEL
        const inputText = this.input.element.textContent;
        // IF COUNT ENDS WITH 1
        if (count % 10 === 1 && count !== 11) {
            // IF TEXT IS DEFAULT, CHANGE TO FORM 1
            if (defaultText()) {
                this.input.element.textContent = `${count} ${form1}`;
            }
            else {
                // IF NOT - ADD COMMA AND FORM 1
                if (inputText.match(exp) === null) {
                    this.input.element.textContent += `, ${count} ${form1}`;
                }
                // IF TEXT IS THE SAME AS LABEL, CHANGE COUNTER
                else {
                    this.input.element.textContent = this.input.element.textContent.replace(exp, `${count} ${form1}`);
                }
            }
        }
        // IF COUNT ENDS WITH 2,3,4 AND LESS THAN 10 OR 20, APPLY FORM 2
        else if ((count % 10 === 2 || count % 10 === 3 || count % 10 === 4) && (count < 10 || count >20)) {
            // IF NOT, ADD COMMA AND FORM 2
            if (inputText.match(exp) === null) {
                this.input.element.textContent += `, ${count} ${form2}`;
            }
            // IF TEXT IS THE SAME AS LABEL, CHANGE COUNTER
            else {
            this.input.element.textContent = this.input.element.textContent.replace(exp, `${count} ${form2}`);
            }
        }
        // IF COUNT STARTS WITH 0
        else if (count === 0) {
            // IF LABEL IS NOT EMPTY
            if (this.input.element.textContent.length > `, ${count} ${form1}`.length) {
                // IF THERE IS A COMMA, REPLACE REMAINDER WITH NOTHING
                if (inputText.match(new RegExp((exp.toString().slice(1, -1) + ',')))) {
                    let nu_exp = new RegExp((exp.toString().slice(1, -1) + ','));
                    this.input.element.textContent = this.input.element.textContent.replace(nu_exp, '');
                }
                // IF THERE IS NO COMMA, REPLACE REMAINDER WITH NOTHING
                else {
                    let nu_exp = new RegExp((',\\s'+exp.toString().slice(1, -1)))
                    this.input.element.textContent = this.input.element.textContent.replace(nu_exp, '');
                }
            }
            // IF LABEL IS EMPTY, SET DEFAULT
            else {
                this.input.element.textContent = this.input._default;
            }
        }
        // FOR ALL OTHER CASES, USE FORM 3
        else {
            if (inputText.match(exp) === null) {
                this.input.element.textContent += `, ${count} ${form3}`;
            }
            else {
                this.input.element.textContent = this.input.element.textContent.replace(exp, `${count} ${form3}`);
            }
        }
    }
}