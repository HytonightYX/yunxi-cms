const {db} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

/**
 * Favor业务表
 * 记录某用户是否对某期刊点赞
 */
class Favor extends Model {

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
