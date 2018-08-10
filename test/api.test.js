const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)

const url_shortener_route = '/api/shorturl'


describe('URL Shortener service', () => {

  it('should pass this sanity check', async () => {
    const response = await chai.request(app).get(`${url_shortener_route}`)
    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined()
  })

  it('should save a new (valid) url', async () => {
    const url = `www.google.com`
    const expected_response = { original_url: 'www.google.com', short_url: 1 }
  })

  it('should reject an invalid URL', async () => {
    const url = `123.!&@*-#&.!c?om`
    const expected_response = { error: 'invalid URL' }
  })

  it('should redirect to the original url when GETting a shortened url', async () => {
    const url = `${url_shortener_route}/1`
  })

})
