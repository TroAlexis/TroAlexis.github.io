// CREATE BOOKING OBJECT;
let booking = {
    'card' : bookingCard = document.querySelector('.booking'),
    'arrival' : '',
    'departure' : '',
    'guests' : 0,
    'cost' : Number(bookingCard.querySelector('.booking__cost').firstChild.textContent.match(/(.+)₽/)[1].replace(/\s/g, '')),
    'extras' : Number(bookingCard.querySelector('.booking__extra').lastChild.previousSibling.textContent.slice(0,-1)),
    'discount' : Number(bookingCard.querySelector('.booking__services p').textContent.match(/скидка\s(.+)₽/)[1].replace(/\s/g, '')),
    'updateGuests' : function (bookingCard) {
        const regex = new RegExp('\\d+');
        let found = bookingCard.querySelector('.dropdown--guests .dropdown__select span').textContent.match(regex);
        this.guests = (found) ? Number(found[0]) : 0;
    },
    'getTotalCost' : function (days) {
        return (this.cost*days) + this.extras;
    },
    'getTotalDays' : function () {
        return (this.departure - this.arrival)/(1000*60*60*24);
    }
}

// UPDATING GUEST ON APPLY CLICK
const guestsApply = booking.card.querySelector('.dropdown--guests .dropdown__content .dropdown__apply');
guestsApply.addEventListener('click', function () {
    booking.updateGuests(bookingCard);
})
const dateApply = booking.card.querySelector('.dropdown--date .dropdown__content .dropdown__apply');
const bookingDays = booking.card.querySelector('.booking .booking__days');
const bookingSumDays = booking.card.querySelector('.booking__sum-total');
const overAll = booking.card.querySelector('.booking__total').lastElementChild;
const regExpDays = new RegExp('\\d+\\sсут[а-яё]+')
dateApply.addEventListener('click', function () {
    booking.arrival = new Date(Number(arrival[2]), Number(arrival[1]), Number(arrival[0]));
    booking.departure = new Date(Number(departDate[2]), Number(departDate[1]), Number(departDate[0]));
    if (booking.getTotalDays() > 1) {
        bookingDays.textContent = bookingDays.textContent.replace(regExpDays, ' ' + booking.getTotalDays() + ' ' + getWordForm(booking.getTotalDays(), 'сутки', 'суток', 'суток'));
        bookingSumDays.textContent = spacify(booking.cost*booking.getTotalDays()) + '₽';
        overAll.textContent = spacify(Number(booking.getTotalCost(booking.getTotalDays())) - booking.discount) + '₽';
    }
})

console.log(bookingCard.querySelector('.dropdown--guests .dropdown__select span').textContent)



// HELPER FUNCTIONS
function getWordForm(number,form1, form2, form3) {
    if (number === 1 || (number > 19 && number % 10 === 1)) {
        return form1;
    }
    if (number > 1 && number < 5) {
        return form2;
    }
    else {
        return form3;
    }
}
function spacify (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}