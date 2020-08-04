import {recursiveCounters} from '../dropdown'

var plusBtnsGuests = document.querySelectorAll('.dropdown--guests .dropdown__plus')
if (plusBtnsGuests) {
    guestsPlusBtnsListener(plusBtnsGuests);
}

var minusBtns = document.querySelectorAll('.dropdown--guests .dropdown__minus');

for (let i = 0; i < minusBtns.length; i++) {
    let minusBtn = minusBtns[i];
    minusBtn.addEventListener('click', function () {
        let counter = this.nextElementSibling;
        let numb = parseInt(counter.textContent, 10);
        if (numb < 2) {
            this.classList.add('dropdown__minus--disabled')
        }
        if (numb !== 0) {
            counter.textContent = numb - 1;
        }
    });
}


var applyBtnsGuests = document.querySelectorAll('.dropdown--guests .dropdown__apply')

for (let i = 0; i < applyBtnsGuests.length; i++) {
    var applyBtn = applyBtnsGuests[i];
    applyBtn.addEventListener('click',function (event) {
        event.preventDefault();
        return false;
    })
    applyBtn.addEventListener('click', function () {
        var total = recursiveCounters(this).toString();
        if (total.endsWith('1') && parseInt(total, 10) !== 11) {
            this.parentElement.previousElementSibling.querySelector('span').textContent = total + ' гость';
        }
        else if ((total.endsWith('2') || total.endsWith('3') || total.endsWith('4')) && ((parseInt(total, 10)) < 10 || (parseInt(total, 10) >20))) {
            this.parentElement.previousElementSibling.querySelector('span').textContent = total + ' гостя';
        }
        else {
            this.parentElement.previousElementSibling.querySelector('span').textContent = total + ' гостей';
        }
    })
}

var clearBtnsGuests = document.querySelectorAll('.dropdown--guests .dropdown__clear')

for (let i = 0; i < clearBtnsGuests.length; i++) {
    var clearBtn = clearBtnsGuests[i];
    clearBtn.addEventListener('click', function (event) {
        event.preventDefault();
        return false;
    })
    clearBtn.addEventListener('click', function () {
        this.parentElement.previousElementSibling.querySelector('span').textContent = 'Сколько гостей';
        let counts = this.parentElement.querySelectorAll('.dropdown__count');
        counts.forEach(function (count) {
            count.textContent = '0';
            if (!count.previousElementSibling.classList.contains('dropdown__minus--disabled')) {
                count.previousElementSibling.classList.add('dropdown__minus--disabled');
            }
        });
    })

}


// HELPER FUNCTIONS
function guestsPlusBtnsListener (buttons) {
    for (let i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.addEventListener('click', function () {
            var counter = this.previousElementSibling;
            let numb = parseInt(counter.textContent, 10);
            if (counter.previousElementSibling.classList.contains('dropdown__minus--disabled')) {
                counter.previousElementSibling.classList.remove('dropdown__minus--disabled');
            }
            counter.textContent = numb + 1;
        })
    }
}