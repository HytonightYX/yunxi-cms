const {db} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
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

		// return db.transaction
		db.transaction(async t => {
			// 添加记录
			await Favor.create({
				artId, type, uid
			}, {
				transaction: t
			})

			const art = await Art.getData(artId, type)

			// 对art实体中的favNums字段进行 +1 操作
			return await art.increment('favNums', {by: 1, transaction: t})
		})
	}

	static async dislike(artId, type, uid) {
		const favor = await Favor.findOne({
			where: {artId, type, uid}
		})

		// 当前用户还没点过赞,自然不能取消点赞
		if (!favor) {
			throw new global.errs.DislikeError()
		}

		// return db.transaction
		db.transaction(async t => {
			// 添加记录
			await favor.destroy({
				// true 硬删除/false 软删除
				force: true,
				transaction: t,
			})

			const art = await Art.getData(artId, type)

			// 对art实体中的favNums字段进行 +1 操作
			return await art.decrement('favNums', {by: 1, transaction: t})
		})
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

module.exports = {
	Favor
}
