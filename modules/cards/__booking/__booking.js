// SELECT BOOKING DIV
const bookingCard = document.querySelector('.booking');

let booking = {
    'arrival' : '',
    'departure' : '',
    'guests' : 0,
    'cost' : Number(bookingCard.querySelector('.booking__cost').firstChild.textContent.slice(0, -2)),
    'extras' : Number(bookingCard.querySelector('.booking__extra').lastChild.previousSibling.textContent.slice(0,-1)),
    'updateGuests' : function (bookingCard) {
        const regex = new RegExp('\\d+');
        let found = bookingCard.querySelector('.dropdown--guests .dropdown__select span').textContent.match(regex);
        this.guests = (found) ? found[0] : 0;
    }
}
booking.total = booking.cost + booking.extras;

const guestsApply = bookingCard.querySelector('.dropdown--guests .dropdown__content .dropdown__apply');
guestsApply.addEventListener('click', function () {
    booking.updateGuests(bookingCard);
})

console.log(bookingCard.querySelector('.dropdown--guests .dropdown__select span').textContent)

