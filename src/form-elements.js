import Formatter from 'formatter.js-pebble';
import Calendar from "./pug/includes/forms/calendar/calendar";
import DropdownApplyTotal from "./pug/includes/forms/dropdown/--apply/dropdown--apply";
import DropdownDate from "./pug/includes/forms/dropdown/--date/dropdown--date";
import likeBtn from "./pug/includes/forms/like-btn/like-btn";
import RateBtn from "./pug/includes/rate-btn/rate-btn";
import DropdownAuto from "./pug/includes/forms/dropdown/--auto/dropdown--auto";
import Expandable from "./pug/includes/expandable/expandable";


// Enabling masked inputs.
const maskedInputs = document.querySelectorAll('.text-field--masked');
maskedInputs.forEach((input) => {
  const masked = new Formatter(input, {
      pattern: '{{99}}.{{99}}.{{9999}}',
      persistent: false
  })
});

// Initializing dropdowns with buttons
const dropdownsApply = document.querySelectorAll('.dropdown--apply');
dropdownsApply.forEach((dropdownElement) => {
    const dropdown = new DropdownApplyTotal(dropdownElement, ['гость', 'гостя', 'гостей'])
    if (dropdownElement.classList.contains('expanded')) {
        dropdown.toggleSelectContent();
    }
    if (dropdownElement.classList.contains('modified')) {
        dropdown.changeCounter(dropdown.content.firstElementChild.querySelector('.dropdown__plus'));
        dropdown.changeCounter(dropdown.content.firstElementChild.querySelector('.dropdown__plus'));
        dropdown.changeCounter(dropdown.content.firstElementChild.nextElementSibling.querySelector('.dropdown__plus'));
        dropdown.updateAll();
    }
});
// Init dropdowns--auto
const dropdownsAuto = document.querySelectorAll('.dropdown--auto');
dropdownsAuto.forEach((dropdownElement) => {
    const dropdownAuto = new DropdownAuto(dropdownElement);
    if (dropdownElement.classList.contains('expanded')) {
        dropdownAuto.toggleSelectContent();
    }
});

// Init calendars
const calendars = document.querySelectorAll('.input-calendar');
calendars.forEach((calendarElement) => {
    const calendar = new Calendar(calendarElement);
});
// Init date filters
const dateFilters = document.querySelectorAll('.dropdown--date');
dateFilters.forEach((dateFilterElement) => {
    const dateFilter = new DropdownDate(dateFilterElement);
});

// Init like buttons
const likeBtns = document.querySelectorAll('.like-btn');
likeBtns.forEach((likeBtnElement) => {
    const likeButton = new likeBtn(likeBtnElement);
});

//Init rate-btns
const rateBtns = document.querySelectorAll('.rate-btn');
rateBtns.forEach((buttonElement) => {
    const rateBtn = new RateBtn(buttonElement);
});
//Init expandables
const expandables = document.querySelectorAll('.expandable');
expandables.forEach((expElement) => {
    const expandable = new Expandable(expElement);
    if (expElement.classList.contains('expanded')) {
        expandable.expandContent();
    }
});


import './assets/scss/form-elements.scss'
import Dropdown from "./pug/includes/forms/dropdown/dropdown";



if (module.hot) {
    module.hot.accept();
}
