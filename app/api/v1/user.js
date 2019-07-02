const Router = require('koa-router')
const router = new Router({prefix: '/v1/user'})

const {RegisterValidator} = require('../../validators/validator')

/**
 * 注册功能
 */
router.post('/register', async (ctx, next) => {
	// 编写api的思维路径
	// 接受哪些参数
		// email password1 password2 nickname
	// 编写参数校验代码
	console.log(ctx.request.body)
	const v = new RegisterValidator().validate(ctx)
})

module.exports = router
