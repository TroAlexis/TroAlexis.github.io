import 'Includes/header/header'
import Header from 'Includes/header/header';

const headers = document.querySelectorAll('.header');
headers.forEach((headerElement) => {
    const header = new Header(headerElement);
});


import 'Scss/headers-footers.scss'