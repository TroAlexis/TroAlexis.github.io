import Formatter from "formatter.js-pebble";

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
            arrows: {
                back: calendarElement.querySelector(DOM.arrows.back),
                forward: calendarElement.querySelector(DOM.arrows.forward)
            },
            month: calendarElement.querySelector(DOM.month),
            year: calendarElement.querySelector(DOM.year),
            days: calendarElement.querySelector(DOM.days),
            buttons: {
                apply: calendarElement.querySelector(DOM.apply),
                clear: calendarElement.querySelector(DOM.clear)
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
        this.currentCalendar = 0;
        this.calendars = [];
        this.renderMonthYear();
        this.renderDaysBefore();
        this.renderCurrentDays();
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
    // RENDER MONTH AND YEAR
    renderMonthYear() {
        this.elements.month.textContent = this.data.monthList[this.data.dates.current.getMonth()];
    //     SET THE CURRENT YEAR VIEW
        this.elements.year.textContent = this.data.dates.current.getFullYear();
    }
    // RENDER DAYS
    renderAllDays() {

    }
    renderDaysBefore() {
        // GET FIRST DAY OF MONTH
        const firstDayOfMonth = Calendar.calcFirstDayOfMonth(this.data.dates.current)
        // GET DAYS TO RENDER BEFORE THE FIRST DAY OF THE CURRENT MONTH
        const daysToRender = (firstDayOfMonth > 0) ? firstDayOfMonth - 1 : 7 - 1;
        // GET THE MONTH BEFORE CURRENT MONTH
        const monthBefore = (this.data.dates.current.getMonth() - 1 >= 0) ? this.data.dates.current.getMonth() - 1 : 11;
        // GET NUMBER OF DAYS TO FILL BEFORE CURRENT MONTH
        const daysInMonthBefore = Calendar.daysInMonth(this.data.dates.current.getFullYear(), monthBefore)
        let gapBefore = daysInMonthBefore - daysToRender + 1;
        // RENDER ALL DAYS BEFORE
        for (gapBefore; gapBefore <= daysInMonthBefore; gapBefore++) {
            this.elements.days.appendChild(Calendar.createDayElement(gapBefore, 'disabled'))
        }
        return daysToRender;
    }
    renderCurrentDays() {
        const daysToRender = Calendar.daysInMonth(this.data.dates.current.getFullYear(), this.data.dates.current.getMonth());
        let addCurrentDay = this.data.dates.current.getMonth() === this.data.dates.initial.getMonth() &&
            this.data.dates.current.getFullYear() === this.data.dates.initial.getFullYear();
        for (let i = 1; i <= daysToRender; i++) {
            let type = '';
            if (addCurrentDay && i === this.data.dates.initial.getDate()) {
                type = 'current';
            }
            this.elements.days.appendChild(Calendar.createDayElement(i, type, true));
        }
    }
    renderDaysAfter (daysBefore) {
        let gapAfter = 35 - daysBefore - Calendar.daysInMonth(this.data.dates.current.getFullYear(), this.data.dates.current.getMonth());
    }
}