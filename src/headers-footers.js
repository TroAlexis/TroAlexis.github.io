import Header from 'Includes/header/header';

import 'Scss/headers-footers.scss';

const headers = document.querySelectorAll('.header');
headers.forEach((headerElement) => {
  const header = new Header(headerElement);
});
