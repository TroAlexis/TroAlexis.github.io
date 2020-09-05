// JS
import 'Includes/cards/room-search/roomsearch';
import 'Includes/cards/registration/registration';
import 'Includes/cards/booking/booking';
import Calendar from 'Includes/forms/calendar/calendar';
import Slideshow from 'Includes/slideshow/slideshow';
import RateBtn from 'Includes/rate-btn/rate-btn';

// SCSS
import 'Scss/cards.scss';

// Content
const calendarContent = new Calendar(document.querySelector('.group--3 .input-calendar'));
calendarContent.state = 'arrival';
const roomCards = document.querySelectorAll('.group--3 .roomcard');
roomCards.forEach((roomcCard) => {
  const slideShow = new Slideshow(roomcCard.querySelector('.slideshow'));
  const rateBtns = new RateBtn(roomcCard.querySelector('.rate-btn'));
});
