const phantom = require('phantom');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

var verbose = false;

if (argv.help) {
	console.log("======Phantom Scraper Help:======") ;
	
	console.log("Link Structure:\n<!–autogen--album--<link>--album--end->") ;
	
	console.log("Arguments:\nw\t(int)\tprovides for width of thumbnails") ;
	console.log("h\t(int)\tprovides for height of thumbnails") ;
	console.log("max\t(int)\tprovides for maximum size of full images") ;
	
	console.log("=================================") ;
}

if (!argv.w) {
	argv.w = 250;
}

if (!argv.w) {
	argv.w = 250;
}

if (!argv.h) {
	argv.h = 250;
}

if (!argv.max) {
	argv.max = 4000;
}




// Scan through all posts
readFiles('_posts', function(filename, content) {
  data[filename] = content;
}, function(err) {
  throw err;
});

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      console.log("FILE READ ERROR : " + err) ;
      return;
    }
	  
    filenames.forEach(function(filename) {
		logIfVerbose("FILE:\t" + filename);
		
		var linksToParse = fs.readFileSync(dirname + "/" + filename).toString().split("\n").filter(line => line.startsWith("<!–autogen--album--"));
		
		
		
		linksToParse.forEach(function(linkToParse) {
			var linkURL = linkToParse.replace("<!–autogen--album--", "");
			var linkURL = linkURL.replace("--album--end->", "");
			logIfVerbose("PARSE:\t" + linkURL);
			
			scraperParser(linkURL).then(function(resultURLS) {
				var html = generateFancyBoxHTML (resultURLS,200,200); 
				
				fs.readFile(dirname + "/" + filename, 'utf8', function (err,data) {
				  if (err) {
					return console.log(err);
				  }
				 var result = data.replace(/<!–autogen--album--https:\/\/.+--album--end->/g, "{% comment %}<!–autogenned--album--" + linkURL + "--album--end->\n{% endcomment %}\n" + html);

				  fs.writeFile(dirname + "/" + filename, result, 'utf8', function (err) {
					 if (err) return console.log(err);
				  });
				});
				
				
			});
		});
    });
  });
}

// Currently, this generates the simplest fancybox album
function generateFancyBoxHTML (photoURLs, thumbnail_w, thumbnail_h) {
	var HTMLString = "";
	
	logIfVerbose("START AUTOGENERATED HTML\n");
	
	var uniqueURLs = photoURLs.filter(function(item, pos, self) {
    	return self.indexOf(item) == pos;
	});
	
	uniqueURLs.forEach(function(url) {
		// Generate quick links 
		HTMLString+='<a data-fancybox="gallery" href="';
		HTMLString+=url[0]+"=w"+url[1]+"-h"+url[2];
		HTMLString+='"><img src="';	
		HTMLString+=url[0]+"=w"+thumbnail_w+"-h"+thumbnail_h;
		HTMLString+='"></a>\n';
	});
	
	console.log(HTMLString);
	
	logIfVerbose("END AUTOGENERATED HTML");
	
	return HTMLString ; 
}

async function scraperParser (linkURL) {
    const instance = await phantom.create();
    const page = await instance.createPage();
	
	var photoURLs = [];
	

    const status = await page.open(linkURL, function (status) {
    if (status !== 'success') {
        console.log('Unable to load the address!');
        instance.exit();
    } else {
        window.setTimeout(function () {
            
        }, 1000); // Might be too high, but since I'm not scraping too many pages, this is fine for now
    }
	});

    const content = await page.property('content');
	
	var linkPattern = /(https:\/\/lh3\.googleusercontent\.com\/[\w_-]{40,})\",([\d]+),([\d]+)/gm;
	
	var match = linkPattern.exec(content);
	var count = 0;
	var duplicates = 0;
	
	while (match != null) {
	  logIfVerbose("URL:\t" + match[1] + "\tWidth:\t" + match[2]+ "\tHeight:\t" + match[3]);
	  var isDup = false;
	  if (match != null && match.length == 4) {
		  photoURLs.forEach(function(url) {
			  if (url[0] == match[1]) {
				  duplicates++;
				  isDup = true;
			  }
		  });
		  if (!isDup) {
		  photoURLs.push([match[1] , match[2], match[3]]);
		  }
	  }	
	  count++;
	
	  match = linkPattern.exec(content);
	}
	
    logIfVerbose("FOUND " + photoURLs.length + " URLS OUT OF " + count + " IMAGES");

    await instance.exit();
	
	return photoURLs;
}

function logIfVerbose(inputString) {
	if (argv.verbose) {
		console.log(inputString) ;
	}
}

