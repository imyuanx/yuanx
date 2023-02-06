# React-Native 开发 iOS 小组件指南

## 前言

关于 React-Native 开发 iOS 小组件（Widgets）的资料少之又少，这对于不太熟悉 iOS 原生开发的前端开发工程师来说是一个挑战，在我经过摸索和实践之后整理出了这篇文章，文章阐述了 RN 开发 iOS 小组件的流程以及我如何解决开发过程中遇到的问题。

在文章开始之前，我假设你已经了解 RN 基础知识，如果你有 RN 实际开发经验 / Expo 基础知识 / Swift 基础知识更佳。

## 思路整理

到目前为止我还没有发现可以通过 JS 编写 iOS 小组件的技术，所以我将在 RN 的原生项目中使用 Swift 编写小组件并实现与 RN 通讯。

## 结合 Expo 开发

> 如果你不使用 Expo 那么可以跳过这一部分

假设你现在有一个 Expo 项目，但由于我们需要编写原生代码，所以我们需要使用[Bare Workflow](https://docs.expo.dev/bare/hello-world/)生成原生项目

Bare Workflow 相关文档：

- [Expo hello-world](https://docs.expo.dev/bare/hello-world/)
- [Expo workflow](https://docs.expo.dev/workflow/expo-cli/#compiling)

运行以下命令，生成原生项目

```bash
$ npx expo run:ios
```

生成的原生项目在`你的项目/ios` 文件夹中，接来下我们就可以在原生项目的基础上开发小组件了。

## iOS Widget 开发

### 创建 Widget Extension

使用 Xcode 打开 RN 的 iOS 原生项目，一般在`你的项目/ios` 文件夹中。然后点击状态栏中的`File` → `New` → `Target` → `iOS` → `Widget Extension` → `Next` → `输入小组件的名称` → `完成`

这时我们就得到了一个最基础的小组件。

<img src="/create-ios-widgets-with-rn-1.jpg" style="max-width: 100%" />

我们可以修改小组件的唯一标识符`kind`、名称、描述、尺寸。

<img src="/create-ios-widgets-with-rn-2.jpg" style="max-width: 100%" />

其中名称和描述会在添加小组件时展示

<img src="/create-ios-widgets-with-rn-3.jpg" style="max-width: 100%" />

如果`supportedFamilies`没有设置的话默认为所有尺寸各一个。

### 与主程序通讯

小组件最常见的功能就是展示主程序中的数据，这时候我们需要打通主程序和小组件的桥梁使它们之间可以共享数据。

在 iOS 中小组件需要单独配置证书、有独立的`Bundle Identifier`，因为小组件其实是一个单独项目，所以我们无法直接和主程序交互。

#### App Groups

> iOS 提供了`App Groups`可以实现跨进程通讯，但要求相互通讯的项目必须是同一个开发者账号下的。

我们可以通过主程序往`App Groups`中存储数据，在小组件中读取`App Groups`的数据实现数据共享。

#### 具体步骤

首先我们创建一个`App Groups`

<img src="/create-ios-widgets-with-rn-4.jpg" style="max-width: 100%" />

添加完成后为小组件勾选上`App Groups`

<img src="/create-ios-widgets-with-rn-5.jpg" style="max-width: 100%" />

此时当我们在主程序中为刚刚创建的`App Groups`储存数据后，在小组件中就可以读取到主程序存入的数据。

在主程序中，我们可以这样为`App Groups`存入一个键值对

<img src="/create-ios-widgets-with-rn-6.jpg" style="max-width: 100%" />

起初我想通过 RN 调用原生项目中的函数（也就是图中写的那个函数）为`App Groups`存入数据，但是我们还需要将这个原生方法暴露给 RN 去掉用，手动处理的过程比较麻烦。
[react-native-shared-group-preferences](https://github.com/KjellConnelly/react-native-shared-group-preferences)这个库可以直接通过 JS 操作`App Groups`，为我们节省了上述步骤。

那么我们在 JS 中的代码就应该是这样的：

```javascript
import SharedGroupPreferences from 'react-native-shared-group-preferences';
const APP_GROUP_IDENTIFIER = 'group.me.yuanx.widgets';

/**
 * @desc 设置 Shared Storage 中的值
 * @param {Object} data 你想存入的数据，类型为对象，方法内部会自动转为 JSON 字符串
 */
const saveUserDataToSharedStorage = async (data) => {
  try {
    await SharedGroupPreferences.setItem(
      '自定义的key',
      data,
      APP_GROUP_IDENTIFIER,
    );
  } catch (errorCode) {
    // errorCode 0 = There is no suite with that name
    console.log(errorCode);
  }
};
```

在小组件中我们只需要根据写入的`key`去`App Groups`中读取对应的`value`即可

<img src="/create-ios-widgets-with-rn-7.jpg" style="max-width: 100%" />

### 刷新小组件

小组件并不是实时更新的，它有一套`Timeline`机制，在这里我们不再讨论它的`Timeline`机制。

我们可以使用[react-native-widget-center](https://github.com/Taylor123/react-native-widget-center)这个库通过`kind`进行主动刷新小组件从而达到精细控制刷新的目的（比如打开应用时、应用被切换至后台时、共享的数据有更新时）。

```javascript
import RNWidgetCenter from 'react-native-widget-center';

// 小组件的 kind
const WIDGETS_KIND = ['RNWidget'];

/**
 * @desc 刷新 Widgets
 */
const refreshWidgets = () => {
  WIDGETS_KIND.map((kind) => {
    RNWidgetCenter.reloadTimelines(kind);
  });
};
```

## 最后

我推荐把所有逻辑放到 JS 中，把所有数据处理好之后再存入`App Groups`中，小组件只负责把获取的数据展示出来，这样可以保证实现功能的前提下写最少的 Swift 代码。
