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