const Router = require('koa-router')
const router = new Router({prefix: '/v1/book'})
const {HotBook} = require('../../models/hotBook')
const {Book} = require('../../models/book')
const {Favor} = require('../../models/favor')
const {PositiveIntegerValidator, SearchValidator, AddShortCommentValidator} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth')
const {Comment} = require('../../models/bookComment')
const {success} = require('../../lib/helper')

/**
 * book测试接口
 * 公开
 */
router.get('/test', (ctx, next) => {
	ctx.body = {test: 'book router ok'}
})

/**
 * 获取所有热门书籍
 * 公开
 */
router.get('/hot-list', async (ctx, next) => {
	const favors = await HotBook.getAll()
	ctx.body = {
		books: favors
	}
})

/**
 * 获取书籍详情
 * 公开
 */
router.get('/:id/detail', async ctx => {
	const v = await new PositiveIntegerValidator().validate(ctx)
	ctx.body = await Book.getDetail(v.get('path.id'))
})

/**
 * 搜索图书
 * 公开
 */
router.get('/search', async ctx => {
	const v = await new SearchValidator().validate(ctx)
	ctx.body = await Book.searchFromYuShu(v.get('query.q'), v.get('query.count'), v.get('query.start'))
})

/**
 * 获取用户喜欢书籍的数量
 */
router.get('/favor/count', new Auth().m, async ctx => {
	const count = await Book.getMyFavorBookCount(ctx.auth.uid)
	ctx.body = {count}
})

/**
 * 获取书籍点赞情况
 */
router.get('/:bookId/favor', new Auth().m, async ctx => {
	const v = await new PositiveIntegerValidator().validate(ctx, {id: 'bookId'})
	const favor = await Favor.getBookFavor(ctx.auth.uid, v.get('path.bookId'))
	ctx.body = favor
})

/**
 * 增加短评接口
 */
router.post('/add/short-comment', new Auth().m, async ctx => {
	const v = await new AddShortCommentValidator().validate(ctx, {id: 'bookId'})

	await Comment.addComment(v.get('body.bookId'), v.get('body.content'))

	success()
})

module.exports = router

