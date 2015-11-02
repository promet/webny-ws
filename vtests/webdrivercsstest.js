var assert = require('assert');


// Configure webdriverio
//var client = require('webdriverio').remote({
//  desiredCapabilities: {
//    'browserstack.debug': 'true',
//    'browserstack.local': 'true',
//    os: 'Windows',
//    os_version: '7',
//    browser: 'ie',
//    browser_version: '9.0'
//  },
//  host: 'hub.browserstack.com',
//  port: 80,
//  user: 'lisaridley2',
//  key: 'dxanypx86p3GWszYXqpW'
//});


// init WebdriverIO
var client = require('webdriverio').remote({desiredCapabilities:{browserName: 'phantomjs'}})
// init WebdriverCSS
require('webdrivercss').init(client, {
  screenWidth: [320,480,768,960,1280]
  //screenWidth: [1024]
});

client
    .init()
    .url('http://webny.dev')
    .webdrivercss('startpage',[
        {
            name: 'page',
            elem: '#page',
            exclude:  [
              '#views_slideshow_cycle_main_slideshow-block',
              '.node-blog img',
              '.node-submitted-info .node-submitted-date',
              '.node-submitted-info .node-submitted-comments a',
              '.node-submitted-info .submitted .username',
              '.node-blog h2 a',
              '.node-blog .field-name-body .field-item',
              '.node-blog .field-name-field-tags .field-items',
              '.node-blog .blog_usernames_blog a',
              '#block-views-video-block--2 .video-display-id-block',
              '.view-lastest-photos .field-content img',
              '.view-featured-professors .views-field-field-image .field-content img',
              '.view-featured-professors .views-field-title a',
              '.view-featured-professors .views-field-body p'
            ]
        }
    ], function(err, res) {
        assert.ifError(err);
        assert.ok(res.page[0].isWithinMisMatchTolerance);
    })
    .end();

