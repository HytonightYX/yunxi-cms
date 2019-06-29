const Router = require('koa-router')
const router = new Router()

router.get('/classic/test', (ctx, next) => {
	ctx.body = {test: 'classic router ok'}
})

module.exports = router
