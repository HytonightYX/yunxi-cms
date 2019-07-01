const Sequelize = require('sequelize')
const db = require('../config/config').database
const sequelize = new Sequelize(db.dbName, db.user, db.pwd, {
		dialect: 'mysql',     // 数据库类型
		host: db.host,
		port: db.port,
		logging: true,        // console中是否显示具体sql
		timezone: '+08:00',   // 设置东八时区,重要
	})

module.exports = {sequelize}

