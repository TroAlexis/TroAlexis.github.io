import Dropdown from "../../forms/dropdown/drop";
import DropdownAuto from "../../forms/dropdown/--auto/dropdown--auto";

const roomSelectElement = document.querySelector('.roomsearch .dropdown--rooms')
const boomSelectElement = document.querySelector('.roomsearch .dropdown')
// const RoomSelect = new Dropdown(roomSelectElement);
const BoomSelect = new DropdownAuto(roomSelectElement)

console.log();