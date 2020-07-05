var selects = document.querySelectorAll('.dropdown__select');

var i = 0;

for (i = 0; i < selects.length; i++) {
    var select = selects[i];
    select.addEventListener('click', function () {
        var content = this.nextElementSibling;
        if (content.style.display === '') {
            content.style.display = 'flex';
        }
        else {
            content.style.display = '';
        }
    });
}

document.documentElement.addEventListener('click', function (e) {
    // console.log(e.target)
    var selects = document.querySelectorAll('.dropdown__select');
    var i = 0;

    for (i = 0; i < selects.length; i++) {
        var select = selects[i];
        var content = select.nextElementSibling;
        if (!e.target.closest('.dropdown')) {
            content.style.display = '';
        }
    }
})

var plusBtnsRooms = document.querySelectorAll('.dropdown--rooms .dropdown__plus');
if (plusBtnsRooms) {
    roomsPlusBtnsListener(plusBtnsRooms);
}


var minusBtns = document.querySelectorAll('.dropdown__minus');

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
        return text.startsWith('Спальни');
    }
    txt = button.parentElement.parentElement.previousElementSibling.querySelector('span').textContent;
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