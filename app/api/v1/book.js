const Router = require('koa-router')
const router = new Router({prefix: '/v1/book'})
const {HotBook} = require('../../models/hotBook')

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

module.exports = router
