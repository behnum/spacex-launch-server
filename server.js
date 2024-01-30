const express = require('express')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/random-launch-image', async (req, res) => {
  try {
    // Fetch dataa fro SpaceX API
    const response = await axios.get('https://api.spacexdata.com/v5/launches')

    // Filter launches (:at least one Flickr image)
    const launchesWithImages = response.data.filter(
      launch => launch.links?.flickr?.original && launch.links.flickr.original.length > 0
    )

    if (launchesWithImages.length > 0) {
      // 🎲 Get a random launch
      const randomLaunch = launchesWithImages[Math.floor(Math.random() * launchesWithImages.length)]

      // Return the link to a random Flickr image
      const flickrImage = randomLaunch.links.flickr.original[0]
      res.json({ flickrImage })
    } else {
      // No launches with Flickr images found :/
      res.status(404).json({ error: 'No launches with Flickr images available' })
    }
  } catch (error) {
    console.error('Error fetching data:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Running on http://localhost:${PORT}`)
})

module.exports = app
