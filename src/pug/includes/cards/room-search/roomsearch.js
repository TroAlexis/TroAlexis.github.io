import DropdownApply from "../../forms/dropdown/--apply/dropdown--apply";

const guestsSelectElement = document.querySelector('.roomsearch .dropdown--guests')
const guestsSelect = new DropdownApply(guestsSelectElement, ['гость', 'гостя', 'гостей'])