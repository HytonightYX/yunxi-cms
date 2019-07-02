const {db} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

class User extends Model {

}

User.init({
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nickname: Sequelize.STRING,
	email: {
		type: Sequelize.STRING, // 最大长度
		unique: true,               // 唯一
	},
	password: Sequelize.STRING,
	openid: {
		type: Sequelize.STRING(64), // 最大长度
		unique: true,               // 唯一
	}
}, {
	sequelize: db,
	tableName: 'user'
})
