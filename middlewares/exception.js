const {HttpException} = require('../core/httpException')

const catchError = async (ctx, next) => {
	try {
		await next()
	} catch (error) {
		if (error instanceof HttpException) {
			console.log(error)
			ctx.body = {
				msg: error.msg,
				error_code: error.errorCode,
				request: `${ctx.method} ${ctx.path}`
			}
			ctx.status = error.code
			console.log(ctx)
		}
	}
}

module.exports = catchError
