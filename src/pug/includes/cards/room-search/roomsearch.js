import DropdownApply from "../../forms/dropdown/--apply/dropdown--apply";
import Calendar from "../../forms/calendar/calendar";

const guestsSelectElement = document.querySelector('.roomsearch .dropdown--guests')
const guestsSelect = new DropdownApply(guestsSelectElement, ['гость', 'гостя', 'гостей'])
const calendarElement = document.querySelector('.roomsearch .input-calendar')
const calendar = new Calendar(calendarElement);

const date = new Date(2020, 10, 15);
const bate = new Date(2020, 1, 15);

console.log(Number(date) === Number(bate))

const fdofm = (date) => {
    const dateCopy = date;
    dateCopy.setDate(1)
      return date.getDay();
}
