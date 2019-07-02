const Router = require('koa-router')
const router = new Router({prefix: '/v1/user'})
const {User} = require('../../models/user')
const {RegisterValidator} = require('../../validators/validator')

/**
 * 注册功能
 */
router.post('/register', async (ctx, next) => {
	// 编写api的思维路径
	// 接受哪些参数
		// email password1 password2 nickname
	// 编写参数校验代码
	// console.log(ctx.request.body)
	const v = await new RegisterValidator().validate(ctx)
	const user = {
		email: v.get('body.email'),
		password: v.get('body.password1'),
		nickname: v.get('body.nickname')
	}
	const r = await User.create(user)
})

module.exports = router
