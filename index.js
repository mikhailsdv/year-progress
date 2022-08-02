const {app} = require("deta")
const action = require("./src/action.js")

app.lib.cron(action)

module.exports = app
