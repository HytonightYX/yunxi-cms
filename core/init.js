const requireDirectory = require('require-directory')
const Router = require('koa-router')

/**
 * 初始化管理器
 */
class InitManager {
	// entry
	static initCore(app) {
		InitManager.app = app
		InitManager.initLoadRouters()
	}

	static initLoadRouters() {
		const apiDir = `${process.cwd()}/app/api`
		requireDirectory(module, apiDir, {
			visit: whenLoadModule
		})

		function whenLoadModule(mod) {
			if (mod instanceof Router) {
				InitManager.app.use(mod.routes())
			}
		}
	}
}

module.exports = InitManager
