const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
  uri: `https://photos.google.com/share/AF1QipMBWCNKFSw2sRyIIg2u98PgEnWdtQ3q2CecXaDZs1nBLf4-udwGlztFjGWo4U-2ww?key=MFlJVDhPbGx0c0RNY1BBUTFPZU9vLWp4OUlVN2VR`,
  resolveWithFullResponse: true,
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
	/*
    console.log("SCRAPED RESULTS");
    console.log($('.cL5NYb').text());
    console.log("Number of Links : " + $(".yKzHyd").length);
    console.log("Number of Images : " + $(".RY3tic").length);
    console.log($('.RY3tic').html());
    console.log($('.yKzHyd').html());*/
    
    console.log($.html());
    
    
    $('div').each(function(i, elem) {
        var backgroundImage = $(elem).attr('data-latest-bg');
        if (backgroundImage != undefined) {
            console.log(backgroundImage);
            console.log("\n\n");
        } 
        
    });
  })
  .catch((err) => {
    console.log(err);
  });



