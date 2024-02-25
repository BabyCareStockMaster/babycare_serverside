const app = require('../app')
const request = require('supertest')

describe('Category', () => {
  test('get all category', (done) => {
    request(app)
      .get('/api/category')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true)
        done()
      })
      .catch(done)
  })
  test('get category by id', (done) => {
    request(app)
      .get('/api/category/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('id')
        done()
      })
      .catch(done)
  })
  test('create category', (done) => {
    request(app)
      .post('/api/category')
      .send({
        name: 'Test Category',
        description: 'Test Description'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('description')
        done()
      })
      .catch(done)
  })
  test('update category', (done) => {
    request(app)
      .put('/api/category/1')
      .send({
        name: 'Test newCategory',
        description: 'Test newDescription'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Update Successfully')
        done()
      })
      .catch(done)
  })
  test('delete category', (done) => {
    request(app)
      .delete('/api/category/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Delete Successfully')
        done()
      })
      .catch(done)
  })
})