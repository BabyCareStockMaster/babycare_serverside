const app = require('../app')
const request = require('supertest')

describe('WarehouseStock', () => {
  test('get all warehouse stock', (done) => {
    request(app)
      .get('/api/warehousestock')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Successfully get Stocks')
        done()
      })
      .catch(done)
  })
  test('update stock', (done) => {
    request(app)
      .put('/api/warehousestock/1')
      .send({
        product_id: 1,
        stock: 500
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Successfully updated stock')
        done()
      })
      .catch(done)
  })
  test('transfer stock', (done) => {
    request(app)
      .post('/api/warehousestock/transfer')
      .send({
        sourceWarehouseId: 1,
        targetWarehouseId: 2,
        productId: 1,
        quantity: 100
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Successfully transferred stock')
        done()
      })
      .catch(done)
  })
  test('delete stock', (done) => {
    request(app)
      .delete('/api/warehousestock/2/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Successfully deleted product from the warehouse')
        done()
      })
      .catch(done)
  })
})