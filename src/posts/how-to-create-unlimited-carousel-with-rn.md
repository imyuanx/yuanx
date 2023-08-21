# 使用 React Native 创建一个支持动态加载、轻量化、高性能的跑马灯组件

## 起因

由于在项目中需要一个支持无限滚动并且每页都会产生副作用的组件（类似抖音那种无限滑动并且动态加载内容的需求），但常见的跑马灯组件必须在组件初始化时提供所有需要展示的数据，这无法满足动态加载的需求，所以我决定自己开发一个轻量化、高性能、支持动态加载的跑马灯组件。

## 思路

受到 [react-native-reanimated-carousel](https://github.com/dohooo/react-native-reanimated-carousel) 的启发，我尝试使用 3 个固定的容器做无限循环，当滑动到下一页时，队列尾端的容器移动到最前端（如下图所示）。

<img class="w-full invert" src="/how-to-create-unlimited-carousel-with-rn-1.png" alt="move" />

## 实现

#### 手势系统

起初我使用 React Native 的[手势系统](https://reactnative.dev/docs/view#onrespondergrant)来做其中的交互和动画，由于 React Native 底层设计，处理手势操作需要 JS 线程与 UI 线程频繁通讯，同时我们又需要执行一些动态计算、副作用等操作，繁重的任务引起 JS 线程阻塞从而导致动画效果非常卡顿。

为了解决性能上的瓶颈，我决定使用 [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) 来替代 React Native 原生的手势系统，由于 [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) 可以直接访问原生 UI 线程，所以在处理动画时有效的避免了 JS 与 UI 线程通讯产生的开销，当然 [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) 还有一些引擎以及其他方面的优化，这里就不再展开。

#### 计算容器排序位置

由于我们只使用了 3 个容器做无限循环，所以当切换页面时我们必须快速的改变他们在视图中的位置。

<img class="w-full invert" src="/how-to-create-unlimited-carousel-with-rn-2.png" alt="page" />

如上图所示，我们可以通过当前页码和容器的 id 来计算出容器应该在可视页面的左边、中间还是右边。

```javascript
const CARD_NUM = 3;
const CARD_POSITION = [
  [
    [-1, 1, 0],
    [0, -1, 1],
    [1, 0, -1],
  ],
  [
    [-1, 0, 1],
    [0, 1, -1],
    [1, -1, 0],
  ],
];

function getSortIndex(page, id) {
  const index = Math.abs(page) % CARD_NUM;
  if (page > 0) return CARD_POSITION[0][id][index];
  if (page < 0) return CARD_POSITION[1][id][index];
  return [-1, 0, 1][id];
}

const curPage = 0;
const id = 2;
getSortIndex(curPage, id); // 1，id 为 2 的容器在第 0 页时应该在 1 的位置，也就是最右边（对应上图）
```

#### 动画效果

拖动容器时，容器应该跟随手指拖动的 x 轴轨迹，松手时应该让容器自动滑到下一页的位置，其中容器改变排序位置时对用户来说是无感知的所以无需动画，如下图。

<img class="w-full invert" src="/how-to-create-unlimited-carousel-with-rn-3.png" alt="page" />

根据以上需求，我们可以将容器的 x 轴的定位分为有动画和无动画两部分，即 `x = animationOffset + offset`。

其中 `animationOffset` 部分我们需要在 [手势响应和手势释放时](https://github.com/imyuanx/unlimited-carousel/blob/main/components/Carousel/index.js#L75-L99) 计算，`offset` 部分在 [页码切换时](https://github.com/imyuanx/unlimited-carousel/blob/main/components/Carousel/index.js#L109-L114) 计算。

#### 最后

以上是这个项目的关键部分，完整的 Demo 见 [GitHub](https://github.com/imyuanx/unlimited-carousel)。

<video width="260" controls>
  <source src="/how-to-create-unlimited-carousel-with-rn-1.mp4" type="video/mp4">
</video>
