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

  it('should return the correct response', async () => {
    const original_url = `${url_shortener_route}/{Math.random().toFixed(5) * 100000}`
    const response = await chai.request(app).post(`${url_shortener_route}`, { url: original_url })
    expect(response.status).toEqual(201)
    expect(response.body.original_url).toMatch(original_url)
    expect(response.body.shorturl).toBeDefined()
  })

  it('should add the url to DB', () => {
  })

  it('should return an error message when POSTing a wrong url', async () => {
  })

  it('should redirect to the original url when GETting a shortened url', async () => {
  })

})
