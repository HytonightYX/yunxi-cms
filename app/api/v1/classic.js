const Router = require('koa-router')
const router = new Router()
const {HttpException} = require('../../../core/httpException')

router.get('/v1/classic/test', (ctx, next) => {
	ctx.body = {test: 'v1 classic router ok'}
})

router.post('/v1/classic/error', (ctx, next) => {
	// ctx.body = {test: 'v1 classic router ok'}
	const query = ctx.request.query

	if (true) {
		throw new HttpException('出错啦!!', 10001, 400)
	}
	ctx.body = {text: 'no error'}
})

module.exports = router
