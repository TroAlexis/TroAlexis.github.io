// JS
import Header from 'Includes/header/header';
import 'Includes/cards/booking/booking';
import LikeBtn from 'Includes/forms/like-btn/like-btn';

// SCSS
import 'Scss/room-details.scss';

const header = new Header(document.querySelector('.header'));

const likeBtns = document.querySelectorAll('.like-btn');

likeBtns.forEach((likeBtnEl) => {
  const likeBtn = new LikeBtn(likeBtnEl);
});
if (module.hot) {
  module.hot.accept();
}
