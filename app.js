const Koa = require('koa')
const InitManager = require('./core/init')
const app = new Koa()
const catchError = require('./middlewares/exception')

app.use(catchError)

InitManager.initCore(app)

app.listen(3030, () => {console.log('PORT has opened on 3030')})
