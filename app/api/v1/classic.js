const Router = require('koa-router')
const router = new Router()
const {HttpException, ParameterException} = require('../../../core/httpException')
const {PositiveIntegerValidator} = require('../../validators/validator')

router.get('/v1/classic/test', (ctx, next) => {
	ctx.body = {test: 'v1 classic router ok'}
})

router.post('/v1/classic/:id/error/', (ctx, next) => {
	// ctx.body = {test: 'v1 classic router ok'}

	const params = ctx.params
	console.log(params.id)
	const v = new PositiveIntegerValidator().validate(ctx)
	v.get('path.id', )


})

module.exports = router
