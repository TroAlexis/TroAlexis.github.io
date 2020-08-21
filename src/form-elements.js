import Formatter from 'formatter.js-pebble';
import Calendar from "./pug/includes/forms/calendar/calendar";
import DropdownApplyTotal from "./pug/includes/forms/dropdown/--apply/dropdown--apply";
import DropdownDate from "./pug/includes/forms/dropdown/--date/dropdown--date";
import likeBtn from "./pug/includes/forms/like-btn/like-btn";

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

const dateFilters = document.querySelectorAll('.dropdown--date');
dateFilters.forEach((dateFilterElement) => {
    const dateFilter = new DropdownDate(dateFilterElement);
});

const likeBtns = document.querySelectorAll('.like-btn');
likeBtns.forEach((likeBtnElement) => {
    const likeButton = new likeBtn(likeBtnElement);
    console.log(likeBtnElement)
});


import './assets/scss/form-elements.scss'



if (module.hot) {
    module.hot.accept();
}
