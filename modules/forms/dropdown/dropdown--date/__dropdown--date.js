// SETTING THE INITIAL DATE
let initialDate = new Date();
let initialDay = initialDate.getDate();
let initialMonth = initialDate.getMonth();
let initialYear = initialDate.getFullYear();

// SETTING CURRENT DATE IN THE CALENDAR
let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let totalDays = daysInMonth(currentMonth, currentYear);

// SETTING ARRIVAL AND DEPART DATES
let arrival = '';
let departDate = '';
let departDay = '';
let departMonth = '';
let departYear = '';
let arrivalDay = '';
let arrivalMonth = '';
let arrivalYear = '';

// SETTING FIRSTDATE TO KNOW THE DAY OF THE WEEK FOR THE FIRST DAY
let firstDate = new Date();
firstDate.setDate(1);
firstDay = firstDate.getDay();


// DATE SELECTS LOOPING
var dateSelects = document.querySelectorAll('.dropdown--date .dropdown__select');

for (i = 0; i < dateSelects.length; i++) {
    let dateSelect = dateSelects[i];
    dateSelect.addEventListener('click', function () {
        let content = (this.nextElementSibling.classList.contains('dropdown__content')) ? this.nextElementSibling : this.nextElementSibling.nextElementSibling;
        // if arrival select
        if (this.nextElementSibling.classList.contains('dropdown__select')) {
            this.firstElementChild.focus();
            this.nextElementSibling.firstElementChild.blur();
            content.classList.remove('depart')
            content.classList.add('arrival')
        }
        // if depart select
        else {
            this.firstElementChild.focus();
            this.previousElementSibling.firstElementChild.blur();
            content.classList.remove('arrival')
            content.classList.add('depart')
        }
    })
}

// MASKED INPUT AND INPUT TRIGGER FOR DATE
let inpArrivals = document.querySelectorAll('.dropdown__arrival');
for (i = 0; i < inpArrivals.length; i++) {
    let inpArrival = inpArrivals[i]
    var masked = new Formatter(inpArrival, {
        'pattern' : '{{99}}.{{99}}.{{9999}}',
        'persistent' : false
    })
    inpArrival.addEventListener('input', function (e) {
        if (e.target.value.length === 10) {
            let inputDay = e.target.value.slice(0, 2);
            let inputMonth = parseInt(e.target.value.slice(3, 5),10) - 1;
            let inputYear = e.target.value.slice(6);
            let inputDate = [inputDay, ('0' + inputMonth).slice(-2), inputYear];
            if (inputYear >= initialYear && inputDay < 32 && inputMonth < 13) {
                let exArrival = e.target.parentElement.parentElement.querySelector('.dropdown--date__day.arrival');
                let inputDayBtn = e.target.parentElement.parentElement.querySelector('.dropdown--date__day--'+parseInt(inputDay, 10));
                let select = e.target.parentElement;
                let content = e.target.parentElement.parentElement.querySelector('.dropdown__content');
                let month = content.querySelector('.dropdown--date__month');
                let year = content.querySelector('.dropdown--date__year');
                if (departDate) {
                    if (compareInput(['arrival', 'depart'] ,inputDate, inputDay, inputMonth, inputYear, departDate, departDay, departMonth, departYear)) {
                        updateDate(exArrival, inputDate, inputDay, ('0' + inputMonth).slice(-2), inputYear, inputDayBtn, 'arrival', select, content, true);
                        updateMonth(['input', inputMonth, inputYear], month, year)
                        updateDays(currentMonth, currentYear, content.querySelector('.dropdown--date__days'));
                    }
                }
                else {
                     if (compareInput(['arrival'],inputDate, inputDay, inputMonth, inputYear, initialDate, initialDay, initialMonth, initialYear)) {
                        updateDate(exArrival, inputDate, inputDay, ('0' + inputMonth).slice(-2), inputYear, inputDayBtn, 'arrival', select, content, true);
                        updateMonth(['input', inputMonth, inputYear], month, year)
                        updateDays(currentMonth, currentYear, content.querySelector('.dropdown--date__days'));
                    }
                }
            }
        }
    })
}
let inpDeparts = document.querySelectorAll('.dropdown__depart');
for (i = 0; i < inpDeparts.length; i++) {
    let inpDepart = inpDeparts[i]
    var masked = new Formatter(inpDepart, {
        'pattern' : '{{99}}.{{99}}.{{9999}}',
        'persistent' : false
    })
    inpDepart.addEventListener('input', function (e) {
        if (e.target.value.length === 10) {
            let inputDay = e.target.value.slice(0, 2);
            let inputMonth = parseInt(e.target.value.slice(3, 5),10) - 1;
            let inputYear = e.target.value.slice(6);
            let inputDate = [inputDay, ('0' + inputMonth).slice(-2), inputYear];
            if (inputYear >= initialYear && inputDay < 32 && inputMonth < 13) {
                let exDepart = e.target.parentElement.parentElement.querySelector('.dropdown--date__day.depart');
                let inputDayBtn = e.target.parentElement.parentElement.querySelector('.dropdown--date__day--'+parseInt(inputDay, 10));
                let select = e.target.parentElement;
                let content = e.target.parentElement.parentElement.querySelector('.dropdown__content');
                let month = content.querySelector('.dropdown--date__month');
                let year = content.querySelector('.dropdown--date__year');
                if (arrival) {
                    if (compareInput(['depart'],inputDate, inputDay, inputMonth, inputYear, arrival, arrivalDay, arrivalMonth, arrivalYear)) {
                        updateDate(exDepart, inputDate, inputDay, ('0' + inputMonth).slice(-2), inputYear, inputDayBtn, 'depart', select);
                        updateMonth(['input', inputMonth, inputYear], month, year)
                        updateDays(currentMonth, currentYear, content.querySelector('.dropdown--date__days'));
                    }
                }
                else {
                    if (compareInput(['depart'],inputDate, inputDay, inputMonth, inputYear, initialDate, initialDay, initialMonth, initialYear)) {
                        updateDate(exDepart, inputDate, inputDay, ('0' + inputMonth).slice(-2), inputYear, inputDayBtn, 'depart', select, content, true);
                        updateMonth(['input', inputMonth, inputYear], month, year)
                        updateDays(currentMonth, currentYear, content.querySelector('.dropdown--date__days'));
                    }
                }
            }
        }
    })
}

// LOOPING OVER ALL CALENDARS ON THE PAGE
const monthlist = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const months = document.querySelectorAll('.dropdown--date__text');

var i = 0;

for (i = 0; i < months.length; i++) {
    // month text in the calendar
    const month = months[i].firstChild;
    // year text in the calendar
    const year = months[i].lastChild;
    // days table in the calendar
    const days = months[i].parentElement.nextElementSibling.nextElementSibling;

    // CREATING THE CALENDAR FOR CURRENT MONTH
    //      setting month and year in the calendar
    month.textContent = monthlist[currentMonth];
    year.textContent = ' '+ currentYear;
    // figuring out and filling with the days of the previous month
    let daysBefore = (firstDay>0) ? firstDay - 1 : 7 - 1;
    let beforeMonth = (currentMonth - 1 >= 0) ? currentMonth - 1 : 11;
    let d = daysInMonth(beforeMonth, currentYear);
    let gapA = d-daysBefore+1;
    for (gapA; gapA <= d; gapA++) {
        let day = document.createElement('span');
        day.className = 'dropdown--date__day disabled';
        day.textContent = gapA.toString();
        days.appendChild(day);
    }
    // filling with the days of the chosen (current) month
    for (let l = 1; l <= totalDays; l++) {
        let day = document.createElement('span');
        day.className = 'dropdown--date__day';
        day.classList.add('dropdown--date__day--'+l.toString())
        if (l === currentDay) {
            day.classList.add('current');
        }
        day.textContent = l.toString();
        days.appendChild(day);
    }
    // figuring out and filling with the days of the next month
    let gapB = (35 - totalDays - daysBefore);
    for (let l = 1; l <= gapB; l++) {
        let day = document.createElement('span');
        day.className = 'dropdown--date__day disabled';
        day.textContent = l.toString();
        days.appendChild(day);
    }
    // creating extra row of cells for some cases
    for (let l = 0; l < 7; l++) {
        let day = document.createElement('span');
        day.className = 'dropdown--date__day';
        day.style.display = 'none';
        days.appendChild(day);
    }
    // adding click functionality for dayButtons
    let dayButtons = days.querySelectorAll('.dropdown--date__day');
    dayButtons.forEach(dayButton => dayButton.addEventListener('click', function () {
        // establishing previous arrival and depart chosen if there is one
        let exArrival = this.parentElement.querySelector('.dropdown--date__day.arrival');
        let exDepart = this.parentElement.querySelector('.dropdown--date__day.depart');
        // fixing the clicked date, day, month, year separately
        let clickedDate = [('0'+this.textContent).slice(-2), ('0' + currentMonth.toString()).slice(-2), currentYear.toString()];
        let clickedDay = clickedDate[0];
        let clickedMonth = clickedDate[1];
        let clickedYear = clickedDate[2];
        let content = this.parentElement.parentElement.parentElement;
        // if there is a chosen arrival
        if (this.parentElement.parentElement.parentElement.classList.contains('arrival')) {
            // if clicked button is not already chosen or disabled
            if (!this.classList.contains('arrival') && !this.classList.contains('disabled')) {
                let select = this.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling;
                //if there is a depart date
                if (departDate) {
                    if (compareInput(['arrival', 'depart'] ,clickedDate, clickedDay, clickedMonth, clickedYear, departDate, departDay, departMonth, departYear) && compareInput(['arrival'],clickedDate, clickedDay, clickedMonth, clickedYear, initialDate, initialDay, initialMonth, initialYear)) {
                        updateDate(exArrival, clickedDate, clickedDay, clickedMonth, clickedYear, this, 'arrival', select, content, true);
                        cleanBetween(this.previousElementSibling, 'before');
                        setBetweenDays(this, 'arrival');
                    }
                }
                // if not
                else {
                    if (compareInput(['arrival'],clickedDate, clickedDay, clickedMonth, clickedYear, initialDate, initialDay, initialMonth, initialYear)) {
                      updateDate(exArrival, clickedDate, clickedDay, clickedMonth, clickedYear, this, 'arrival', select, content, true);
                    }
                }
            }
        }
        // if there is a chosen depart
        else {
            //if there is arrival chosen and is not disabled or chosen for depart
            if (!this.classList.contains('disabled') && !this.classList.contains('depart')) {
                let select = this.parentElement.parentElement.parentElement.previousElementSibling;
                if (arrival) {
                    if (compareInput(['depart'] , clickedDate, clickedDay, clickedMonth, clickedYear, arrival, arrivalDay, arrivalMonth, arrivalYear)) {
                        updateDate(exDepart, clickedDate, clickedDay, clickedMonth, clickedYear, this, 'depart', select);
                        cleanBetween(this.nextElementSibling, 'after');
                        setBetweenDays(this, 'depart');
                    }
                }
                else {
                    if (compareInput(['depart'] , clickedDate, clickedDay, clickedMonth, clickedYear, initialDate, initialDay, initialMonth, initialYear)) {
                      updateDate(exDepart, clickedDate, clickedDay, clickedMonth, clickedYear, this, 'depart', select, content, true);
                    }
                }
            }
        }
    }))

    // determining arrows
    let arrowBack = months[i].previousElementSibling;
    let arrowForward = months[i].nextElementSibling;
    // adding arrow back functionality (updating the table for the previous month)
    arrowBack.addEventListener('click', function () {
        updateMonth(['previous'], month, year);
        updateDays(currentMonth, currentYear, days);
    })
    // adding arrow forward functionality (updating the table for the next month)
    arrowForward.addEventListener('click', function () {
        updateMonth(['next'], month, year);
        updateDays(currentMonth, currentYear, days);
    })
}



// APPLY BUTTONS FOR EVERY CALENDAR
const applyBtnsDate = document.querySelectorAll('.dropdown--date .dropdown__apply');
for (i = 0; i < applyBtnsDate.length; i++) {
    let applyBtnDate = applyBtnsDate[i];
    applyBtnDate.addEventListener('click', function (event) {
        event.preventDefault();
        return false;
    })
    applyBtnDate.addEventListener('click', function () {
        if (arrival) {
            this.parentElement.parentElement.previousElementSibling.previousElementSibling.querySelector('input').value = arrivalDay + '.' + ('0' +(parseInt(arrivalMonth, 10)+1)).slice(-2) + '.' + arrivalYear;
        }
        if (departDate) {
            this.parentElement.parentElement.previousElementSibling.querySelector('input').value = departDay + '.' + ('0' +(parseInt(departMonth, 10)+1)).slice(-2) + '.' + departYear;
        }
    })
}

// CLEAR BUTTONS FOR EVERY CALENDAR
const clearBtnsDate = document.querySelectorAll('.dropdown--date .dropdown__clear')
for (i = 0; i < clearBtnsDate.length; i++) {
    let clearBtnDate = clearBtnsDate[i];
    clearBtnDate.addEventListener('click', function (event) {
        event.preventDefault();
        return false;
    })
    clearBtnDate.addEventListener('click', function () {
        arrival = '';
        departDate = '';
        departDay = '';
        departMonth = '';
        departYear = '';
        arrivalDay = '';
        arrivalMonth = '';
        arrivalYear = '';
        currentDay = initialDay;
        updateMonth(['input', initialMonth, initialYear], this.parentElement.querySelector('.dropdown--date__month'), this.parentElement.querySelector('.dropdown--date__year'))
        updateDays(currentMonth, currentYear, this.parentElement.querySelector('.dropdown--date__days'));
        this.parentElement.parentElement.previousElementSibling.firstElementChild.value = '';
        this.parentElement.parentElement.previousElementSibling.previousElementSibling.firstElementChild.value = '';
        this.parentElement.parentElement.previousElementSibling.previousElementSibling.firstElementChild.focus();
        this.parentElement.parentElement.className = 'dropdown__content arrival';
    })
}
// HELPER FUNCTIONS

function updateDays(month, year, days) {
    // finding out the first day's weekday
    let firstDate = new Date(year, month);
    let firstDay = firstDate.getDay();
    let daysBefore = (firstDay>0) ? firstDay - 1 : 7 - 1;
    let beforeMonth = (month - 1 >= 0) ? month - 1 : 11;
    let d = daysInMonth(beforeMonth, year);
    // creating node number to track it
    let cnode = 0;
    // updating days in the prev month
    let gapA = d-daysBefore+1;
    for (gapA; gapA <= d; gapA++) {
        let day = days.childNodes[cnode]
        day.className = 'dropdown--date__day disabled';
        // if (!day.classList.contains('disabled')) {
        //     day.classList.add('disabled');
        //     if (day.classList.contains('arrival') || day.classList.contains('depart')) {
        //         day.classList.remove('arrival', 'depart')
        //     }
        // }
        day.textContent = gapA.toString();
        cnode += 1;
    }
    // updating days in the current month
    for (let l = 1; l <= totalDays; l++) {
        let day = days.childNodes[cnode];
        day.className = 'dropdown--date__day';
        day.classList.add('dropdown--date__day--'+l.toString())
        if (l === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
            day.classList.add('current');
        }
        if (day.style.display === 'none') {
            day.style.display = 'flex';
        }
        day.textContent = l.toString();
        // restoring arrival visual
        if (('0'+day.textContent).slice(-2) + '.' + ('0' + currentMonth.toString()).slice(-2) + '.' + currentYear.toString() === arrivalDay+ '.' + arrivalMonth + '.' + arrivalYear) {
            day.classList.add('arrival');
        }
        // restoring depart visual
        else if (('0'+day.textContent).slice(-2) + '.' + ('0' + currentMonth.toString()).slice(-2) + '.' + currentYear.toString() === departDay+ '.' + departMonth + '.' + departYear) {
            day.classList.add('depart');
        }
        else if (isBetween(arrival, departDate, [l, currentMonth, currentYear])) {
            day.classList.add('between');
        }
        cnode += 1;
    }
    // updating days in the next month
    let gapB = ((35 - totalDays - daysBefore) >= 0) ? 35 - totalDays - daysBefore : 7 + (35 - totalDays - daysBefore) ;
    for (let l = 1; l <= gapB; l++) {
        let day = days.childNodes[cnode];
        day.className = 'dropdown--date__day disabled';
        // if (!day.classList.contains('disabled')) {
        //     day.classList.add('disabled');
        //     // if disabled now and was chosen before, wipe it
        //     if (day.classList.contains('arrival') || day.classList.contains('depart')) {
        //         day.classList.remove('arrival', 'depart')
        //     }
        // }
        if (day.style.display === 'none') {
            day.style.display = 'flex';
        }
        day.textContent = l.toString();
        cnode += 1;
    }
    // clearing extra cells
    if (cnode === 35) {
        for (cnode; cnode <= 41; cnode++) {
            let day = days.childNodes[cnode];
            if (day.style.display === 'flex') {
                day.style.display = 'none';
            }
        }
    }
}

// UPDATE MONTH AND YEAR TEXT IN THE CALENDAR
function updateMonth(typelist, month, year) {
    if (typelist[0] === 'next') {
        currentMonth = (currentMonth + 1 < 12) ? currentMonth + 1 : 0;
        if (currentMonth === 0) {
            currentYear += 1;
            year.textContent =  ' ' + currentYear;
        }
    }
    else if (typelist[0] === 'previous') {
        currentMonth = (currentMonth - 1 >= 0) ? currentMonth - 1 : 11;
        if (currentMonth === 11) {
            currentYear -= 1;
            year.textContent =  ' ' + currentYear;
        }
    }
    else if (typelist[0] ==='input') {
        currentMonth = typelist[1];
        currentYear = parseInt(typelist[2], 10);
        year.textContent =  ' ' + currentYear;
    }
    month.textContent = monthlist[currentMonth];
    totalDays = daysInMonth(currentMonth, currentYear);
}

// DETERMINING DAYS IN BETWEEN
function isBetween(start, stop, date) {
    let startDay = start[0], startMonth = start[1], startYear = start[2];
    let stopDay = stop[0], stopMonth = stop[1], stopYear = stop[2];
    let dateDay = date[0], dateMonth = date[1], dateYear = date[2];
    if (dateYear == stopYear && dateYear == startYear) {
        if (dateMonth == stopMonth && dateMonth == startMonth) {
            return dateDay < stopDay && dateDay > startDay;
        }
        else if (dateMonth == stopMonth && dateMonth > startMonth) {
            return dateDay < stopDay;
        }
        else if (dateMonth == startMonth && dateMonth < stopMonth) {
            return dateDay > startDay;
        }
        else return dateMonth > startMonth && dateMonth < stopMonth;
    }
    if (dateYear > startYear && dateYear == stopYear) {
        if (dateMonth < stopMonth) {
            return true
        }
        if (dateMonth == stopMonth) {
            return dateDay < stopDay;
        }
        return false;
    }
    if (dateYear < stopYear && dateYear == startYear) {
        if (dateMonth > startMonth) {
            return true;
        }
        if (dateMonth == startMonth) {
            return dateDay > startDay;
        }
        return false;
    }
    return dateYear > startYear && dateYear < stopYear;
}
// SETTING DAYS BETWEEN
function setBetweenDays(button, btnType) {
    if (btnType === 'depart') {
        let previous = button.previousElementSibling;
        if (previous.classList.contains('disabled') || previous.classList.contains('arrival') || button.classList.contains('arrival'))  {
            return false;
        }
        previous.classList.add('between');
        setBetweenDays(previous, 'depart');
    }
    else {
        let next = button.nextElementSibling;
        if (next.classList.contains('disabled') || next.classList.contains('depart') || button.classList.contains('depart')) {
            return false;
        }
        next.classList.add('between');
        setBetweenDays(next, 'arrival');
    }
}
// CLEANING DAYS BETWEEN;
function cleanBetween (button, direction) {
    if (direction === 'after') {
        if (button.classList.contains('between')) {
            button.classList.remove('between');
            cleanBetween(button.nextElementSibling, 'after');
        }
        else {
            return false;
        }
    }
    else {
        if (button.classList.contains('between')) {
            button.classList.remove('between');
            cleanBetween(button.previousElementSibling, 'before');
        }
        else {
            return false
        }
    }
}

// UPDATE THE DATE IF CLICKED DATE IS FINE
function updateDate(exButton, clickedDate, clickedDay, clickedMonth, clickedYear, button, type, select, content, losefocus) {
    if (exButton) {
        exButton.classList.remove(type);
    }
    if (type === 'depart') {
        departDate = clickedDate;
        departDay = clickedDay;
        departMonth = clickedMonth;
        departYear = clickedYear;
        if (losefocus) {
            select.firstElementChild.blur();
            select.previousElementSibling.firstElementChild.focus();
            content.classList.add('arrival');
            select.previousElementSibling.classList.add('active');
        }
    }
    else {
        arrival = clickedDate;
        arrivalDay = clickedDay;
        arrivalMonth = clickedMonth;
        arrivalYear = clickedYear;
        if (losefocus) {
            select.firstElementChild.blur();
            select.nextElementSibling.firstElementChild.focus();
            content.classList.remove('arrival');
            content.classList.add('depart');
        }

    }
    if (currentMonth == clickedMonth) {
        button.classList.add(type);
        button.classList.remove('between');
    }
}

// COMPARE INPUT
function compareInput(type, inputDate, inputDay, inputMonth, inputYear, limitDate, limitDay, limitMonth, limitYear) {
    if (inputYear == limitYear) {
        if (inputMonth == limitMonth) {
            if (type[1] === 'depart') {
                return inputDay <= limitDay
            }
            return inputDay >= limitDay && inputDay <= daysInMonth(inputMonth, inputYear);
        }
        else if (inputMonth > limitMonth && inputMonth < 13) {
            if (type[1] === 'depart') {
                return false
            }
            return inputDay <= daysInMonth(inputMonth, inputYear);
        }
        else {
            if (type[1] === 'depart') {
               return inputDay <= daysInMonth(inputMonth, inputYear);
            }
            return false;
        }
    }
    else if (inputYear > limitYear && inputYear <= 2022) {
        if (type[1] === 'depart') {
            return false
        }
        if (inputDay <= daysInMonth(inputMonth, inputYear)) {
            return inputMonth < 13;
        }
    }
    else {
        if (type[1] === 'depart') {
            return inputYear >= initialYear;
        }
        return false;
    }
}

// FIND OUT IF THE YEAR IS A LEAP ONE
function isLeapYear(year) {
    let result;
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                result = true;
            }
            else {
                result = false;
            }
        }
        else {
            result = true;
        }
    }
    else {
        result = false
    }
    return result;
}

// FIND OUT THE DAYS IN THE MONTH
function daysInMonth(month, year) {
    month = parseInt(month, 10);
    if (month === 8 || month === 10) {
        return 30;
    }
    if (month === 9 || month === 7 || month === 11) {
        return 31;
    }
    if (month % 2 === 0) {
        return 31;
    }
    else {
        if (month === 1) {
            if (isLeapYear(year)) {
                return 29;
            }
            else {
                return 28;
            }
        }
        else {
            return 30;
        }
    }
}