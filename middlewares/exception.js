const {HttpException} = require('../core/httpException')

const catchError = async (ctx, next) => {
	try {
		await next()
	} catch (error) {
		if (error instanceof HttpException) {
			console.log(error)
			ctx.body = {
				message: error.message,
				error_code: error.errorCode,
				request: `${ctx.method} ${ctx.path}`
			}
			ctx.status = error.code
			console.log(ctx)
		} else {

			ctx.body = {
				message: '捕获到未知异常',
				error_code: 999,
				request: `${ctx.method} ${ctx.path}`,
			}
			ctx.status = 500
		}
	}
}

module.exports = catchError
