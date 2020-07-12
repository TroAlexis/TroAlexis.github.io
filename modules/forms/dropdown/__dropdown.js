var selects = document.querySelectorAll('.dropdown__select');

var i = 0;

for (i = 0; i < selects.length; i++) {
    var select = selects[i];
    select.addEventListener('click', function () {
        let content = (this.nextElementSibling.classList.contains('dropdown__content')) ? this.nextElementSibling : this.nextElementSibling.nextElementSibling;
        // if closed
        if (content.style.display === '') {
            content.style.display = 'flex';
        }
        // if open
        else {
            if (this.className === 'dropdown__select') {
                content.style.display = '';
            }
        }
    });
}

document.documentElement.addEventListener('click', function (e) {
    var selects = document.querySelectorAll('.dropdown__select');
    var i = 0;

    for (i = 0; i < selects.length; i++) {
        var select = selects[i];
        var content = (select.nextElementSibling.classList.contains('dropdown__content')) ? select.nextElementSibling : select.nextElementSibling.nextElementSibling;
        if (!e.target.closest('.dropdown')) {
            content.style.display = '';
            content.classList.remove('arrival', 'depart')
            select.classList.remove('active');
        }
    }
})

var plusBtnsRooms = document.querySelectorAll('.dropdown--rooms .dropdown__plus');
if (plusBtnsRooms) {
    roomsPlusBtnsListener(plusBtnsRooms);
}


var minusBtns = document.querySelectorAll('.dropdown--rooms .dropdown__minus');

for (i = 0; i < minusBtns.length; i++) {
    var minusBtn = minusBtns[i];
    minusBtn.addEventListener('click', function () {
        var counter = this.nextElementSibling;
        numb = parseInt(counter.textContent, 10);
        if (numb < 2) {
            this.classList.add('dropdown__minus--disabled')
        }
        if (numb !== 0) {
            counter.textContent = numb - 1;
            let total = counter.textContent;
            let label = this.previousElementSibling.textContent;
            if (label === 'спальни') {
                var exp = /\d+\sспал[а-яё]+/
                wordforms(this, total, 'спальня', 'спальни', 'спален', exp)
            }
            else if (label === 'кровати') {
                var exp = /\d+\sкроват[а-яё]+/
                wordforms(this, total, 'кровать', 'кровати', 'кроватей', exp)
            }
            else {
                var exp = /\d+\sванн[а-яё]{2}\sкомнат[а-яё]?/;
                wordforms(this, total, 'ванная комната', 'ванные комнаты', 'ванных комнат', exp);
            }
        }
    })
}

// HELPER FUNCTIONS
function recursiveCounters(object) {
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

function wordforms(button, total, form1, form2, form3, exp) {
    function defaultText(text) {
        return text.startsWith('Сколько');
    }
    let txt = button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent;
    console.log(txt)
    if (total.endsWith('1') && parseInt(total, 10) !== 11) {
        if (defaultText(txt)) {
            button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent = total + ' ' + form1;
        }
        else {
            if (txt.match(exp) === null) {
                button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent += ', ' + total + ' ' + form1;
            }
            else {
                button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent = button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent.replace(exp, total + ' ' + form1);
            }
        }
    }
    else if ((total.endsWith('2') || total.endsWith('3') || total.endsWith('4')) && ((parseInt(total, 10)) < 10 || (parseInt(total, 10) >20))) {
        if (txt.match(exp) === null) {
            button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent += ', ' + total + ' ' + form2;
        }
        else {
        button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent = button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent.replace(exp, total + ' ' + form2);
        }
    }
    else if (total.startsWith('0')) {
        if (button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent.length > (', ' + total + ' ' + form1).length) {
            if (txt.match(new RegExp((exp.toString().slice(1, -1) + ',')))) {
                let nu_exp = new RegExp((exp.toString().slice(1, -1) + ','));
                button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent = button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent.replace(nu_exp, '');
            }
            else {
                let nu_exp = new RegExp((',\\s'+exp.toString().slice(1, -1)))
                button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent = button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent.replace(nu_exp, '');
            }
        }
        else {
            button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent = 'Сколько спален, кроватей';
        }
    }
    else {
        if (txt.match(exp) === null) {
            button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent += ', ' + total + ' ' + form3;
        }
        else {
            button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent = button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent.replace(exp, total + ' ' + form3);
        }
    }
}

function roomsPlusBtnsListener (buttons) {
    for (i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.addEventListener('click', function () {
            var counter = this.previousElementSibling;
            var label = this.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            numb = parseInt(counter.textContent, 10);
            if (counter.previousElementSibling.classList.contains('dropdown__minus--disabled')) {
                counter.previousElementSibling.classList.remove('dropdown__minus--disabled');
            }
            counter.textContent = numb + 1;
            total = counter.textContent;
            if (label === 'спальни') {
                var exp = /\d+\sспал[а-яё]+/
                wordforms(this, total, 'спальня', 'спальни', 'спален', exp)
            }
            else if (label === 'кровати') {
                var exp = /\d+\sкроват[а-яё]+/
                wordforms(this, total, 'кровать', 'кровати', 'кроватей', exp)
            }
            else {
                var exp = /\d+\sванн[а-яё]{2}\sкомнат[а-яё]?/;
                wordforms(this, total, 'ванная комната', 'ванные комнаты', 'ванных комнат', exp);
            }
        })
    }
}