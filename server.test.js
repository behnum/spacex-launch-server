const request = require('supertest')
const app = require('./server')

jest.mock('axios')

describe('GET /random-launch-image', () => {
  it('should return a link to a random Flickr image', async () => {
    // Mock the Axios module's get function for a successful response
    const axios = require('axios')
    axios.get.mockResolvedValue({
      data: [
        {
          links: {
            flickr: {
              original: ['https://example.com/flickr-image.jpg']
            }
          }
        }
      ]
    })

    const response = await request(app).get('/random-launch-image')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('flickrImage')
    expect(response.body.flickrImage).toMatch(/^https:\/\/example\.com/) // Adjust with your mocked image URL
  })
})
