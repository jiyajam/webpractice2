const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/userModel')
const Product = require('../models/productModel')

// Sample user for signup/login
const users = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'Password123!',
    phone_number: '+358401234567',
    gender: 'Other',
    date_of_birth: '1995-04-12',
    membership_status: 'basic',
  },
]

// Sample product
const sampleProduct = {
  title: 'Smartphone',
  category: 'Electronics',
  description: 'Latest smartphone',
  price: 799,
  stockQuantity: 50,
  supplier: {
    name: 'Tech Supplier',
    contactEmail: 'supplier@example.com',
    contactPhone: '+358401234568',
    rating: 5,
  },
}

let token
let user

beforeEach(async () => {
  await User.deleteMany({})
  await Product.deleteMany({})

  const res = await api.post('/api/users/signup').send(users[0])
  token = res.body.token
  user = await User.findOne({ email: users[0].email })
})

describe('Product Routes', () => {
  describe('POST /api/products', () => {
    it('should create a new product when authenticated', async () => {
      const res = await api
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send(sampleProduct)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(res.body).toHaveProperty('_id')
      expect(res.body.title).toBe(sampleProduct.title)

      const productsInDb = await Product.find({})
      expect(productsInDb).toHaveLength(1)
      expect(productsInDb[0].title).toBe(sampleProduct.title)
    })

    it('should fail with 401 if token is missing', async () => {
      await api.post('/api/products').send(sampleProduct).expect(401)
    })

    it('should fail with 400 if required fields are missing', async () => {
      await api
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .expect(400)
    })
  })

  describe('GET /api/products', () => {
    it('should retrieve all products', async () => {
      const product = new Product({ ...sampleProduct, userId: user._id })
      await product.save()

      const res = await api
        .get('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(res.body).toHaveLength(1)
      expect(res.body[0].title).toBe(sampleProduct.title)
    })
  })

  describe('GET /api/products/:id', () => {
    it('should get a product by ID', async () => {
      const product = new Product({ ...sampleProduct, userId: user._id })
      const saved = await product.save()

      const res = await api
        .get(`/api/products/${saved._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(res.body.title).toBe(sampleProduct.title)
    })

    it('should return 404 if product does not exist', async () => {
      const fakeId = new mongoose.Types.ObjectId()
      await api
        .get(`/api/products/${fakeId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
    })
  })

  describe('PUT /api/products/:id', () => {
    it('should update a product if owner', async () => {
      const product = new Product({ ...sampleProduct, userId: user._id })
      const saved = await product.save()

      const updates = { title: 'Updated Smartphone' }

      const res = await api
        .put(`/api/products/${saved._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updates)
        .expect(200)

      expect(res.body.title).toBe('Updated Smartphone')
    })
  })

  describe('DELETE /api/products/:id', () => {
    it('should delete product if owner', async () => {
      const product = new Product({ ...sampleProduct, userId: user._id })
      const saved = await product.save()

      await api
        .delete(`/api/products/${saved._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const inDb = await Product.findById(saved._id)
      expect(inDb).toBeNull()
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
