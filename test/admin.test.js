const app = require('../app')
const request = require('supertest')

describe('Admin', () => {
  test('get all admin', (done) => {
    request(app)
      .get('/api/admin')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true)
        done()
      })
      .catch(done)
  })
  test('register admin', (done) => {
    request(app)
      .post('/api/auth/admin/register')
      .send({
        first_name: 'Test',
        last_name: 'Admin',
        email: 'testadmin@example.com',
        username: 'testadmin',
        password: 'password123',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('first_name')
        expect(res.body).toHaveProperty('last_name')
        done()
      })
      .catch(done)
  })
  test('login admin', (done) => {
    request(app)
      .post('/api/auth/admin/login')
      .send({
        email: 'testadmin@example.com',
        password: 'password123',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('token')
        done()
      })
      .catch(done)
  })
  test('get admin', (done) => {
    request(app)
      .get('/api/admin/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('admin')
        done()
      })
      .catch(done)
  })
})