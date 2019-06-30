const Router = require('koa-router')
const router = new Router()

router.get('/v1/book/test', (ctx, next) => {
	ctx.body = {test: 'book router ok'}
})

module.exports = router
