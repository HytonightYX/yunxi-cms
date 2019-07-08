const Router = require('koa-router')
const router = new Router({prefix: '/v1/book'})
const {HotBook} = require('../../models/hotBook')
const {Book} = require('../../models/book')
const {PositiveIntegerValidator} = require('../../validators/validator')

/**
 * book测试接口
 */
router.get('/test', (ctx, next) => {
	ctx.body = {test: 'book router ok'}
})

/**
 * 获取所有热门书籍
 */
router.get('/hot-list', async (ctx, next) => {
	const favors = await HotBook.getAll()
	ctx.body = {
		books: favors
	}
})

/**
 * 获取书籍详情
 */
router.get('/:id/detail', async ctx => {
	const v = await new PositiveIntegerValidator().validate(ctx)
	ctx.body = await Book.getDetail(v.get('path.id'))
})

module.exports = router
