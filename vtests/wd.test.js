var assert = require('assert');

// init WebdriverIO
var client = require('webdriverio').remote({desiredCapabilities:{browserName: 'phantomjs'}})
// init WebdriverCSS
require('webdrivercss').init(client);

client
    .init()
    .url('http://webny.dev')
    .webdrivercss('startpage',[
        {
            name: 'header',
            elem: '#header'
        }
    ], function(err, res) {
        assert.ifError(err);
        assert.ok(res.header[0].isWithinMisMatchTolerance);
        assert.ok(res.hero[0].isWithinMisMatchTolerance);
    })
    .end();
