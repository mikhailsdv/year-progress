const {BOT_TOKEN, BAR_LENGTH, CHANNEL_ID, DEBUG_CHAT_ID} = process.env

const {Telegram} = require("telegraf")
const {getDaysInYear, endOfYear, addYears, getDayOfYear, isLeapYear} = require("date-fns")
const {saveLastPercent, getLastPercent} = require("./db.js")

const telegram = new Telegram(BOT_TOKEN)

module.exports = async () => {
	try {
		const lastPercent = await getLastPercent()

		const now = new Date()
		const daysInYear = getDaysInYear(now)
		const dayOfYear = getDayOfYear(now)

		const percent = dayOfYear / daysInYear //count percent 0-1
		const percentFloor = Math.floor(percent * 100) //round down 0-100
		const filledPartLength = Math.floor(BAR_LENGTH * percent) //symbol repeat

		if (percentFloor !== lastPercent) {
			await saveLastPercent(percentFloor)
			const message =
				"▓".repeat(filledPartLength) +
				"░".repeat(BAR_LENGTH - filledPartLength) +
				" " +
				percentFloor +
				"%"

			await telegram.sendMessage(CHANNEL_ID, message)
		}
	} catch (err) {
		DEBUG_CHAT_ID &&
			(await telegram.sendMessage(
				DEBUG_CHAT_ID,
				`${err.toString()}\n${JSON.stringify(
					{
						lastPercent,
						daysInYear,
						dayOfYear,
						percent,
						percentFloor,
						filledPartLength,
					},
					null,
					2
				)}`
			))
	}
}
