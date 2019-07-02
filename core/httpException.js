class HttpException extends Error {
	constructor(message = '发生异常', errorCode = 10000, code = 400) {
		super()
		this.errorCode = errorCode
		this.code = code
		this.message = message
	}
}

class ParameterException extends HttpException {
	constructor(message, errorCode) {
		super()
		this.code = 400
		this.message = message || '参数错误'
		this.errorCode = errorCode || 10000
	}
}

class Success extends HttpException {
	constructor(message, errorCode) {
		super()
		this.code = 201
		this.message = message || 'ok'
		this.errorCode = errorCode || 0
	}
}

module.exports = {
	HttpException,
	ParameterException,
	Success
}

