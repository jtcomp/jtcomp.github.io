
const cheerio = require('cheerio');

var webdriver = require('selenium-webdriver');

var chromeCapabilities = webdriver.Capabilities.chrome();

// add the desired options
var chromeOptions = {'args': ['--test-type', '--incognito', '--disable-impl-side-painting']};
chromeCapabilities.set('chromeOptions', chromeOptions);


(async function example() {
  try {
	let driver = await new webdriver.Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();
    await driver.get('https://photos.app.goo.gl/jmHuq4vynR1Co4xW6');
    await driver.findElements(webdriver.By.className('RY3tic')).then(function(elementsList) {
		console.log("Found Elements:" + elementsList)
	
		elementsList.forEach( function(element) {
			console.log(element) ; 
		
			 element.getCssValue('background-image').then( function(attribute) {
    			console.log(attribute) ;
			}).catch( function(reason) {
				console.log("ERROR" + reason);
			});
			
		}); 
	
		});
	await driver.quit();
  } finally {
  }
})();


