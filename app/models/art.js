const {Movie, Music, Sentence} = require('./classic')

class Art {
	static async getData(artId, type, useScope=true) {

		let art = null
		const scope = useScope ? 'noTS' : null
		const condition = {
			where: {id: artId}
		}

		switch (type) {
			case 100:
				// art = await Movie.scope('noTS').findOne(condition)
				art = await Movie.scope(scope).findOne(condition)
				break
			case 200:
				art = await Music.scope(scope).findOne(condition)
				break
			case 300:
				art = await Sentence.scope(scope).findOne(condition)
				break
			case 400:
				//TODO: Book的相关逻辑
				break
			default:
				break
		}

		return art
	}
}

module.exports = {
	Art
}
