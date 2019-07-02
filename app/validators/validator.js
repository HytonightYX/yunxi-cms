const {LinValidator, Rule} = require('../../core/lin-validator')

class PositiveIntegerValidator extends LinValidator {
	constructor() {
		super()
		this.id = [
			new Rule('isInt', '需要正整数', {min: 1})
		]
	}
}

class RegisterValidator extends LinValidator {
	constructor() {
		super()
		this.email = [
			new Rule('isEmail', '不符合Email规范')
		]
		this.password1 = [
			new Rule('isLength', '密码长度为6~32字符', {min: 6, max: 32}),
			new Rule('matches', '密码至少1个大写字母，1个小写字母和1个数字', /^[\w_-]{6,16}$/)
		]
		this.password2 = this.password1
		this.nickname = [
			new Rule('isLength', '昵称长度为4~32字符', {min: 4, max: 32})
		]
	}

	validatePassword(vals) {
		const pwd1 = vals.body.password1
		const pwd2 = vals.body.password2

		if (pwd1 !== pwd2) {
			throw new Error('两个密码必须相同')
		}
	}
}

module.exports = {
	PositiveIntegerValidator,
	RegisterValidator
}
