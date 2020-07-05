var plusBtnsGuests = document.querySelectorAll('.dropdown--guests .dropdown__plus')
if (plusBtnsGuests) {
    guestsPlusBtnsListener(plusBtnsGuests);
}


var applyBtns = document.querySelectorAll('.dropdown__apply')

for (i = 0; i < applyBtns.length; i++) {
    var applyBtn = applyBtns[i];
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

var clearBtns = document.querySelectorAll('.dropdown__clear')

for (i = 0; i < clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (event) {
        event.preventDefault();
        return false;
    })
    clearBtn.addEventListener('click', function () {
        this.parentElement.previousElementSibling.querySelector('span').textContent = 'Сколько гостей'
    })

}


// HELPER FUNCTIONS
function guestsPlusBtnsListener (buttons) {
    for (i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.addEventListener('click', function () {
            var counter = this.previousElementSibling;
            numb = parseInt(counter.textContent, 10);
            if (counter.previousElementSibling.classList.contains('dropdown__minus--disabled')) {
                counter.previousElementSibling.classList.remove('dropdown__minus--disabled');
            }
            counter.textContent = numb + 1;
        })
    }
}