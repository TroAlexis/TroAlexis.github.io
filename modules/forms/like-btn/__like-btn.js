// CREATE BUTTONS LIST
var likebtns = document.querySelectorAll('.like-btn')

// console.log(likebtns)

for (var i = 0; i < likebtns.length; i++) {
    likebtns[i].addEventListener('click',function (event) {
        event.preventDefault();
        return false;
    })
    likebtns[i].addEventListener('click', function () {
        if (this.classList.contains('active')) {
            this.classList.remove('active')
            let counter = parseInt(this.firstChild.lastChild.textContent, 10)
            this.firstChild.lastChild.textContent = counter - 1;
        }
        else {
            this.classList.add('active');
            let counter = parseInt(this.firstChild.lastChild.textContent, 10)
            this.firstChild.lastChild.textContent = counter + 1;
        }
    })
    console.log(likebtns[i].firstChild.lastChild)
}
