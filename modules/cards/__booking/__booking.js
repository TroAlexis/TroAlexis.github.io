{
// CREATE DOMSTRINGS
    const DOM = {
        booking: '.booking',
        cost: '.booking__cost',
        extra: '.booking__extra',
        discount: '.booking__services p',
        guests: '.dropdown--guests .dropdown__select span',
        guestsApply: '.dropdown--guests .dropdown__content .dropdown__apply',
        dateApply: '.dropdown--date .dropdown__content .dropdown__apply',
        days: '.booking .booking__days',
        sumOfDays: '.booking__sum-total',
        total: '.booking__total'
    }
// CREATE BOOKING OBJECT;
    let booking = {
        card: bookingCard = document.querySelector(DOM.booking),
        arrival: '',
        departure: '',
        guests: 0,
        cost: Number(bookingCard.querySelector(DOM.cost).firstChild.textContent.match(/(.+)₽/)[1].replace(/\s/g, '')),
        extras: Number(bookingCard.querySelector(DOM.extra).lastChild.previousSibling.textContent.slice(0, -1)),
        discount: Number(bookingCard.querySelector(DOM.discount).textContent.match(/скидка\s(.+)₽/)[1].replace(/\s/g, '')),
        updateGuests: function (bookingCard) {
            const regex = new RegExp('\\d+');
            let found = bookingCard.querySelector(DOM.guests).textContent.match(regex);
            this.guests = (found) ? Number(found[0]) : 0;
        },
        getTotalCost: function (days) {
            return (this.cost * days) + this.extras;
        },
        getTotalDays: function () {
            return (this.departure - this.arrival) / (1000 * 60 * 60 * 24);
        },
        setEventListeners: function () {
            const guestsApply = this.card.querySelector(DOM.guestsApply);
            guestsApply.addEventListener('click', () => this.updateGuests(this.card))

            const dateApply = this.card.querySelector(DOM.dateApply);
            const bookingDays = this.card.querySelector(DOM.days);
            const bookingSumDays = this.card.querySelector(DOM.sumOfDays);
            const overAll = this.card.querySelector(DOM.total).lastElementChild;
            const regExpDays = new RegExp('\\d+\\sсут[а-яё]+');
            dateApply.addEventListener('click', () => {
                this.arrival = new Date(Number(arrival[2]), Number(arrival[1]), Number(arrival[0]));
                this.departure = new Date(Number(departDate[2]), Number(departDate[1]), Number(departDate[0]));
                if (this.getTotalDays() > 0) {
                    bookingDays.textContent = bookingDays.textContent.replace(regExpDays, ' ' + this.getTotalDays() + ' ' + getWordForm(this.getTotalDays(), 'сутки', 'суток', 'суток'));
                    bookingSumDays.textContent = spacify(this.cost * this.getTotalDays()) + '₽';
                    overAll.textContent = spacify(Number(this.getTotalCost(this.getTotalDays())) - this.discount) + '₽';
                }
            })
        }
    }

// UPDATING GUEST ON APPLY CLICK
booking.setEventListeners();

// HELPER FUNCTIONS
    function getWordForm(number, form1, form2, form3) {
        if (number === 1 || (number > 19 && number % 10 === 1)) {
            return form1;
        }
        if (number > 1 && number < 5) {
            return form2;
        } else {
            return form3;
        }
    }

    function spacify(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }
}