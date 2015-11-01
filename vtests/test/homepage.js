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
		transparency: 0.95
	}
});

casper.start(url);

casper.viewport(viewport.width, viewport.height);

casper.page.evaluate(function() {
	document.body.bgColor = 'white';
});
casper.wait(1000);
casper.then( function () {
	        	
		phantomcss.screenshot( '#page', 'homepage' );
	} );



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
