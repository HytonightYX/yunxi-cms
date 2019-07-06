const Router = require('koa-router')
const router = new Router({prefix: '/v1/classic'})
const {Auth} = require('../../../middlewares/auth')
const {Flow} = require('../../models/flow')
const {Art} = require('../../models/art')
const {Favor} = require('../../models/favor')
const {PositiveIntegerValidator} = require('../../validators/validator')

/**
 * 测试接口
 * 公开
 */
router.get('/test', (ctx, next) => {
	ctx.body = {test: 'v1 classic router ok'}
})

/**
 * 查询最新一期的期刊
 */
router.get('/latest', new Auth(7).m, async (ctx, next) => {

	// 排序得到最后一期记录
	const flow = await Flow.findOne({
		order: [
			['index', 'DESC']   // 按照index排序/DESC倒序
		]
	})
	const art = await Art.getData(flow.artId, flow.type)
	const userLikeIt = await Favor.userLikeIt(flow.artId, flow.type, ctx.auth.uid)
	// 序列化 对象=>json,如下直接修改属性非常不好
	// art.dataValues.index = flow.index

	// 使用内置方法
	art.setDataValue('index', flow.index)
	art.setDataValue('likeStatus', userLikeIt)
	ctx.body = art
})

/**
 * 获取指定index期刊的下一期
 */
router.get('/:index/next', new Auth().m, async ctx => {
	const v = await new PositiveIntegerValidator().validate(ctx, {
		id: 'index'
	})

	const index = v.get('path.index')

	// 当前一期的下一期
	const flow = await Flow.findOne({where: {index: index + 1}})

	if (!flow) {
		throw new global.errs.NotFound()
	}

	const art = await Art.getData(flow.artId, flow.type)
	const userLikeIt = await Favor.userLikeIt(flow.artId, flow.type, ctx.auth.uid)

	art.setDataValue('index', flow.index)
	art.setDataValue('likeStatus', userLikeIt)
	ctx.body = art
})

/**
 * 获取指定index期刊的上一期
 */
router.get('/:index/previous', new Auth().m, async ctx => {
	const v = await new PositiveIntegerValidator().validate(ctx, {
		id: 'index'
	})

	const index = v.get('path.index')

	const flow = await Flow.findOne({where: {index: index - 1}})

	if (!flow) {
		throw new global.errs.NotFound()
	}

	const art = await Art.getData(flow.artId, flow.type)
	const userLikeIt = await Favor.userLikeIt(flow.artId, flow.type, ctx.auth.uid)

	art.setDataValue('index', flow.index)
	art.setDataValue('likeStatus', userLikeIt)
	ctx.body = art
})

module.exports = router
