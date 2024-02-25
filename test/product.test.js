const app = require('../app');
const request = require('supertest');
const fs = require('fs');
const path = require('path');

describe('Product', () => {
  test('create product', (done) => {
    request(app)
      .post('/api/products')
      .send({
        name: 'test1',
        price: 100,
        brand: 'test',
        description: 'test 123',
        SKU: 'test123',
        image: 'test.jpg',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body.message).toBe('Successfully created product')
        done()
      })
      .catch(done)
  })
  test('upload image', (done) => {
    const imgPath = path.join(__dirname, 'src/SpongeBob_SquarePants_title_card.png')
    const imgBuffer = fs.readFileSync(imgPath)
    request(app)
      .post('/api/uploads/13')
      .set('Content-Type', 'multipart/form-data')
      .attach('image', imgBuffer, 'SpongeBob_SquarePants_title_card.png')
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Successfully uploaded image')
        done()
      })
      .catch(done)
  })
  test('get all product', (done) => {
    request(app)
      .get('/api/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Successfully get Products')
        done()
      })
      .catch(done)
  })
  test('get detail product', (done) => {
    request(app)
      .get('/api/products/2')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Successfully get Product')
        done()
      })
      .catch(done)
  })
  test('update product', (done) => {
    request(app)
      .put('/api/products/3')
      .send({
        name: 'test2',
        price: 200,
        brand: 'test',
        description: 'test 123',
        SKU: 'test321',
        image: 'test.jpg',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Successfully updated product')
        done()
      })
      .catch(done)
  })
  test('delete product', (done) => {
    request(app)
      .delete('/api/products/4')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body.message).toBe('Successfully Deleted Product')
        done()
      })
      .catch(done)
  })
})