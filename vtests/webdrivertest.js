var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'phantomjs' } };
var client = webdriverio.remote(options);
 
client
    .init()
    .url('https://www.google.com/')
    .getTitle().then(function(title) {
        console.log('Title is: ' + title);
    })
    .end();
