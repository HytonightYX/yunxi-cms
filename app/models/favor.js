const {db} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const {LikeError, DislikeError} = require('../../core/httpException')
const {Art} = require('../models/art')


/**
 * Favor业务表
 * 记录某用户是否对某期刊点赞
 */
class Favor extends Model {

	/**
	 * 点赞
	 * 多个步骤必须作为一个事务,保证数据一致性
	 * ACID 原子性/一致性/隔离性/持久性
	 * @param artId
	 * @param type
	 * @param uid
	 * @returns {Promise<void>}
	 */
	static async like(artId, type, uid) {


		const favor = await Favor.findOne({
			where: {artId, type, uid}
		})

		// 当前用户已经点过赞了
		if (favor) {
			throw new global.errs.LikeError()
		}

		db.transaction(async t => {
			await Favor.create({
				artId, type, uid
			}, {
				transaction: t
			})

			const art = await Art.getData(artId, type)

			// 对art实体中的favNums字段进行 +1 操作
			await art.increment('favNums', {by: 1, transaction: t})
		})
		// 添加记录


		// 修改classic中favNums + 1

	}
	static async dislike(artId, type, uid) {

	}
}

/**
 * 用户和classic存在多对多关系
 */
Favor.init({
	uid: Sequelize.INTEGER,
	artId: Sequelize.INTEGER,
	type: Sequelize.INTEGER,
}, {
	sequelize: db,
	tableName: 'favor'
})
