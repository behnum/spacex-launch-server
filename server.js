const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/random-launch-image', async (req, res) => {
  console.log('Hello from spacex-launch-server')
  res.send('Hello from spacex-launch-server')
})

app.listen(PORT, () => {
  console.log(`🚀 Running on http://localhost:${PORT}`)
})

module.exports = app
