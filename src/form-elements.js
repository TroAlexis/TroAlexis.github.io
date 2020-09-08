import Formatter from 'formatter.js-pebble';
import Calendar from 'Includes/forms/calendar/calendar';
import DropdownApplyTotal from 'Includes/forms/dropdown/--apply/dropdown--apply';
import DropdownDate from 'Includes/forms/dropdown/--date/dropdown--date';
import LikeBtn from 'Includes/forms/like-btn/like-btn';
import RateBtn from 'Includes/rate-btn/rate-btn';
import DropdownAuto from 'Includes/forms/dropdown/--auto/dropdown--auto';
import Expandable from 'Includes/expandable/expandable';

import 'Scss/form-elements.scss';
import RangeSlider from "Includes/forms/range-slider/range-slider";

// Enabling masked inputs.
const maskedInputs = document.querySelectorAll('.text-field--masked');
maskedInputs.forEach((input) => {
  const masked = new Formatter(input, {
    pattern: '{{99}}.{{99}}.{{9999}}',
    persistent: false,
  });
});

// Initializing dropdowns with buttons
const dropdownsApply = document.querySelectorAll('.dropdown--apply');
dropdownsApply.forEach((dropdownElement) => {
  const dropdown = new DropdownApplyTotal(dropdownElement, ['гость', 'гостя', 'гостей']);
  if (dropdownElement.classList.contains('expanded')) {
    dropdown.toggleSelectContent();
  }
  if (dropdownElement.classList.contains('modified')) {
    const plusBtns = [dropdown.content.firstElementChild.querySelector('.dropdown__plus'),
      dropdown.content.firstElementChild.querySelector('.dropdown__plus'),
      dropdown.content.firstElementChild.nextElementSibling.querySelector('.dropdown__plus')];
    plusBtns.forEach((button) => {
      dropdown.changeCounter(button);
    });
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
  if (dropdownElement.classList.contains('modified')) {
    const plusBtns = [{
      btn: dropdownAuto.content.firstElementChild.querySelector('.dropdown__plus'),
      labelText: dropdownAuto.content.firstElementChild.querySelector('.dropdown__label').textContent,
    }, {
      btn: dropdownAuto.content.firstElementChild.nextElementSibling.querySelector('.dropdown__plus'),
      labelText: dropdownAuto.content.firstElementChild.nextElementSibling.querySelector('.dropdown__label').textContent,
    }];
    plusBtns.forEach((plusBtn) => {
      for (let i = 0; i < 2; i++) {
        dropdownAuto.changeCounter(plusBtn.btn);
        dropdownAuto.changeInput(plusBtn.labelText);
      }
    });
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
  const likeButton = new LikeBtn(likeBtnElement);
});

// Init rate-btns
const rateBtns = document.querySelectorAll('.rate-btn');
rateBtns.forEach((buttonElement) => {
  const rateBtn = new RateBtn(buttonElement);
});

// Init range-slider
const rangeSlider = new RangeSlider(document.querySelector('.range-slider'), {
  track: {
    width: 267 / 16,
    borderWidth: 1 / 16,
  },
  thumb: {
    width: 14 / 16,
  },
});

// Init expandables
const expandables = document.querySelectorAll('.expandable');
expandables.forEach((expElement) => {
  const expandable = new Expandable(expElement);
  if (expElement.classList.contains('expanded')) {
    expandable.expandContent();
  }
});
