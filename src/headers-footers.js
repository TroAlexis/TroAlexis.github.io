import './pug/includes/header/header'
import Header from "./pug/includes/header/header";

const headers = document.querySelectorAll('.header');
headers.forEach((headerElement) => {
    const header = new Header(headerElement);
});


import './assets/scss/headers-footers.scss'
import header from "./pug/includes/header/header";