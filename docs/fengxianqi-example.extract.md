# qiankun-example 项目亮点

> [知乎博客](https://juejin.cn/post/6875462470593904653)、[CSDN](https://blog.csdn.net/a1998321/article/details/108758033)、[github](https://github.com/fengxianqi/qiankun-example)

## 一、communal 公共模块

- 依赖法(作者：fengxianqi)

  ```json
  // communal通过文件地址软连接作为依赖
  "dependencies": {
    "common": "file:../setup/communal",
  }
  // 但是由于common是不经过babel和polyfill的处理的，此依赖需要额外显性指定该模块需要编译
  transpileDependencies: [
    /* string or regex */
    "communal“,
  ]
  ```

- 导入导出法

  ```js
  // 先全部导入到子项目中，再导出供其他模块使用，不必考虑转译；
  // 但需考虑是否使用，貌似导入的全部参与了打包
  export { xx, xx } from "../setup/communal/***";
  ```

- 💥 bash 复制 communal 文件夹

  ```js
  // 原因：第一种方法要配置显式编译；第二种由于文件位于setup，eslint报错
  // 综上: 采用setup统一公共方法封装，开始项目执行`communal.sh`脚本，copy到各个子项目
  // 并在子项目gitignore忽略掉复制过来的communal文件夹
  ```

<br/>

## 二、eslint 修复提示

> 如果使用 vscode，且使用了 eslint 的插件做自动修复，由于项目处于非根目录，eslint 没法生效，所以还需要指定 eslint 的工作目录

```json
{
  "eslint.workingDirectories": [
    "./hs-micro-app",
    "./hs-micro-mgr",
    "./main",
    "./setup"
  ],
  "eslint.enable": true,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": false
  },
  "search.useIgnoreFiles": false,
  "search.exclude": {
    "**/dist": true,
    "**/node_modules": true
  }
}
```
