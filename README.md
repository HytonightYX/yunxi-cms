# yunxi-cms
进度

| 日期  | 模块  | 学习内容                             | 其他 |
| ---- | ---- | ------------------------------------ | ---- |
| 6.28 |      | 深入学习async/await及其在koa中的用法 |      |
| 6.29 |      | koa自定义参数校验                    |      |
| 6.30 |      | 全局异步异常捕捉中间件                   |   同理,日志也可以类似处理吧   |
| 7.1 | | LinValidator校验库，初步sequelize |  |
| 7.2 | | 自定义异常, user接口, 密码加密 |  |
| 7.3 | | 用户登录逻辑, Token令牌 |  |
| 7.4 | | JWT令牌验证, 权限管理 |  |

## Peter Tingle
### 安全
- uid 号码放在auth中传递,禁止让客户端作为参数传递(篡改).例如用户A篡改uid后获取的token,可以套出数据库中所有其他用户的数据
- 报`Internal Server Error`错误,多半是没加await

### 缓存
- 期刊的标题/描述/图片/出版日期等,这些都是数据库生成后基本不会改变的内容,因此非常适合将其缓存到客户端中
- 但是有些数据经常改变,比如点赞数,这就适合单独再做一个接口
- 相比后端缓存,前端缓存是解决性能问题的最有效方案
- 但是前端缓存局限性很大

### 转型
- JSON传输可以识别字符串or数字
- URL或者params传输的是字符串,服务器手动转型

### 数据库
- Sequelize的一个bug,查询后对数据修改,必须设置`useScope=false`
- 禁止在循环中查询数据库,因为查询次数受数据影响. 改为使用in查询

### JS
- 所有对象的`key`都是字符串!!! 如果是 [key], 则key可以是一个表达式,但是最终结果还是字符串!!! 
- `for...in` 和 `for...of`循环的区别
- forEach() 内不得用 async/await

### 其他
- 并发/并行
- js宏任务/微任务, EventLoop
