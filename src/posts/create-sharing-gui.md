# Sharing GUI 轻松跨设备共享文件的开源客户端

我日常使用 iPhone + MBP 一般来说两台设备互传文件的话使用隔空投送也就基本够用，并且如果两台设备使用同一个 Apple ID 时还能共享剪辑版就这一点我认为还是非常方便的，但是总有一些时候我需要在 MBP 和 Android / Windows 之间互传文件，虽然这种场景真实存在但它发生的频率比较低，所以每次都抱以“忍忍就好了”的心态使用网盘作为媒介实现互传文件，是的这很麻烦...两台设备上必须都下载客户端软件并且还要浪费掉上传/下载文件所花的时间。

直到前几天我偶然间发现了 [`parvardegr/sharing`](https://github.com/parvardegr/sharing) 这个开源项目，它是一个命令行工具，它会在本地启动一个 Web 服务，在其他设备上通过 Web 页面就可以下载服务中的文件，当然它也支持向服务上传文件，在初步体验之后感觉功能还蛮不错，但我其实并不太喜欢命令行工具，因为它提高了使用门槛，对于非开发用户来说也非常不友好，并且对于不常用的工具我很容易忘掉命令、参数...所以我萌生了为它做一个 GUI 的想法。

由于 [`parvardegr/sharing`](https://github.com/parvardegr/sharing) 起初就不是为客户端设计的有些功能没办法直接用所以我 fork 了一份到 [`imyuanx/sharing`](https://github.com/imyuanx/sharing/commits/main) 并且基于它做了一些优化使其能更好的适配客户端程序，我通过 pkg 将优化过后的项目打包成二进制文件供 GUI 调用，这其中遇到了一些问题比如：pkg 只能打包 CJS 模块等...

前面说到 pkg 只能打包 CJS，所以我检查了下依赖项，好在项目中只用了一个仅支持 ESM 的依赖：[`sindresorhus/clipboardy`](https://github.com/sindresorhus/clipboardy)，原本想直接在 `node_modules` 中 hack 一下，但想到以后维护会很麻烦并且可能发生其他用户下载源代码安装依赖后跑不起来的情况，所以我 fork ([`imyuanx/clipboardy`](https://github.com/imyuanx/clipboardy)) 下来后使用 esbuild 将此依赖编译成 CJS 并且发布到了 npm。

在后续测试分享剪辑版功能时发现原项目 [`parvardegr/sharing`](https://github.com/parvardegr/sharing) 会直接在项目根目录创建临时文件以读取剪辑版内容，但使用 electron 打包后所有资源都会被打包进 `app.asar`，此文件是只读的所以当它创建临时文件时便会抛出错误，所以我在 [`imyuanx/sharing`](https://github.com/imyuanx/sharing/commits/main) 上增加了自定义临时文件目录的功能。

从想法到落地花了 3 天时间，其实写代码的时间并不算很多，时间大多花在了解决那些看起来出人意料的问题上，不过在其中也积攒了一些经验，并且最终产出了有价值的东西。
