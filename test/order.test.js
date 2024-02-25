const app = require('../app')
const request = require('supertest')

describe('Order', () => {
  test('create order', (done) => {
    request(app)
      .post('/api/orders')
      .send({
        user_id: 1,
        warehouse_id: 1,
        products: [
          {
            id: 1,
            quantity: 2
          }
        ],
        status: 'offline',
        address: '123 Test Street',
        tracking_number: '123456789'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('user_id')
        expect(res.body).toHaveProperty('warehouse_id')
        done()
      })
      .catch(done)
  })
  test('get all order', (done) => {
    request(app)
      .get('/api/orders')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.rows)).toBe(true)
        done()
      })
      .catch(done)
  })
  test('update status', (done) => {
    request(app)
      .put('/api/orders/5')
      .send({
        status: 'online'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Successfully updated status')
        done()
      })
      .catch(done)
  })
  test('delete order', (done) => {
    request(app)
      .delete('/api/orders/6')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Successfully deleted order')
        done()
      })
      .catch(done)
  })
})