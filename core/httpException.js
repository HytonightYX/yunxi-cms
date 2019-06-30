class HttpException extends Error {
	constructor(msg = '发生异常', errorCode = 10000, code = 400) {
		super()
		this.errorCode = errorCode
		this.code = code
		this.msg = msg
	}
}

module.exports = {
	HttpException
}

