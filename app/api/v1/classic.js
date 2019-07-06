const Router = require('koa-router')
const router = new Router({prefix: '/v1/classic'})
const {Auth} = require('../../../middlewares/auth')
const {Flow} = require('../../models/flow')
const {Art} = require('../../models/art')

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
	// 序列化 对象=>json,如下直接修改属性非常不好
	// art.dataValues.index = flow.index

	// 使用内置方法
	art.setDataValue('index', flow.index)
	ctx.body = art
})

module.exports = router
