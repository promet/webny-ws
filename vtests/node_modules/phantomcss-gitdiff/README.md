**This is a modified version of PhantomCSS** The modifications overwrite diffed images over original images in the specified screenshots directory so that only diffed images will be pushed to GitHub and reviewed in the GitHub file diff GUI. This plugin alone will not cleanup after itself and will leave images with .diff and .fail extensions in your screenshots folder.  It is meant to be used along with [grunt-phantomcss-gitdiff](https://github.com/dtothefp/grunt-phantomcss-gitdiff) which will run the task, spawn the phantom/casper process, and cleanup leftovers.

PhantomCSS-GitHub-Diff
==========

### What?

PhantomCSS takes screenshots captured by CasperJS and compares them to previously taken images using [Resemble.js](http://huddle.github.com/Resemble.js/) to test for rgb pixel differences. PhantomCSS then overwrites changed images allowing them to be diffed on GitHub.


Screenshot based regression testing can only work when UI is predictable. It's possible to hide mutable UI components with PhantomCSS but it would be better to test static pages or drive the UI with faked data during test runs.

###NOTE: The Casper test file example below is not necessary unless you want to test based upon interactive behavior. If you would only like to diff pages based upon CSS/JS changes the automated test file exists in phantomjs/lib/pageTest.js in the grunt plugin [grunt-phantomcss-gitdiff](https://github.com/dtothefp/grunt-phantomcss-gitdiff).

```javascript
casper.
	start( url ).
	then(function(){
		
		// do something
		casper.click('button#open-dialog');
		
		// Take a screenshot of the UI component
		phantomcss.screenshot('#the-dialog', 'a screenshot of my dialog');

	});
```

From the command line/terminal run

* `casperjs test demo/testsuite.js`

### Download

* `npm install phantomcss-gitdiff`
* `git clone git://github.com/dtothefp/phantomcss-gitdiff.git`

### Getting started, try the demo

* This module is most easily implemented with [grunt-phantomcss-gitdiff](https://github.com/dtothefp/grunt-phantomcss-gitdiff).

### Options and setup

```javascript
phantomcss.init({

	gitDiff: true,
	
	libraryRoot: './modules/PhantomCSS',
	
	screenshotRoot: './screenshots',

	/*
		By default, failure images are put in the './failures' folder. If failedComparisonsRoot is set to false a seperate folder will not be created but failure images can still be found alongside the original and new images.
	*/
	failedComparisonsRoot: './failures',

	/*
		Don't add label to generated failure image
	*/
	addLabelToFailedImage: false,

	/*
		Mismatch tolerance defaults to  0.05%. Increasing this value will decrease test coverage
	*/
	mismatchTolerance: 0.05,

	/*
		Callbacks for your specific integration
	*/
	onFail: function(test){ console.log(test.filename, test.mismatch); },
	
	onPass: function(){ console.log(test.filename); },
	
	/* 
		Called when creating new baseline images
	*/
	onNewImage: function(){ console.log(test.filename); },
	
	onTimeout: function(){ console.log(test.filename); },
	
	onComplete: function(allTests, noOfFails, noOfErrors){
		allTests.forEach(function(test){
			if(test.fail){
				console.log(test.filename, test.mismatch);
			}
		});
	},

	/*
		Change the output screenshot filenames for your specific integration
	*/
	fileNameGetter: function(root,filename){ 
		// globally override output filename
		// files must exist under root
		// and use the .diff convention
		var name = root+'/somewhere/'+filename;
		if(fs.isFile(name+'.png')){
			return name+'.diff.png';
		} else {
			return name+'.png';
		}
	},

	/*
		Output styles for image failure outputs genrated by Resemble.js
	*/
	outputSettings: {
		errorColor: {
			red: 255,
			green: 255,
			blue: 0
		},
		errorType: 'movement',
		transparency: 0.3
	}
});

/*
	Turn off CSS transitions and jQuery animations
*/
phantomcss.turnOffAnimations();
```

### There are different ways to take a screenshot

```javascript
var delay = 10;
var hideElements = 'input[type=file]';
var screenshotName = 'the_dialog'

phantomcss.screenshot( "#CSS .selector", screenshotName);

// phantomcss.screenshot( "#CSS .selector" );
// phantomcss.screenshot( "#CSS .selector", delay, hideElements, screenshotName);

// phantomcss.screenshot({
//   top: 100,
//   left: 100,
//   width: 500,
//   height: 400
// }, screenshotName);
```

### Compare the images when and how you want

```javascript
/*
	String is converted into a Regular expression that matches on full image path
*/
phantomcss.compareAll('exclude.test'); 

// phantomcss.compareMatched('include.test', 'exclude.test');
// phantomcss.compareMatched( new RegExp('include.test'), new RegExp('exclude.test'));

/*
	Compare image diffs generated in this test run only
*/
// phantomcss.compareSession();

/*
	Explicitly define what files you want to compare
*/
// phantomcss.compareExplicit(['/dialog.diff.png', '/header.diff.png']);

/*
	Get a list of image diffs generated in this test run
*/
// phantomcss.getCreatedDiffFiles();

/*
	Compare any two images, and wait for the results to complete
*/
// phantomcss.compareFiles(baseFile, diffFile);
// phantomcss.waitForTests();

```

### Best Practices

##### Name your screenshots!

You can name your screenshot by passing a string to either the second or forth parameter.

```javascript
var delay, hideElementsSelector;

phantomcss.screenshot("#feedback-form", delay, hideElementsSelector, "Responsive Feedback Form");

phantomcss.screenshot("#feedback-form", "Responsive Feedback Form");

```

Perhaps a better way is to use the ‘fileNameGetter’ callback property on the ‘init’ method. This does involve having a bit more structure around your tests.  See: https://github.com/Huddle/PhantomFlow/blob/master/lib/phantomCSSAdaptor.js#L41


##### Full page screenshots are a bad idea

If you try to test too much in one screenshot then you could end up with lots of failing tests every time someone makes a small change.  Say you've set up full-page visual regression tests for your 50 page website, and someone adds 2px padding to the footer - that’s 50 failed tests because of one change.  It's better to test UI components individually; in this example the footer could have its own test.
There is also a technical problem with this approach, the larger the image, the longer it takes to process.  An added pixel padding on the page body will offset everything, at best you'll have a sea of pink in the failed diff, at worse you'll get a TIMEOUT because it took too long to analyse.

##### Scaling visual regression testing with Git

If your using a version control system like Git to store the baseline screenshots the repository size becomes increasingly relevant as your test suite grows.  I'd recommend using a tool like https://github.com/joeyh/git-annex or https://github.com/schacon/git-media to store the images outside of the repo.

### ...You might also be interested in

**[PhantomFlow](https://github.com/Huddle/PhantomFlow)** and **[grunt-phantomflow](https://github.com/Huddle/grunt-testflow)** wrap PhantomCSS and provides an experimental way of describing and visualising user flows through tests with CasperJS. As well as providing a terse readable structure for UI testing, it also produces intriguing graph visualisations that can be used to present PhantomCSS screenshots and failed diffs.  We're actively using it at Huddle and it's changing the way we think about UI for the better.

Also, take a look at [PhantomXHR](http://github.com/Huddle/PhantomXHR) for stubbing and mocking XHR requests. Isolated UI testing IS THE FUTURE!