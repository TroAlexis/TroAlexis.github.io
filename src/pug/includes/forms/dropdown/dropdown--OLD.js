// STRINGS FOR CLASSES OF THE DROPDOWN
const DOMStrings = {
    dropdown: '.dropdown',
    select: '.dropdown__select',
    content: '.dropdown__content',
    counter: '.dropdown__count',
    label: '.dropdown__label',
    plusBtnRooms: '.dropdown__plus',
}

const dropdowns = document.querySelectorAll(DOMStrings.dropdown);

// ATTACHING EVENT LISTENER FOR DROPDOWN
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener('click', (e) => {
    //  TARGET = SELECT
    if (e.target.closest(DOMStrings.select)) {
        toggleSelectContent(e.target.closest(DOMStrings.select));
    }
    // TARGET = PLUS BUTTON
    else if (e.target.className === DOMStrings.plusBtnRooms) {
        increaseCounter(e.target)
    }
  })
});

// KEEP SELECTS IN A VARIABLE
const selects = document.querySelectorAll(DOMStrings.select);

document.documentElement.addEventListener('click', function (e) {
        // IF CLICK OUTSIDE DROPDOWN
        if (!e.target.closest(DOMStrings.dropdown)) {
            // CLOSE EVERY SELECT
            selects.forEach((select) => {
                closeSelectContent(select);
            })
        }
        // IF CLICK IN DROPDOWN
        else if (e.target.closest(DOMStrings.dropdown)) {
            selects.forEach((select) => {
                // CLOSE ALL OTHER SELECTS ON THE PAGE
                if (select.closest(DOMStrings.dropdown) !== e.target.closest(DOMStrings.dropdown)) {
                    closeSelectContent(select);
                }
            })
        }
})




// var plusBtnsRooms = document.querySelectorAll('.dropdown--rooms .dropdown__plus');
// if (plusBtnsRooms) {
//     roomsPlusBtnsListener(plusBtnsRooms);
// }


var minusBtns = document.querySelectorAll('.dropdown--rooms .dropdown__minus');

for (i = 0; i < minusBtns.length; i++) {
    var minusBtn = minusBtns[i];
    minusBtn.addEventListener('click', function () {
        var counter = this.nextElementSibling;
        let numb = parseInt(counter.textContent, 10);
        if (numb < 2) {
            this.classList.add('dropdown__minus--disabled')
        }
        if (numb !== 0) {
            counter.textContent = numb - 1;
            let total = counter.textContent;
            let label = this.previousElementSibling.textContent;
            if (label === 'спальни') {
                var exp = /\d+\sспал[а-яё]+/
                changeLabelWordForm(this, total, 'спальня', 'спальни', 'спален', exp)
            }
            else if (label === 'кровати') {
                var exp = /\d+\sкроват[а-яё]+/
                changeLabelWordForm(this, total, 'кровать', 'кровати', 'кроватей', exp)
            }
            else {
                var exp = /\d+\sванн[а-яё]{2}\sкомнат[а-яё]?/;
                changeLabelWordForm(this, total, 'ванная комната', 'ванные комнаты', 'ванных комнат', exp);
            }
        }
    })
}

// HELPER FUNCTIONS
export function recursiveCounters(object) {
    var prevSibling = object.previousElementSibling
    var counter = 0;
    if (prevSibling) {
        counter = parseInt(prevSibling.querySelector('.dropdown__count').textContent, 10);
        counter += recursiveCounters(prevSibling);
        return counter;
    }
    else {
        return 0;
    }
}

// function roomsPlusBtnsListener (buttons) {
//     for (i = 0; i < buttons.length; i++) {
//         var button = buttons[i];
//         button.addEventListener('click', function () {
//             var counter = this.previousElementSibling;
//             var label = this.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
//             let numb = parseInt(counter.textContent, 10);
//             if (counter.previousElementSibling.classList.contains('dropdown__minus--disabled')) {
//                 counter.previousElementSibling.classList.remove('dropdown__minus--disabled');
//             }
//             counter.textContent = numb + 1;
//             let total = counter.textContent;
//             if (label === 'спальни') {
//                 var exp = /\d+\sспал[а-яё]+/
//                 changeLabelWordForm(this, total, 'спальня', 'спальни', 'спален', exp)
//             }
//             else if (label === 'кровати') {
//                 var exp = /\d+\sкроват[а-яё]+/
//                 changeLabelWordForm(this, total, 'кровать', 'кровати', 'кроватей', exp)
//             }
//             else {
//                 var exp = /\d+\sванн[а-яё]{2}\sкомнат[а-яё]?/;
//                 changeLabelWordForm(this, total, 'ванная комната', 'ванные комнаты', 'ванных комнат', exp);
//             }
//         })
//     }
// }

//HELPER FUNCTIONS

// ADD OPEN CLASS TO THE SELECT CONTENT
function toggleSelectContent(select) {
    const content = select.parentElement.querySelector(DOMStrings.content);
    content.classList.toggle('open')
}

// CLOSE SELECT CONTENT ON CLICK OUTSIDE
function closeSelectContent(select) {
    const content = select.parentElement.querySelector(DOMStrings.content);
    // MAKE SELECT NOT ACTIVE
    select.classList.remove('active');
    // CLOSE CONTENT
    content.classList.remove('open')
    // REMOVE ACTIVE CLASSES FOR DROPDOWN-DATE
    content.classList.remove('arrival', 'depart')
}

function increaseCounter(button) {
    const counter = button.parentElement.querySelector(DOMStrings.counter);
    const label = button.parentElement.querySelector(DOMStrings.label);
    // FIND CURRENT COUNTER NUMBER
    let currentCount = parseInt(counter.textContent, 10);
    // MAKE MINUS BUTTON ACTIVE IF NOT ACTIVE ALREADY
    if (counter.previousElementSibling.classList.contains('disabled')) {
        counter.previousElementSibling.classList.remove('disabled');
    }
//    INCREASE COUNTER
    currentCount += 1;
    counter.textContent = currentCount;
    changeLabel(label, currentCount);
}

function changeLabel(label, total) {
    const field = label.parentElement.parentElement.parentElement.querySelector(DOMStrings.select)
    if (label === 'спальни') {
        const exp = /\d+\sспал[а-яё]+/;
        changeLabelWordForm(field, total, 'спальня', 'спальни', 'спален', exp);
    }
    else if (label === 'кровати') {
        const exp = /\d+\sкроват[а-яё]+/;
        changeLabelWordForm(field, total, 'кровать', 'кровати', 'кроватей', exp);
    }
    else {
        const exp = /\d+\sванн[а-яё]{2}\sкомнат[а-яё]?/;
        changeLabelWordForm(field, total, 'ванная комната', 'ванные комнаты', 'ванных комнат', exp);
    }
}

function changeLabelWordForm(field, total, form1, form2, form3, exp) {
    // SEE WHETHER TEXT IS DEFAULT
    function defaultText(text) {
        return text.startsWith('Сколько');
    }
    // TEXT OF THE LABEL
    const fieldText = field.textContent;
    // IF COUNT ENDS WITH 1
    if (total % 10 === 1 && total !== 11) {
        if (defaultText(fieldText)) {
            field.textContent = `${total} ${form1}`;
        }
        else {
            if (fieldText.match(exp) === null) {
                field.textContent += `, ${total} ${form1}`;
            }
            else {
                field.textContent = field.textContent.replace(exp, `${total} ${form1}`);
            }
        }
    }
    // IF COUNT ENDS WITH 2,3,4 AND LESS THAN 10 OR 20, APPLY FORM 2
    else if ((total % 10 === 2 || total % 10 === 3 || total % 10 === 4) && (total < 10 || total >20)) {
        if (fieldText.match(exp) === null) {
            field.textContent += `, ${total} ${form2}`;
        }
        else {
        field.textContent = field.textContent.replace(exp, `{total} ${form2}`);
        }
    }
    // IF COUNT STARTS WITH 0
    else if (total === 0) {
        // IF LABEL IS NOT EMPTY
        if (field.textContent.length > `, ${total} ${form1}`.length) {
            // IF THERE IS A COMMA, REPLACE REMAINDER WITH NOTHING
            if (fieldText.match(new RegExp((exp.toString().slice(1, -1) + ',')))) {
                let nu_exp = new RegExp((exp.toString().slice(1, -1) + ','));
                field.textContent = field.textContent.replace(nu_exp, '');
            }
            // IF THERE IS NO COMMA
            else {
                let nu_exp = new RegExp((',\\s'+exp.toString().slice(1, -1)))
                field.textContent = field.textContent.replace(nu_exp, '');
            }
        }
        // IF LABEL IS EMPTY
        else {
            field.textContent = 'Сколько спален, кроватей';
        }
    }
    else {
        if (fieldText.match(exp) === null) {
            field.textContent += `, ${total} ${form3}`;
        }
        else {
            field.textContent = field.textContent.replace(exp, `${total} ${form3}`);
        }
    }
}