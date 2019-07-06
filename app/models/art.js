const {Movie, Music, Sentence} = require('./classic')

class Art {
	static async getData(artId, type) {

		let art = null
		const condition = {
			where: {id: artId}
		}

		switch (type) {
			case 100:
				art = await Movie.findOne(condition)
				break
			case 200:
				art = await Music.findOne(condition)
				break
			case 300:
				art = await Sentence.findOne(condition)
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
