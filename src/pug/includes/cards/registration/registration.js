import Formatter from 'formatter.js-pebble';
const dateInput = new Formatter(document.querySelector('.registration .text-field--masked'), {
    pattern: '{{99}}.{{99}}.{{9999}}',
    persistent: false
})