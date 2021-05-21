**WEBPACK 配置笔记**

<!-- 静态模块打包器 -->

- 从入口文件中将所有依赖资源 (jQ/lsess/scss... 模块) 引入进来形成 chunk 块，将代码块进行各个处理 (打包过程),将所有文件输出出去形成 bundle(静态资源)

- 五个核心概念

  - 1.Entry

    以那个文件为入口进行打包，分析构建内部依赖图

  - 2.Output

    Webpack 打包后的资源 bundles 输出到哪里去，以及如何命名

  - 3.Loader

    Loader 能够去处理那些非 JS 文件(img/css...)

  - 4.Plugins

    插件用来执行范围更广的任务,从而打包优化和压缩,定义环境变量

  - 5.Mode

    (1) development - 开发模式

    (2) production - 生产模式



    <!-- NPM 指令 -->

