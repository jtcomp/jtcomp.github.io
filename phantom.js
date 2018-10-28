const phantom = require('phantom');
var cheerio = require('cheerio'); 
var fs = require('fs');



readFiles('_posts', function(filename, content) {
  data[filename] = content;
}, function(err) {
  throw err;
});

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      console.log("ERROR : " + err) ;
      return;
    }
    filenames.forEach(function(filename) {
		console.log("FILE:\t" + filename);
		
		var linksToParse = fs.readFileSync(dirname + "/" + filename).toString().split("\n").filter(line => line.startsWith("<!–autogen--album--"));
		
		
		
		linksToParse.forEach(function(linkToParse) {
			var linkURL = linkToParse.replace("<!–autogen--album--", "");
			var linkURL = linkURL.replace("--album--end->", "");
			console.log("PARSE:\t" + linkURL);
			
			scraperParser(linkURL).then(function(resultURLS) {
				console.log(resultURLS); 
				var html = generateFancyBoxHTML (resultURLS,200,200); 
				
				fs.readFile(dirname + "/" + filename, 'utf8', function (err,data) {
				  if (err) {
					return console.log(err);
				  }
				  var result = data.replace(/<!–autogen--album--https:\/\/.+--album--end->/g, 
											
											"<!–autogenned--album--" + linkURL + "--album--end->\n" + html);

				  fs.writeFile(dirname + "/" + filename, result, 'utf8', function (err) {
					 if (err) return console.log(err);
				  });
				});
				
				
			});
		});
    });
  });
}

function generateFancyBoxHTML (photoURLs, thumbnail_w, thumbnail_h) {
	var HTMLString = "";
	
	console.log("START AUTOGENERATED HTML\n");
	
	photoURLs.forEach(function(url) {
		// Generate quick links 
		HTMLString+='<a data-fancybox="gallery" href="';
		HTMLString+=url;
		HTMLString+='"><img src="';	
		HTMLString+=url+"=w"+thumbnail_w+"-h"+thumbnail_h;
		HTMLString+='"></a>\n';
	});
	
	console.log(HTMLString);
	
	console.log("END AUTOGENERATED HTML");
	
	return HTMLString ; 
}

async function scraperParser (linkURL) {
    const instance = await phantom.create();
    const page = await instance.createPage();
	
	var photoURLs = [];
	

    const status = await page.open(linkURL);

    const content = await page.property('content');
	
	const $ = cheerio.load(content);
	
	var linkPattern = /https:\/\/[^=]+/g;
	
	$('.RY3tic').each(function(i, elm) {
		var url = $(this).attr("data-latest-bg") ; 
		var parsedURL = url.match(linkPattern);
		if (parsedURL != null) {
			photoURLs.push(parsedURL[0]);
		} else {
			console.log("RETURNED NO MATCH :\t" + url); 
		}
		
	});
	
    console.log("FOUND " + photoURLs.length + " URLS");

    await instance.exit();
	
	return photoURLs;
}

