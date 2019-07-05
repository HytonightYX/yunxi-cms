const Sequelize = require('sequelize')
const {dbName, user, pwd, host, port} = require('../config/config').database
const db = new Sequelize(dbName, user, pwd, {
		dialect: 'mysql',     // 数据库类型
		host: host,
		port: port,
		logging: false,        // console中是否显示具体sql
		timezone: '+08:00',   // 设置东八时区,重要
		define: {
			timestamps: true,
			paranoid: true,
			// createdAt: 'created_at',  // 更名为符合Mysql的命名规则
			// updatedAt: 'updated_at',
			// deletedAt: 'deleted_at',
			underscored: true,          //  自动将驼峰转下划线
		}
})


db.sync({
	force: true
})

module.exports = {db}

