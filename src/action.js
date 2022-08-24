const {BOT_TOKEN, BAR_LENGTH, CHANNEL_ID, DEBUG_CHAT_ID} = process.env

const {Telegram} = require("telegraf")
const {
	startOfYear: getStartOfYear,
	endOfYear: getEndOfYear,
	differenceInMilliseconds: getDifferenceInMilliseconds,
} = require("date-fns")
const {saveLastPercent, getLastPercent} = require("./db.js")

const telegram = new Telegram(BOT_TOKEN)

module.exports = async () => {
	const now = new Date()
	const startOfYear = getStartOfYear(now)
	const endOfYear = getEndOfYear(now)
	const timePastStartOfYear = getDifferenceInMilliseconds(now, startOfYear)
	const thisYearDuration = getDifferenceInMilliseconds(endOfYear, startOfYear)
	const percent = Math.round((timePastStartOfYear / thisYearDuration) * 1000) / 1000
	const percentNatural = Math.floor(percent * 100)
	const filledPartLength = Math.floor(BAR_LENGTH * percent)

	try {
		const lastPercent = await getLastPercent()

		if (percentNatural !== lastPercent) {
			const message =
				"▓".repeat(filledPartLength) +
				"░".repeat(BAR_LENGTH - filledPartLength) +
				" " +
				percentNatural +
				"%"

			await telegram.sendMessage(CHANNEL_ID, message)
			await saveLastPercent(percentNatural)
		}
	} catch (err) {
		console.error(err)
		DEBUG_CHAT_ID &&
			(await telegram.sendMessage(
				DEBUG_CHAT_ID,
				JSON.stringify(
					{
						error: `${err.name}: ${err.message}`,
						startOfYear,
						endOfYear,
						timePastStartOfYear,
						thisYearDuration,
						percentActual: percent,
						percent,
						percentNatural,
						filledPartLength,
					},
					null,
					2
				)
			))
	}
}
