const {DETA_PROJECT_KEY, DB_NAME} = process.env

const {Deta} = require("deta")
const deta = Deta(DETA_PROJECT_KEY)
const db = deta.Base(DB_NAME)

const saveLastPercent = async percent => {
	const result = await db.put({
		key: "key",
		last_percent: percent,
		update_date: new Date().toISOString(),
	})
	return Boolean(result?.key)
}

const getLastPercent = async () => {
	const row = await db.get("key")
	return row ? row.last_percent : null
}

module.exports = {
	saveLastPercent,
	getLastPercent,
}
