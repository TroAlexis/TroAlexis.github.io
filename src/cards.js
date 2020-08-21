import './pug/includes/cards/room-search/roomsearch';
import './pug/includes/cards/booking/booking';
import Calendar from "./pug/includes/forms/calendar/calendar";
import Slideshow from "./pug/includes/slideshow/slideshow";
import RateBtn from "./pug/includes/rate-btn/rate-btn";

const calendarContent = new Calendar(document.querySelector('.group--3 .input-calendar'))
calendarContent.state = 'arrival';
const roomCards = document.querySelectorAll('.group--3 .roomcard');
roomCards.forEach((roomcCard) => {
  const slideShow = new Slideshow(roomcCard.querySelector('.slideshow'))
  const rateBtns = new RateBtn(roomcCard.querySelector('.rate-btn'))
})


import './assets/scss/cards.scss'


