const DOM = {
    calendar: '.input-calendar',
    arrival: {select: '.input-calendar__select.arrival',
                    input: 'input-calendar__select.arrival input'},
    depart: {select: '.input-calendar__select.depart',
                    input: 'input-calendar__select.depart input'},
    content: '.input-calendar__content',
    arrows: {
        back: '.input-calendar__arrow',
        forward: '.input-calendar__arrow--forward'
    },
    month: '.input-calendar__month',
    year: '.input-calendar__year',
    weekdays: '.input-calendar__weekdays',
    weekday: '.input-calendar__weekday',
    days: '.input-calendar__days',
    day: '.input-calendar__day',
    apply: '.input-calendar__apply',
    clear: '.input-calendar__clear'


}

export default class Calendar {
    constructor(calendarElement) {
        this.element = calendarElement;
        this.state = 'closed';
        this.elements = {
            arrival: {
                select: calendarElement.querySelector(DOM.arrival.select),
                input: calendarElement.querySelector(DOM.arrival.input)
            },
            depart: {
                select: calendarElement.querySelector(DOM.depart.select),
                input: calendarElement.querySelector(DOM.arrival.input)
            },
            content: calendarElement.querySelector(DOM.content),
            month: calendarElement.querySelector(DOM.month),
            year: calendarElement.querySelector(DOM.year),
            days: calendarElement.querySelector(DOM.days),
            buttons: {
                apply: calendarElement.querySelector(DOM.apply),
                clear: calendarElement.querySelector(DOM.clear),
                back: calendarElement.querySelector(DOM.arrows.back),
                forward: calendarElement.querySelector(DOM.arrows.forward)
            }
        }
        this.data = {
            dates: {
                initial: new Date(),
                current: new Date(),
                arrival: '',
                depart: '',
            },
            monthList: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        }
        this.renderAllDays();
        this.element.addEventListener('click', (evt) => {
            // SELECT CLICKED
            if (evt.target.closest('.input-calendar__select')) {
                // SELECT ELEMENT
                const select = evt.target.closest('.input-calendar__select');
                // GET CONTENT ELEMENT
                const content = this.elements.content;
                // IF CALENDAR IS NOT OPEN
                if (!content.classList.contains('open')) {
                    content.classList.add('open');
                    // CHANGE STATE TO SELECT CLICKED (ARRIVAL OR DEPART)
                    this.state = select.className.match(/depart|arrival/)[0];
                // IF CALENDAR IS OPEN
                } else {
                    // IF ARRIVAL CLICKED AND STATE IS ALREADY ARRIVAL, CLOSE CALENDAR
                    if (select.classList.contains('arrival')) {
                        this.changeState('arrival');
                    //    IF DEPART CLICKED AND STATE IS ALREADY DEPART, CLOSE CALENDAR
                    } else if (select.classList.contains('depart')) {
                        this.changeState('depart');
                    }
                }
            }
        })
        this.elements.content.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(noDot(DOM.arrows.back))) {
                this.clearDays();
                if (evt.target.classList.contains(noDot(DOM.arrows.forward))) {
                  this.data.dates.current.setMonth(this.data.dates.current.getMonth() + 1)
                } else {
                    this.data.dates.current.setMonth(this.data.dates.current.getMonth() - 1)
                }
                this.renderAllDays();
            }
        });
    }
    // GET DAYS IN MONTH (JANUARY 1 BASED)
    static daysInMonth(year, month) {
        return new Date(year, month+1, 0).getDate();
    }
    // CALC FIRST DAY OF MONTH
    static calcFirstDayOfMonth(date) {
        const dateCopy = date;
        dateCopy.setDate(1);
        return dateCopy.getDay();
    }
    // CREATE A DAY ELEMENT
    static createDayElement(day, type = '', addDayData = false) {
        const dayElement = document.createElement('span');
        dayElement.className = 'input-calendar__day';
        if (type) {
            dayElement.classList.add(type);
        }
        if (addDayData) {
            dayElement.setAttribute('data-day', `${day}`)
        }
        dayElement.textContent = `${day}`;
        return dayElement;
    }
    changeState(state) {
        if (this.state === state) {
            this.elements.content.classList.remove('open');
        }
        else {
            this.state = state;
        }
    }
    // RENDER MONTH AND YEAR
    renderMonthYear() {
        this.elements.month.textContent = this.data.monthList[this.data.dates.current.getMonth()];
    //     SET THE CURRENT YEAR VIEW
        this.elements.year.textContent = this.data.dates.current.getFullYear();
    }
    // RENDER DAYS
    renderAllDays() {
        this.renderMonthYear();
        this.renderDaysBefore();
        this.renderCurrentDays();
        this.renderDaysAfter();

    }
    renderDaysBefore() {
        // GET FIRST DAY OF MONTH
        const firstDayOfMonth = Calendar.calcFirstDayOfMonth(this.data.dates.current);
        // GET DAYS TO RENDER BEFORE THE FIRST DAY OF THE CURRENT MONTH
        this.data.daysToRenderBefore = (firstDayOfMonth > 0) ? firstDayOfMonth - 1 : 7 - 1;
        // GET THE MONTH BEFORE CURRENT MONTH
        const monthBefore = (this.data.dates.current.getMonth() - 1 >= 0) ? this.data.dates.current.getMonth() - 1 : 11;
        // GET NUMBER OF DAYS TO FILL BEFORE CURRENT MONTH
        const daysInMonthBefore = monthBefore === 11 ? Calendar.daysInMonth(this.data.dates.current.getFullYear() - 1, monthBefore) :
            Calendar.daysInMonth(this.data.dates.current.getFullYear() - 1, monthBefore);
        let gapBefore = daysInMonthBefore - this.data.daysToRenderBefore + 1;
        // RENDER ALL DAYS BEFORE
        for (gapBefore; gapBefore <= daysInMonthBefore; gapBefore++) {
            this.elements.days.appendChild(Calendar.createDayElement(gapBefore, 'disabled'))
        }
    }
    renderCurrentDays() {
        this.data.daysToRender = Calendar.daysInMonth(this.data.dates.current.getFullYear(), this.data.dates.current.getMonth());
        let addCurrentDay = this.data.dates.current.getMonth() === this.data.dates.initial.getMonth() &&
            this.data.dates.current.getFullYear() === this.data.dates.initial.getFullYear();
        for (let i = 1; i <= this.data.daysToRender; i++) {
            let type = '';
            if (addCurrentDay && i === this.data.dates.initial.getDate()) {
                type = 'current';
            }
            this.elements.days.appendChild(Calendar.createDayElement(i, type, true));
        }
    }
    renderDaysAfter () {
        let gapAfter = 42 - this.data.daysToRenderBefore - this.data.daysToRender;
        if (gapAfter >= 7) {
          gapAfter -= 7
        }
        for (let i = 1; i <= gapAfter; i++) {
            this.elements.days.appendChild(Calendar.createDayElement(i, 'disabled'));
        }
    }
    clearDays() {
        this.elements.days.querySelectorAll('*').forEach(day => day.remove())
    }
}

function noDot(string) {
    return string.replace('.', '')
}