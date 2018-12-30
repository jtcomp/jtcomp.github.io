---
layout: post
title: "Embedded Galleries"
googlePhotoUrl: true
img: https://lh3.googleusercontent.com/H8YFPvv-1FVlQcEXvxQLcS60C8ZY-9X7XA3-TG7s5yGKtGMY9PrmzRqO67R7xe8tF8K95O03HWBhywPyOZeG3Gw2y1AnGu1NJI8PfT19umaHmCvwbSUs_mvRSx6E40Qbd0COmTS_0A=w3888-h2592
img-small: https://lh3.googleusercontent.com/H8YFPvv-1FVlQcEXvxQLcS60C8ZY-9X7XA3-TG7s5yGKtGMY9PrmzRqO67R7xe8tF8K95O03HWBhywPyOZeG3Gw2y1AnGu1NJI8PfT19umaHmCvwbSUs_mvRSx6E40Qbd0COmTS_0A
date: 2018-10-08 12:53:00 +0300
description: No-local-storage
tag: [Projects]
categories: Projects
---

I decided to use GitHub pages for a personal blog, but I encountered a major issue. I wanted to host my photos in a nice gallery, but Git isn't the best place for large files.

I'd especially appreciate this for my travel photos, which are pretty numerous. I love Google Photos and use it all the time. I remebered hearing about [something interesting](https://www.theverge.com/2015/6/23/8830977/google-photos-security-public-url-privacy-protected) a while back. All of the image URLs are technically publically accessible.

So I could create an album, share it, and pull out the photo URLs. Easy right? No re-uploads to Git ect...

This turned out to be not as simple as I thought at first. I needed to scrape the URLs before I pushed my project to Github because I didn't want to write my own Jekyll plugin to do this. I don't know Ruby well, and wanted a simple way to solve this problem. So I turned to using Node.js along with PhantomJS to pull the images from the shared URL.

The scraper searched through all of my posts, looking for a custom tag containing a Photos URL, shown below. 

```

<!–autogen--album--<link>--album--end->

```

At first, I tried to use Phantom's DOM manipulation to grab each image but this turned out to give inconsistant results. Eventually, I found a better way. This turned out be using simple regex to scrap the javascript at the bottom of the page.

```

var linkPattern = 
/(https:\/\/lh3\.googleusercontent\.com\/[\w_-]
{40,})\",([\d]+),([\d]+)/gm;

```

There turned out to potentially be duplicate links, so after removing those, my scraper was ready to generate my galleries! I turned to [fancybox](http://fancyapps.com/fancybox/3/) to create my lightbox because of its simplicity. The full Node.js scraper can be found [here](https://github.com/jtcomp/jtcomp.github.io/blob/master/phantomScraper.js).

Eventually, I might build out a Jekyll plugin for this, but for now I'll just run my simple scraper before I push a new post. If Google consistantly changes the structure of their Photos pages or their URLs, then this system will not be as useful.

I've just got a simple example below.

{% comment %}<!–autogenned--album--https://photos.google.com/share/AF1QipMBWCNKFSw2sRyIIg2u98PgEnWdtQ3q2CecXaDZs1nBLf4-udwGlztFjGWo4U-2ww?key=MFlJVDhPbGx0c0RNY1BBUTFPZU9vLWp4OUlVN2VR--album--end->
{% endcomment %}
<a data-fancybox="gallery" href="https://lh3.googleusercontent.com/H8YFPvv-1FVlQcEXvxQLcS60C8ZY-9X7XA3-TG7s5yGKtGMY9PrmzRqO67R7xe8tF8K95O03HWBhywPyOZeG3Gw2y1AnGu1NJI8PfT19umaHmCvwbSUs_mvRSx6E40Qbd0COmTS_0A=w3888-h2592"><img src="https://lh3.googleusercontent.com/H8YFPvv-1FVlQcEXvxQLcS60C8ZY-9X7XA3-TG7s5yGKtGMY9PrmzRqO67R7xe8tF8K95O03HWBhywPyOZeG3Gw2y1AnGu1NJI8PfT19umaHmCvwbSUs_mvRSx6E40Qbd0COmTS_0A=w200-h200"></a>
<a data-fancybox="gallery" href="https://lh3.googleusercontent.com/KMtTwPRVecxXFBanG4Xjvla3koLnRurBIuTSMOEmf0Is0WL_b6OFXR0vGs8McJXZ2j_ddxdhOxzJ9p5m36BvVkZaXxl4Bmqk7kUqqQapILqZ9yaGRKQl0eFXGRNt1dIF1617Lymsug=w400-h400"><img src="https://lh3.googleusercontent.com/KMtTwPRVecxXFBanG4Xjvla3koLnRurBIuTSMOEmf0Is0WL_b6OFXR0vGs8McJXZ2j_ddxdhOxzJ9p5m36BvVkZaXxl4Bmqk7kUqqQapILqZ9yaGRKQl0eFXGRNt1dIF1617Lymsug=w200-h200"></a>
<a data-fancybox="gallery" href="https://lh3.googleusercontent.com/OFtgdTI6_ADFK9mI_UOMfwaAWdkhjIfq_9NE6H7y51io4XsS3r0ciPSBDEU0tA-dZcRbW8yxmTmR5Xb9-lwZXTjSPILMvRG35Az39bKof3kK5BXeqwcI_TqGt3iCgZh6sMhxF0yCGw=w400-h400"><img src="https://lh3.googleusercontent.com/OFtgdTI6_ADFK9mI_UOMfwaAWdkhjIfq_9NE6H7y51io4XsS3r0ciPSBDEU0tA-dZcRbW8yxmTmR5Xb9-lwZXTjSPILMvRG35Az39bKof3kK5BXeqwcI_TqGt3iCgZh6sMhxF0yCGw=w200-h200"></a>
<a data-fancybox="gallery" href="https://lh3.googleusercontent.com/I9IoLHjNvPbJs8FtKJiSyLOCft1Hzk33eZmWXQzIapRm51EBmfbBI86LL3uSXrQI1qnAX3n1tc8pulX3RR5AIkY-7ZuXSYkomZCVQ1yA-cAKS4ophThESLkl86QCgJIcFt9kYtsAlg=w800-h800"><img src="https://lh3.googleusercontent.com/I9IoLHjNvPbJs8FtKJiSyLOCft1Hzk33eZmWXQzIapRm51EBmfbBI86LL3uSXrQI1qnAX3n1tc8pulX3RR5AIkY-7ZuXSYkomZCVQ1yA-cAKS4ophThESLkl86QCgJIcFt9kYtsAlg=w200-h200"></a>
<a data-fancybox="gallery" href="https://lh3.googleusercontent.com/eoh8q1XNFBJZVJxqqi8CHimhPg-TNbc9DCt0y6FN4Ohl8SZnkZU2zSoD0UhhrpGl4SF9auwAhW8BF5sIxoMBqmImpJZIN4sceA6QpPGnEtn9T3i2W7nm0i-pczw7VHBIGYAbe09t-Q=w800-h400"><img src="https://lh3.googleusercontent.com/eoh8q1XNFBJZVJxqqi8CHimhPg-TNbc9DCt0y6FN4Ohl8SZnkZU2zSoD0UhhrpGl4SF9auwAhW8BF5sIxoMBqmImpJZIN4sceA6QpPGnEtn9T3i2W7nm0i-pczw7VHBIGYAbe09t-Q=w200-h200"></a>
<a data-fancybox="gallery" href="https://lh3.googleusercontent.com/aXCW1xgLJsQUSDwaDaSAwOZYb8r9b58QNPvziWxXoTZc5Z3ohgnH8LQPzwWPQvtPRRV0XwTyxAv0XHxCnqxnVT5WDWpBOWSQNAlDSCNdu3wSzOiEmclGQJ9s_9Zq6zjrFKyz8Zf3oA=w200-h100"><img src="https://lh3.googleusercontent.com/aXCW1xgLJsQUSDwaDaSAwOZYb8r9b58QNPvziWxXoTZc5Z3ohgnH8LQPzwWPQvtPRRV0XwTyxAv0XHxCnqxnVT5WDWpBOWSQNAlDSCNdu3wSzOiEmclGQJ9s_9Zq6zjrFKyz8Zf3oA=w200-h200"></a>
