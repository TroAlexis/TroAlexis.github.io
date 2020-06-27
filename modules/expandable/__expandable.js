var expandable = document.querySelectorAll('.expandable__button')

// console.log(expandable)
var i

for (i=0; i < expandable.length; i++) {
    expandable[i].addEventListener('click', function () {
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            // setTimeout(function () {
            // }, 400);
            content.style.marginTop = '0'
            content.style.maxHeight = null;
            this.classList.remove('active');
        }
        else {
            content.style.marginTop = '18px'
            content.style.maxHeight = content.scrollHeight + 'px';
            this.classList.add('active');
        }
    })
}