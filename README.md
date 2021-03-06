angular CLI 1.6内置了 Angular Universal 服务端渲染。解放webpack配置的痛苦。
## 新建项目
```
ng new angulrUniversal
cd angulrUniversal
```
## 加入Angular Universal
```
ng g universal universal
npm i
```

![](https://user-gold-cdn.xitu.io/2018/2/12/16185aa22f2fb113?w=1078&h=254&f=png&s=84401)
有兴趣的可以研究下改的什么，建议瞅瞅
## 然后修改下package.json的build命令
```
"build": "ng build --prod && ng build --prod --app universal --output-hashing=none",
```
然后打个包
```
npm run build
```
##  安装 Angular 官方提供的 Express 引擎
```
npm i express @nguniversal/express-engine
```
## 建立server端
新建个server.js
```
'use strict';

/* Node 专的 Zone.js */
require('zone.js/dist/zone-node');

const express = require('express');
const ngUniversal = require('@nguniversal/express-engine');

/* 从这里载入ssr之后的bundle */
const appServer = require('./dist-server/main.bundle');

/* 主要的服务器渲染函数 */
function angularRouter(req, res) {

  /* Server-side rendering */
   res.render('index', { req, res });

}

const app = express();

/*处理 HTTP 要求 */
app.get('/', angularRouter);

/* 处理静态文件 */
app.use(express.static(`${__dirname}/dist`));

/* 设定 Angular Express 引擎 */
app.engine('html', ngUniversal.ngExpressEngine({
   bootstrap: appServer.AppServerModuleNgFactory
})); 
app.set('view engine', 'html');
app.set('views', 'dist');

/* 将所有其他 HTTP 请求都转給 angularRouter 处理 */
app.get('*', angularRouter);

/* 监听 Port 4200 */
app.listen(4200, () => {
   console.log(`Listening on http://localhost:4200`); 
});
```
## 启动
```
node server.js
```
打开http://localhost:4200  OK完工