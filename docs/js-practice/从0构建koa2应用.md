# 从 0 构建 Koa 应用

## 初始化项目

基于 koa-generator 创建项目

```bash
npm install koa-generator -g
```

创建 koa2 项目

```bash
koa2 amyas-mal-server
```

安装依赖

```bash
npm install
```

启动项目

```bash
npm run dev
```

访问 http://localhost:3000/ 看到 **Hello Koa 2!** 部署成功

## 配置环境变量

```bash
npm instal cross-env --save
```

```json
"scripts": {
    "start": "cross-env NODE_ENV=production node bin/www",
    "dev": "cross-env NODE_ENV=development ./node_modules/.bin/nodemon bin/www",
    "prd": "cross-env NODE_ENV=production pm2 start bin/www"
}
```

## 配置eslint

安装依赖

``` bash
npm install eslint eslint-config-egg --save-dev
```

配置eslint规则

创建 `.eslintrc` 文件，规则如下：

``` bash
{
  "extends": "eslint-config-egg"
}
```

## 配置logger

安装依赖

``` bash
npm instal log4js --save
```

配置logger

``` js
// lib/logger

'use strict';

const log4js = require('log4js');

const logLayout = {
  type: 'pattern',
  pattern: '%h %x{pid} [%d] [%p] %c > %m',
  tokens: {
    pid() {
      return process.pid;
    },
  },
};

log4js.configure({
  appenders: {
    out: {
      type: 'DateFile',
      filename: 'log.log',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      layout: logLayout,
    },
  },
  categories: {
    default: {
      appenders: [ 'out' ],
      level: 'info',
    },
  },
});

// logger.info('msg');
// logger.warn('msg');
// logger.error('msg');
// logger.fatal('msg');
exports.logger = moduleName => {
  const l = log4js.getLogger(moduleName);
  return l;
};
```

引入logger

``` js
// app.js
const logger = require('./lib/logger').logger('app');

try {
  app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
} catch (error) {
  logger.error('start server failed =>', error);
}
```

::: tip 提示

删除koa-logger相关依赖

gitigonre 添加 *.log
:::

访问 http://localhost:3000/ 项目根目录出现log.log且存在访问记录就代表成功

## 配置Mongo

安装依赖

``` bash
npm install mongoose --save
```

创建配置文件

``` js
// config/index.js
'use strict';

const common = require('./common');

const env = process.env.NODE_ENV;

const config = require(`./${env}`);

const result = Object.assign({}, common, config);

module.exports = result;
```

``` js
// config/common.js
'use strict';

module.exports = {

};
```

``` js
// config/development.js
'use strict';

module.exports = {
  mongodb: {
    mall: {
      host: '127.0.0.1:27017',
      dbName: 'mall',
      userName: 'wangjianpeng',
      password: '1425qwer',
      authSource: 'admin',
    },
  },
};
```

``` js
// config/production.js
'use strict';

module.exports = {
  mongodb: {
    mall: {
      host: '127.0.0.1:27017',
      dbName: 'mall',
      userName: 'wangjianpeng',
      password: '1425qwer',
      authSource: 'admin',
    },
  },
};
```

创建mongo配置

``` js
// lib/mongoose.js
'use strict';

const mongoose = require('mongoose');
const config = require('../config');
const logger = require('./logger').logger('mongoose');

const dbs = {};
const mongodbConfig = config.mongodb;

for (const clientName in mongodbConfig) {
  const currentClient = mongodbConfig[clientName];
  const {
    host,
    dbName,
    userName,
    password,
    authSource,
    replicaSet,
  } = currentClient;

  let connectionURL = 'mongodb://';

  if (userName && password) {
    connectionURL += `${userName}:${password}@`;
  }

  connectionURL += `${host}/${dbName}?`;

  if (replicaSet) {
    connectionURL += `replicaSet=${replicaSet}`;
  }

  if (authSource) {
    connectionURL += `authSource=${authSource}`;
  }

  const db = mongoose.createConnection(connectionURL, {
    poolSize: 10, // 连接池数量
    useNewUrlParser: true, // 解决使用字符串连接url报错
    useFindAndModify: false, // 用于解决findAndModify()弃用警告
    useUnifiedTopology: true, // 解决监视引擎弃用警告
  });
  dbs[clientName] = db;

  db.on('error', error => logger.error(error))
    .on('close', () => logger.info('Database connection closed.'))
    .once('open', () => logger.info(`DB ${clientName} opend!`));

}

module.exports = dbs;
```

引入mongoose

``` js
// app.js

require('./lib/mongoose');
```

## 配置helpers

请求成功、失败走公用函数，方便修改和定位问题

``` js
// helpers/index.js
'use strict';

exports.success = data => ({
  status: {
    errCode: -1,
    message: 'success',
  },
  data,
});

exports.fail = (errCode, message) => ({
  status: {
    errCode,
    message,
  },
});

exports.filterParams = async (data, filter) => {
  const result = {};
  filter.forEach(v => {
    const val = data[v];
    if (val !== null && val !== undefined && val !== '') {
      result[v] = data[v];
    }
  });
  return result;
};

exports.handleQuery = async query => {
  const newQuery = Object.assign({}, query); // 将对象复制一份，不破坏原数据
  const result = {
    pageNumber: Number(newQuery.pageNumber) || 1, // 页数
    pageSize: Number(newQuery.pageSize) || 20, // 每页个数
    sortBy: newQuery.sortBy || 'createTime', // 排序字段
    orderBy: Number(newQuery.orderBy) || -1, // 1 - 升序， -1 - 降序
  };
  delete newQuery.pageNumber;
  delete newQuery.pageSize;
  delete newQuery.sortBy;
  delete newQuery.orderBy;
  result.filter = newQuery;
  return result;
};
```

引入 helpers

``` js
// app.js
const Helper = require('./helpers');
try {
  app.use(async (ctx, next) => {
    ctx.helper = Helper;
  });
} catch (error) {
  logger.error('start server failed =>', error);
}
```

测试效果

``` js
// routes/index.js
router.get('/', async ctx => {
  ctx.body = ctx.helper.success({
    name: 'Amyas',
  });
});

router.get('/string', async ctx => {
  ctx.body = ctx.helper.fail(10001, '错误测试');
});
```

请求成功

![从0构建koa2应用-截屏2020-04-27下午6.54.45](http://cdn-vuepress-blog.amyas.cn/从0构建koa2应用-截屏2020-04-27下午6.54.45.png)

请求失败

![从0构建koa2应用-截屏2020-04-27下午6.54.49](http://cdn-vuepress-blog.amyas.cn/从0构建koa2应用-截屏2020-04-27下午6.54.49.png)

## 配置validator

引入表单校验模块

``` bash
npm install parameter --save
```

实现

``` js
// lib/validate.js
'use strict';

const Parameter = require('parameter');

module.exports = app => {
  const validator = new Parameter();
  app.context.validate = (rules, data) => {
    const errors = validator.validate(rules, data);
    if (errors) {
      const errorsFormat = errors.map(v => {
        return Object.keys(v).map(j => {
          return `${j}:${v[j]}`;
        });
      });
      throw new Error(errorsFormat);
    }
  };
};
```

配置

``` js
const validate = require('./lib/validate');
validate(app);
```

## 配置apidoc

安装依赖

``` bash
npm install apidoc --save-dev
```

配置执行方法

``` json
"scripts": {
  "doc": "apidoc -i controllers/ -o docs/"
},
```

使用方法如下：

``` js
/**
 * @api {GET} /api/user 用户列表
 * @apiGroup user
 * @apiVersion  1.0.0
 * @apiParam  {String} [pageNumber=1] 当前页数
 * @apiParam  {String} [pageSize=20] 每页显示的个数
 */
```

``` js
/**
 * @api {POST} /api/user 创建用户
 * @apiGroup user
 * @apiVersion  1.0.0
 * @apiParam  {String} username 账号
 * @apiParam  {String} password 密码
 * @apiParam  {String} name 名字
 */
```

## 实现报错中间件

安装组装中间件的`koa-compose`

``` bash
npm install koa-compose --save
```

实现中间件

``` js
// middleware/index.js
'use strict';

const compose = require('koa-compose');
const errHandler = require('./errHandler');

module.exports = function() {
  return compose(
    [
      errHandler(),
    ]
  );
};
```

``` js
// middleware/errHandler.js
'use strict';
const helpers = require('../helpers');
const logger = require('../lib/logger').logger('middleware-errHandler');

module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(error);
    ctx.status = error.status || 500;
    ctx.body = helpers.fail(error.message);
  }
};
```

配置中间件

``` js
// app.js
const middleware = require('./middleware');
try {
  app
    .use(async (ctx, next) => {
      ctx.helper = helper;
      const start = new Date();
      await next();
      const ms = new Date() - start;
      logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
    })
    .use(middleware());
} catch (error) {
  logger.error('start server failed =>', error);
}
```

## 实现增删改查

### 实现路由自动加载

安装依赖

``` bash
npm install require-directory --save
```

实现

``` js
// controllers/index.js
'use strict';

const requireDirectory = require('require-directory');
module.exports = requireDirectory(module);
```

配置router

``` js
// routes/index.js
'use strict';

const router = require('koa-router')({
  prefix: '/api',
});

const $ = require('../controllers');

// 用户
router
  .post('/user', $.user.create);

module.exports = router;
```

### 实现model

``` js
// models/index.js
'use strict';

const requireDirectory = require('require-directory');
module.exports = requireDirectory(module);
```

``` js
// models/user.js
'use strict';

const mongoose = require('mongoose');
const mall = require('../lib/mongoose').mall;

const UserSchema = new mongoose.Schema({
  // 账号
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // 密码
  password: {
    type: String,
    required: true,
  },
  // 昵称
  name: {
    type: String,
    required: true,
  },
  createTime: {
    type: Number,
    default: Date.now,
  },
  updateTime: {
    type: Number,
    default: Date.now,
  },
});

const updateHook = function() {
  if (this.options.overwrite) {
    this._update.updateTime = Date.now();
  } else {
    this._update.$set = this._update.$set || {};
    this._update.$set.updateTime = Date.now();
  }
};

UserSchema.pre('findOneAndUpdate', updateHook);
UserSchema.pre('update', updateHook);

module.exports = mall.model('User', UserSchema);
```

### 增

``` js
// controllers/user.js
'use strict';

const logger = require('../lib/logger').logger('controller-user');

/**
 * @api {POST} /api/user 创建用户
 * @apiGroup user
 * @apiParam  {String} username 账号
 * @apiParam  {String} password 密码
 * @apiParam  {String} name 名字
 */

exports.create = async ctx => {
  const logPrefix = '创建用户';
  const data = ctx.request.body;

  const rules = {
    username: 'string',
    password: 'string',
    name: 'string',
  };

  ctx.validate(rules, data);

  try {
    const user = new ctx.model.user(data);
    await user.save();
  } catch (error) {
    if (error.code === 11000) {
      ctx.body = ctx.helper.fail('用户已存在');
      return;
    }
  }

  ctx.body = ctx.helper.success('创建成功');

  logger.info(logPrefix, data);
};
```

### 删

``` js
// routes/index.js
// 用户
router
  .post('/user', $.user.create)
  .delete('/user/:id', $.user.delete);
```

``` js
/**
 *
 * @api {DELETE} /user/:id 删除用户
 * @apiGroup user
 * @apiParam  {String} id 用户id
 *
 */

exports.delete = async ctx => {
  const logPrefix = '创建用户';

  const id = ctx.params.id;

  const user = await ctx.model.user.remove({ _id: id });

  if (user.n !== 1) {
    ctx.body = ctx.helper.fail('用户不存在');
    return;
  }

  ctx.body = ctx.helper.success('删除成功');

  logger.info(logPrefix, id);
};
```

### 改

``` js
// routes/index.js
router
  .post('/user', $.user.create)
  .delete('/user/:id', $.user.delete)
  .put('/user/:id', $.user.update);
```

``` js
// controllers/user.js
/**
 *
 * @api {PUT} /user/:id 更新用户
 * @apiGroup user
 * @apiParam  {String} [password] 密码
 * @apiParam  {String} [name] 昵称
 *
 */

exports.update = async ctx => {
  const logPrefix = '修改用户';

  const filter = [ 'password', 'name' ];
  const rules = {
    password: { type: 'string', required: false },
    name: { type: 'string', required: false },
  };

  const id = ctx.params.id;
  const data = await ctx.helper.filterParams(ctx.request.body, filter);
  ctx.validate(rules, data);

  const user = await ctx.model.user.findByIdAndUpdate(id, { $set: data });

  if (!user) {
    ctx.body = ctx.helper.fail('用户不存在');
    return;
  }

  ctx.body = ctx.helper.success('修改成功');

  logger.info(logPrefix, id, data);
};
```

### 查

``` js
// routes/index.js
router
  .post('/user', $.user.create)
  .delete('/user/:id', $.user.delete)
  .put('/user/:id', $.user.update)
  .get('/user', $.user.index);
```

``` js
// controllers/user.js
/**
 * @api {GET} /api/user 用户列表
 * @apiGroup user
 * @apiParam  {String} [pageNumber=1] 当前页数
 * @apiParam  {String} [pageSize=20] 每页显示的个数
 */

exports.index = async ctx => {
  const logPrefix = '获取用户列表';

  const {
    pageNumber,
    pageSize,
    sortBy,
    orderBy,
    filter,
  } = await ctx.helper.handleQuery(ctx.query);

  const [ items, total ] = await Promise.all([
    ctx.model.user.find(filter, { password: 0 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ [sortBy]: orderBy }),
    ctx.model.user.count(filter),
  ]);

  ctx.body = ctx.helper.success({
    items,
    total,
  });

  logger.info(logPrefix, ctx.query, items, total);
};
```
