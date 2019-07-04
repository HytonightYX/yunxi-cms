module.exports = {
	env: 'dev',
	// env: 'prod',
	database: {
		dbName: 'yunxicms',
		host: 'localhost',
		port: 3306,
		user: 'root',
		pwd: ''
	},
	security: {
		secretKey: "abcdefg",        // 秘钥
		expiresIn: 60 * 60,   // 令牌过期时间 一小时
	}
}
