const Router = require('koa-router')
const {TokenValidator} = require('../../validators/validator')
const {LoginType} = require('../../lib/enum')
const {User} = require('../../models/user')
const router = new Router({prefix: '/v1/token'})
const {generateToken} = require('../../../core/util')

/**
 * 校验令牌
 */
router.post('/', async (ctx) => {
	// API 有权限,非公开API必须携带令牌才能访问
	// 如果令牌过期或者不合法,则禁止访问该非公开API
	const v = await new TokenValidator().validate(ctx)
	let token;

	switch (v.get('body.type')) {
		case LoginType.USER_EMAIL:
			token = await emailLogin(v.get('body.account'), v.get('body.secret'))
			break
		case LoginType.USER_MINI_PROGRAM:
			break

		default:
			throw new global.errs.ParameterException('没有响应的异常处理函数')
	}

	ctx.body = {token}
})

/**
 * 校验用户账号密码是否和数据库中一致,
 * 如果一致,则颁布一个令牌
 *
 * @param account
 * @param secret
 * @returns {Promise<void>}
 */
async function emailLogin(account, secret) {
	const user = await User.verifyEmailPassword(account, secret)
	return generateToken(user.id, 2)
}

module.exports = router
