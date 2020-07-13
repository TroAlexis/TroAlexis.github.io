//REQUIRES FORMATTER.JS


var masked = new Formatter(document.getElementById('birthdate'), {
    'pattern' : '{{99}}.{{99}}.{{9999}}',
    'persistent' : false
})