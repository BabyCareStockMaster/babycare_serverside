const app = require('../app')
const request = require('supertest')

describe('User', () => {
  test('get all user', (done) => {
    request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.rows)).toBe(true)
        done()
      })
      .catch(done)
  })
  test('get detail user', (done) => {
    request(app)
      .get('/api/users/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('user')
        done()
      })
      .catch(done)
  })
  test('register user', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        first_name: 'Test',
        last_name: 'User',
        email: 'testuser@example.com',
        password: 'password123',
        address: '123 Test Street',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('user')
        done()
      })
      .catch(done)
  })
  test('login user', (done) => {
    request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
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
  test('update user', (done) => {
    request(app)
      .put('/api/users/1')
      .send({
        first_name: 'Updated',
        last_name: 'User',
        email: 'updateduser@example.com',
        password: 'newpassword123',
        address: '123 New Street',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('user')
        done()
      })
      .catch(done)
  })
  test('delete user', (done) => {
    request(app)
      .delete('/api/users/2')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('User deleted')
        done()
      })
      .catch(done)
  })
})