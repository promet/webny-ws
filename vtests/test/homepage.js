/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/

var phantomcss = require('./../node_modules/phantomcss/phantomcss.js');
var url = 'http://webny.dev';

var viewport = {name : 'tablet-landscape', width: 1024, height: 768}

phantomcss.init({
	screenshotRoot: './screenshots/homepage',
	failedComparisonsRoot: './screenshots/homepage/failures',
	outputSettings: {
		errorColor: {
			red: 255,
			green: 0,
			blue: 0
		},
		errorType: 'movement',
		transparency: 1.0,
		gitDiff: true
	}
});



casper.start(url);

casper.viewport(viewport.width, viewport.height);


casper.page.evaluate(function() {
	document.body.bgColor = 'white';
});

casper.then( function () {
	phantomcss.screenshot( '#page', 'homepage' );
});

casper.then( function() {
        phantomcss.screenshot( '#block-views-video-block--2', 'video-block' );
});

casper.then( function () {
        phantomcss.screenshot( '#main-content', 'main-content' );
});

casper.then( function () {
        phantomcss.screenshot( '#block-views-lastest-photos-block--2', 'latest-photos' );
});

casper.then(function() {

	casper.mouse.move('[data-id="477"]');
	casper.wait(2000, function() {
		phantomcss.screenshot('#page', 'library-menu');
	});
});
// Insert custom test code here



//Do comparison on all base and comparative screenshots
casper.then( function now_check_the_screenshots(){
	// compare screenshots
	phantomcss.compareAll();
});

/*
Casper end tests signal
*/
casper.then( function end_it(){
	casper.test.done();
});

/*
 Casper run tests
*/
casper.run(function(){
	console.log('\nTHE END.');
	//slimer.exit();
	phantom.exit(phantomcss.getExitStatus());
});
