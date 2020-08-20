import Formatter from 'formatter.js-pebble';
import Calendar from "./pug/includes/forms/calendar/calendar";

// Enabling masked inputs.
const maskedInputs = document.querySelectorAll('.text-field--masked');
maskedInputs.forEach((input) => {
  const masked = new Formatter(input, {
      pattern: '{{99}}.{{99}}.{{9999}}',
      persistent: false
  })
});

const dropdownsApply = document.querySelectorAll('.dropdown--apply');
dropdownsApply.forEach((dropdownElement) => {
  const dropdown = new DropdownApplyTotal(dropdownElement, ['гость', 'гостя', 'гостей'])
});

const calendars = document.querySelectorAll('.input-calendar');
calendars.forEach((calendarElement) => {
    const calendar = new Calendar(calendarElement);
});


import './assets/scss/form-elements.scss'
import DropdownApplyTotal from "./pug/includes/forms/dropdown/--apply/dropdown--apply";

if (module.hot) {
    module.hot.accept();
}
