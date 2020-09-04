// JS
import Header from 'Includes/header/header';
import 'Includes/cards/booking/booking';
import LikeBtn from 'Includes/forms/like-btn/like-btn'

const header = new Header(document.querySelector('.header'))

const likeBtns = document.querySelectorAll('.like-btn');

likeBtns.forEach((likeBtnEl) => {
    const likeBtn = new LikeBtn(likeBtnEl);
});



// SCSS
import 'Scss/room-details.scss'
if (module.hot) {
    module.hot.accept();
}