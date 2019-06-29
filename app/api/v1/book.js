const Router = require('koa-router')
const router = new Router()

router.get('/book/test', (ctx, next) => {
	ctx.body = {test: 'book router ok'}
})

module.exports = router
