---
layout: post
title: "Embedded Gallery with Google Photos"
googlePhotoUrl: true
img: https://lh3.googleusercontent.com/KMtTwPRVecxXFBanG4Xjvla3koLnRurBIuTSMOEmf0Is0WL_b6OFXR0vGs8McJXZ2j_ddxdhOxzJ9p5m36BvVkZaXxl4Bmqk7kUqqQapILqZ9yaGRKQl0eFXGRNt1dIF1617Lymsug
date: 2018-10-08 12:53:00 +0300
description: No-local-storage
tag: [Projects]
categories: Projects
---

I decided to use GitHub pages for a personal blog, but I encountered a major issue. I wanted to host my with a nice gallery, but Git isn't the best place for large files.

Especially my travel photos, which are pretty numerous and I'd like them to be high quality. I love Google Photos and use it all the time, and I remebered hearing about [something interesting](https://www.theverge.com/2015/6/23/8830977/google-photos-security-public-url-privacy-protected) a while back. Thier photo URLs are public, if shared.

So I could create an album, share it, and pull out the photo URLs. Easy right? No re-uploads to Git ect...

This turned out to be not as simple as I thought at first. I needed to scrape the URLs before I pushed my project to Github because I didn't want to write my own Jekyll plugin to do this. I don't know Ruby well, and wanted a simple way to solve this problem. So I turned to using Node.js along with PhantomJS to pull the images from the shared URL.

I'd search through all of my posts, looking for a custom tag containing a Photos URL. At first, I tried to use Phantom's DOM manipulation to grab each image but this turned out to give inconsistant results. The way the page was loaded, not every image in an album would appear.  



<!–autogenned--album--https://photos.google.com/share/AF1QipMBWCNKFSw2sRyIIg2u98PgEnWdtQ3q2CecXaDZs1nBLf4-udwGlztFjGWo4U-2ww?key=MFlJVDhPbGx0c0RNY1BBUTFPZU9vLWp4OUlVN2VR--album--generated-><a data-fancybox="gallery" href="https://lh3.googleusercontent.com/KMtTwPRVecxXFBanG4Xjvla3koLnRurBIuTSMOEmf0Is0WL_b6OFXR0vGs8McJXZ2j_ddxdhOxzJ9p 5m36BvVkZaXxl4Bmqk7kUqqQapILqZ9yaGRKQl0eFXGRNt1dIF1617Lymsug"><img src="https://lh3.googleusercontent.com/KMtTwPRVecxXFBanG4Xjvla3koLnRurBIuTSMOEmf0Is0WL_b6OFXR0vGs8McJXZ2j_ddxdhOxzJ9p5m36BvVkZaXxl4Bmqk7kUqqQapILqZ9yaGRKQl0eFXGRNt1dIF1617Lymsug=w200-h200"></a>
<a data-fancybox="gallery" href="https://lh3.googleusercontent.com/OFtgdTI6_ADFK9mI_UOMfwaAWdkhjIfq_9NE6H7y51io4XsS3r0ciPSBDEU0tA-dZcRbW8yxmTmR5Xb9-lwZXTjSPILMvRG35Az39bKof3kK5BXeqwcI_TqGt3iCgZh6sMhxF0yCGw"><img src="https://lh3.googleusercontent.com/OFtgdTI6_ADFK9mI_UOMfwaAWdkhjIfq_9NE6H7y51io4XsS3r0ciPSBDEU0tA-dZcRbW8yxmTmR5Xb9-lwZXTjSPILMvRG35Az39bKof3kK5BXeqwcI_TqGt3iCgZh6sMhxF0yCGw=w200-h200"></a>
<a data-fancybox="gallery" href="https://lh3.googleusercontent.com/I9IoLHjNvPbJs8FtKJiSyLOCft1Hzk33eZmWXQzIapRm51EBmfbBI86LL3uSXrQI1qnAX3n1tc8pulX3RR5AIkY-7ZuXSYkomZCVQ1yA-cAKS4ophThESLkl86QCgJIcFt9kYtsAlg"><img src="https://lh3.googleusercontent.com/I9IoLHjNvPbJs8FtKJiSyLOCft1Hzk33eZmWXQzIapRm51EBmfbBI86LL3uSXrQI1qnAX3n1tc8pulX3RR5AIkY-7ZuXSYkomZCVQ1yA-cAKS4ophThESLkl86QCgJIcFt9kYtsAlg=w200-h200"></a>
<a data-fancybox="gallery" href="https://lh3.googleusercontent.com/eoh8q1XNFBJZVJxqqi8CHimhPg-TNbc9DCt0y6FN4Ohl8SZnkZU2zSoD0UhhrpGl4SF9auwAhW8BF5sIxoMBqmImpJZIN4sceA6QpPGnEtn9T3i2W7nm0i-pczw7VHBIGYAbe09t-Q"><img src="https://lh3.googleusercontent.com/eoh8q1XNFBJZVJxqqi8CHimhPg-TNbc9DCt0y6FN4Ohl8SZnkZU2zSoD0UhhrpGl4SF9auwAhW8BF5sIxoMBqmImpJZIN4sceA6QpPGnEtn9T3i2W7nm0i-pczw7VHBIGYAbe09t-Q=w200-h200"></a>
<a data-fancybox="gallery" href="https://lh3.googleusercontent.com/aXCW1xgLJsQUSDwaDaSAwOZYb8r9b58QNPvziWxXoTZc5Z3ohgnH8LQPzwWPQvtPRRV0XwTyxAv0XHxCnqxnVT5WDWpBOWSQNAlDSCNdu3wSzOiEmclGQJ9s_9Zq6zjrFKyz8Zf3oA"><img src="https://lh3.googleusercontent.com/aXCW1xgLJsQUSDwaDaSAwOZYb8r9b58QNPvziWxXoTZc5Z3ohgnH8LQPzwWPQvtPRRV0XwTyxAv0XHxCnqxnVT5WDWpBOWSQNAlDSCNdu3wSzOiEmclGQJ9s_9Zq6zjrFKyz8Zf3oA=w200-h200"></a>
