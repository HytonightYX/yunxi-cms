const Router = require('koa-router')
const {TokenValidator} = require('../../validators/validator')
const {LoginType} = require('../../lib/enum')
const {User} = require('../../models/user')
const router = new Router({prefix: '/v1/token'})

/**
 * 校验令牌
 */
router.post('/', async (ctx) => {
	const v = await new TokenValidator().validate(ctx)

	switch (v.get('body.type')) {
		case LoginType.USER_EMAIL:
			await emailLogin(v.get('body.account'), v.get('body.secret'))
			break
		case LoginType.USER_MINI_PROGRAM:
			break

		default:
			break
	}

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
}

module.exports = router
