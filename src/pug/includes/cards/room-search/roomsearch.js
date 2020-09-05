import DropdownApply from 'Includes/forms/dropdown/--apply/dropdown--apply';
import Calendar from 'Includes/forms/calendar/calendar';

const guestsSelectElement = document.querySelector('.roomsearch .dropdown--apply');
const guestsSelect = new DropdownApply(guestsSelectElement, ['гость', 'гостя', 'гостей']);
const calendarElement = document.querySelector('.roomsearch .input-calendar');
const calendar = new Calendar(calendarElement);
