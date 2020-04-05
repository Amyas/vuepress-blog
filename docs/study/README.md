# 待学习记录

## JavaScript

### 原生
[JavaScript深入系列、JavaScript专题系列、ES6系列](https://github.com/mqyqingfeng/Blog)
> 冴羽大佬的这篇博客里，除了undescore的部分，你需要全部都能掌握。并且灵活的运用到开发中去。

### Promise

* 你需要阅读Promise A+规范，注意其中的细节，并且灵活的运用到开发当中去。


* 你需要跟着精品教程手写一遍Promise，对里面的细节深入思考，并且把其中异步等待、错误处理等等细节融会贯通到你的开发思想里去。
[剖析Promise内部结构，一步一步实现一个完整的、能通过所有Test case的Promise类](https://github.com/xieranmaya/blog/issues/3)

* 最后，对于promise的核心，异步的链式调用，你必须能写出来简化版的代码。
[最简实现Promise，支持异步链式调用（20行）](https://juejin.im/post/5e6f4579f265da576429a907)

### async await

对于Promise我们非常熟悉了，进一步延伸到async await，这是目前开发中非常非常常用的异步处理方式，我们最好是熟悉它的babel编译后的源码。

[手写async await的最简实现（20行搞定）](https://juejin.im/post/5e79e841f265da5726612b6e)

### 异常处理

你必须精通异步场景下的错误处理，这是高级工程师必备的技能，如果开发中的异常被你写的库给吞掉了，那岂不是可笑。

[Callback Promise Generator Async-Await 和异常处理的演进](https://juejin.im/post/589036f8570c3500621a3be2)

### 插件机制

你需要大概理解前端各个库中的插件机制是如何实现的，在你自己开发一些库的时候也能融入自己适合的插件机制。

[Koa的洋葱中间件，Redux的中间件，Axios的拦截器让你迷惑吗？实现一个精简版的就彻底搞懂了。](https://juejin.im/post/5e13ea6a6fb9a0482b297e8e)

### 设计模式

对于一些复杂场景，你的开发不能再是if else嵌套一把梭了，你需要把设计模式好好看一遍，在合适的场景下选择合适的设计模式。这里就推荐掘金小册吧，这个作者的质量我信得过。

[JavaScript 设计模式核⼼原理与应⽤实践](https://juejin.im/book/5c70fc83518825428d7f9dfb)

### 基础算法

掌握一些基础算法核心思想或简单算法问题，比如排序。
> 待添加

### 代码规范

你需要熟读clean-code-javascript，并且深入结合到日常开发中，结合你们小组的场景制定自己的规范。

[clean-code-javascript](https://github.com/beginor/clean-code-javascript)

## 框架

### Vue

* 推荐HcySunYang大佬的Vue逐行分析，需要下载git仓库，切到elegant分支自己本地启动。

[Vue逐行级别的源码分析](https://github.com/HcySunYang/vue-design)

### React

## TypeScript

### 入门

* 除了官方文档以外，还有一些比较好的中文入门教程。

[TypeScript Handbook入门教程](https://zhongsp.gitbooks.io/typescript-handbook/content/)

* 工具泛型在日常开发中都非常的常用，必须熟练掌握。

[TS 一些工具泛型的使用及其实现](https://zhuanlan.zhihu.com/p/40311981)

* 视频课程，还是黄轶大佬的，并且这个课程对于单元测试、前端手写框架、以及网络请求原理都非常有帮助。

[基于TypeScript从零重构axios](https://coding.imooc.com/class/330.html)

### 进阶

* 这五篇文章里借助非常多的案例，为我们讲解了ts的一些高级用法，请务必反复在ide里尝试，理解，不懂的概念及时回到文档中补习。

[巧用 TypeScript系列 一共五篇](https://juejin.im/post/5c8a518ee51d455e4d719e2e)

* TS进阶非常重要的一点，条件类型，很多泛型推导都需要借助它的力量。

[conditional-types-in-typescript](https://mariusschulz.com/blog/conditional-types-in-typescript)


### 实战

* 一个参数简化的实战，涉及到的高级知识点非常多。
  * 🎉TypeScript的高级类型（Advanced Type）
  * 🎉Conditional Types (条件类型)
  * 🎉Distributive conditional types (分布条件类型)
  * 🎉Mapped types（映射类型）
  * 🎉函数重载

[TypeScript 参数简化实战](https://juejin.im/post/5e38dd65518825492b509dd6)

* 实现一个简化版的Vuex，同样知识点结合满满。
  * 🎉TypeScript的高级类型（Advanced Type）
  * 🎉TypeScript中利用泛型进行反向类型推导。(Generics)
  * 🎉Mapped types（映射类型）
  * 🎉Distributive Conditional Types（条件类型分配）
  * 🎉TypeScript中Infer的实战应用（Vue3源码里infer的一个很重要的使用）

[TS实现智能类型推导的简化版Vuex](https://juejin.im/post/5e38dd65518825492b509dd6)

## 代码质量

### 代码风格

在项目中集成Prettier + ESLint + Airbnb Style Guide

[integrating-prettier-eslint-airbnb-style-guide-in-vscode](https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a)

[在项目中集成ESLint with Prettier, TypeScript](https://levelup.gitconnected.com/setting-up-eslint-with-prettier-typescript-and-visual-studio-code-d113bbec9857)

### 高质量架构

如何重构一个过万Star开源项—BetterScroll，是由滴滴的大佬嵇智所带来的，无独有偶的是，这篇文章除了详细的介绍一个合格的开源项目应该做到的代码质量保证，测试流程，持续集成流程以外，也体现了他的一些思考深度，非常值得学习。

[如何重构一个过万Star开源项目—BetterScroll](https://juejin.im/post/%E5%A6%82%E4%BD%95%E9%87%8D%E6%9E%84%E4%B8%80%E4%B8%AA%E8%BF%87%E4%B8%87Star%E5%BC%80%E6%BA%90%E9%A1%B9%E7%9B%AE%E2%80%94BetterScroll)

### Git提交信息

很多新手在提交Git信息的时候会写的很随意，比如fix、test、修复，这么糊弄的话是会被leader揍的！

[如何撰写 Git 提交信息](https://jiongks.name/blog/git-commit)

[Git-Commit-Log规范（Angular 规范）](https://www.jianshu.com/p/c7e40dab5b05)

[commitizen规范流程的commit工具，规范的commit格式也会让工具帮你生成友好的changelog](https://www.npmjs.com/package/commitizen)

## 构建工具

## 性能优化

## 动画

### svn

* snap.svg

### canvas