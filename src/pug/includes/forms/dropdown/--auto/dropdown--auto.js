import Dropdown from 'Includes/forms/dropdown/dropdown';

export default class DropdownAuto extends Dropdown {
  constructor(dropdownElement) {
    super(dropdownElement);
    // INPUT ELEMENT
    // ADD EVENT LISTENER FOR CONTENT ELEMENTS
    this.content.addEventListener('click', (evt) => {
      // IF A BUTTON IS CLICKED
      if (evt.target.tagName === 'BUTTON') {
        const button = evt.target;
        const label = button.parentElement.querySelector(Dropdown.domstrings.label);
        // CHANGE COUNTER
        if (this.changeCounter(button)) {
          this.changeInput(label.textContent);
        }
      }
    });
  }

  changeInput(labelText) {
    // GET COUNTER FOR THE LABEL
    const count = this.counters[labelText];
    if (labelText === 'спальни') {
      const exp = /\d+\sспал[а-яё]+/;
      this.changeInputWordForm(count, ['спальня', 'спальни', 'спален'], exp);
    } else if (labelText === 'кровати') {
      const exp = /\d+\sкроват[а-яё]+/;
      this.changeInputWordForm(count, ['кровать', 'кровати', 'кроватей'], exp);
    } else {
      const exp = /\d+\sванн[а-яё]{2}\sкомнат[а-яё]?/;
      this.changeInputWordForm(count, ['ванная комната', 'ванные комнаты', 'ванных комнат'], exp);
    }
  }

  changeInputWordForm(count, forms, exp) {
    // SEE WHETHER TEXT IS DEFAULT
    const defaultText = () => this.input.element.textContent === this.input.default;
    // GET WORD-FORMS
    const [form1, form2, form3] = forms;
    // TEXT OF THE LABEL
    const inputText = this.input.element.textContent;
    // IF COUNT ENDS WITH 1
    if (count % 10 === 1 && count !== 11) {
      // IF TEXT IS DEFAULT, CHANGE TO FORM 1
      if (defaultText()) {
        this.input.element.textContent = `${count} ${form1}`;
        // IF NOT - ADD COMMA AND FORM 1
      } else if (inputText.match(exp) === null) {
        this.input.element.textContent += `, ${count} ${form1}`;
        // IF TEXT IS THE SAME AS LABEL, CHANGE COUNTER
      } else {
        this.input.element.textContent = this.input.element.textContent.replace(exp, `${count} ${form1}`);
      }
      // IF COUNT ENDS WITH 2,3,4 AND LESS THAN 10 OR 20, APPLY FORM 2
    } else if ((count % 10 === 2 || count % 10 === 3 || count % 10 === 4)
        && (count < 10 || count > 20)) {
      // IF NOT, ADD COMMA AND FORM 2
      if (inputText.match(exp) === null) {
        this.input.element.textContent += `, ${count} ${form2}`;
        // IF TEXT IS THE SAME AS LABEL, CHANGE COUNTER
      } else {
        this.input.element.textContent = this.input.element.textContent.replace(exp, `${count} ${form2}`);
      }
      // IF COUNT STARTS WITH 0
    } else if (count === 0) {
      // IF LABEL IS NOT EMPTY
      if (this.input.element.textContent.length > `, ${count} ${form1}`.length) {
        // IF THERE IS A COMMA, REPLACE REMAINDER WITH NOTHING
        if (inputText.match(new RegExp((`${exp.toString().slice(1, -1)},`)))) {
          const newExp = new RegExp((`${exp.toString().slice(1, -1)},`));
          this.input.element.textContent = this.input.element.textContent.replace(newExp, '');
          // IF THERE IS NO COMMA, REPLACE REMAINDER WITH NOTHING
        } else {
          const newExp = new RegExp((`,\\s${exp.toString().slice(1, -1)}`));
          this.input.element.textContent = this.input.element.textContent.replace(newExp, '');
        }
        // IF LABEL IS EMPTY, SET DEFAULT
      } else {
        this.input.element.textContent = this.input.default;
      }
      // FOR ALL OTHER CASES, USE FORM 3
    } else if (inputText.match(exp) === null) {
      this.input.element.textContent += `, ${count} ${form3}`;
    } else {
      this.input.element.textContent = this.input.element.textContent.replace(exp, `${count} ${form3}`);
    }
  }
}
