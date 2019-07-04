const Router = require('koa-router')
const router = new Router({prefix: '/v1/classic'})
const {PositiveIntegerValidator} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth')

router.get('/test', (ctx, next) => {
	ctx.body = {test: 'v1 classic router ok'}
})

router.get('/latest', new Auth(7).m, async (ctx, next) => {
	ctx.body = ctx.auth.uid
})

module.exports = router
