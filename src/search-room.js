import './header-footer'
import Expandable from "./pug/includes/expandable/expandable";
import Slideshow from "./pug/includes/slideshow/slideshow";
import Calendar from "./pug/includes/forms/calendar/calendar";
import DropdownAuto from "./pug/includes/forms/dropdown/--auto/dropdown--auto";
import DropdownApplyTotal from "./pug/includes/forms/dropdown/--apply/dropdown--apply";


const calendars = document.querySelectorAll('.dropdown--date');
calendars.forEach((calendarEl) => {
    const calendar = new Calendar(calendarEl);
});

const dropdownsAuto = document.querySelectorAll('.dropdown--auto');
dropdownsAuto.forEach((dropdownEl) => {
    const dropdownAuto = new DropdownAuto(dropdownEl);
});

const dropdownsApply = document.querySelectorAll('.dropdown--apply');
dropdownsApply.forEach((dropdownEl) => {
    const dropdownApply = new DropdownApplyTotal(dropdownEl, ['гость', 'гостя', 'гостей']);
});

const expandables = document.querySelectorAll(Expandable.domstrings.element);
expandables.forEach((expandableEl) => {
    const expandable = new Expandable(expandableEl);
});

const slideshows = document.querySelectorAll('.slideshow');
slideshows.forEach((slideshowEl) => {
    const slideshow = new Slideshow(slideshowEl);
});

const rateBtns = document.querySelectorAll('.rate-btn');
rateBtns.forEach((rateBtnEl) => {
  rateBtnEl.addEventListener('click', function(e) {
    if (e.target.classList.contains('rate-btn__star')) {
        e.preventDefault();
    }
  });
});

// SCSS
import './assets/scss/search-room.scss'
