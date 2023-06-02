# Open Graph Protocol（开放图谱协议）

> 参考资料：[https://ogp.me/](https://ogp.me/)

不知道大家有没有注意过，当一个链接被分享到社交媒体平台上时，平台会展示链接的预览图、标题、副标题等内容（如下图）。

<img class="w-full" src="/open-graph-protocol-1.webp" alt="Open Graph Info" />

那么社交媒体平台是如何获取到他们的预览内容的呢？这就不得不说一说 Open Graph Protocol（开放图谱协议）。

## 什么是 Open Graph Protocol？

> 简称：OG 协议，由 Facebook 在 2010 年公布，用于在社交媒体平台上共享网页内容时指定 [**元数据**](https://developer.mozilla.org/en-US/docs/Glossary/Metadata)。

简单来说，OG 协议通过图文形式直观地展示链接指向网站的信息，以提高链接的曝光度和点击率。其中的图片、标题等信息就是 [元数据 / Metadata](https://developer.mozilla.org/en-US/docs/Glossary/Metadata)。

<img class="w-full invert" src="/open-graph-protocol-2.webp" alt="Work Flow" />

也就是说，如果想要在社交媒体平台上分享自己的网站并展示符合 OG 协议的元数据，首先需要在网站中添加 `meta` 标签，并定义好符合 OG 协议的元数据以供各大社交媒体平台获取。

## 如何给自己的网站添加符合 OG 协议的元数据？

如前所述，OG 协议本质上就是 [Meta 标签](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) 的一种。因此，我们只需在网站中添加 `property=og` 的 meta 标签即可。

```html
<meta property="og:title" content="yuanx" />
<meta property="og:description" content="yuanx's personal website" />
<meta property="og:image" content="https://yuanx.me/api/og" />
```

## OG 协议变种

一些社交媒体平台支持 OG 协议的同时，可能还会支持其他自定义协议。例如，Twitter 公布的 [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started#opengraph)。

```html
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@nytimesbits" />
<meta name="twitter:creator" content="@nickbilton" />
```

## 如何获取其他网站符合 OG 协议的元数据？

前面的流程图中描述了社交媒体平台获取其他网站的 OG 元数据的过程，这里我们来讨论下如何使用代码实现。

### 整体思路

获取目标网站的 HTML -> 解析 HTML -> 匹配 meta 标签 -> 得到数据

### 代码实现

```javascript
// node.js
import * as cheerio from 'cheerio';
import axios from 'axios';

const TARGET_URL = 'https://yuanx.me';

axios
  .get(TARGET_URL)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const ogTitle = $("meta[property='og:title']").attr('content');
    const ogDescription = $('meta[property="og:description"]').attr('content');
    const ogImage = $('meta[property="og:image"]').attr('content');
    console.log('OG Metadata: ', ogTitle, ogDescription, ogImage);
  })
  .catch((error) => {
    console.log('error', error);
  });
```

## 结语

Open Graph Protocol 对于产品营销、SEO 等多方面都有着不错的效果。对于独立开发者或需要进行产品运营、营销的公司来说，Open Graph Protocol 绝对是一个不可忽略的细节。

如果你对 Open Graph Protocol 感兴趣，那么可以查看 [**imyuanx/yuanx**](https://github.com/imyuanx/yuanx) 仓库以更多了解技术细节。

谢谢阅读 ❤️
