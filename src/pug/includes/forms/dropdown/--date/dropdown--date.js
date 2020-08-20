import Calendar from "../../calendar/calendar";

export default class DropdownDate extends Calendar {
    constructor(dropdownElement) {
        super(dropdownElement, { initListeners: false });

    }
}