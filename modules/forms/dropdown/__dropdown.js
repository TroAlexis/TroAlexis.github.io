var select = document.querySelector('.dropdown__select')
sibling = select.nextElementSibling

console.log(sibling.style.display)

select.addEventListener('click', function () {
    if (sibling.style.display === '') {
        sibling.style.display = 'flex';
    }
    else {
        sibling.style.display = '';
    }
})