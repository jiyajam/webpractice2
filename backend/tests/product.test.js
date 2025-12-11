const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Product = require('../models/productModel')
const User = require('../models/userModel')

let token
let user

const users = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'Password123!',
    phone_number: '+358401234567',
    gender: 'Female',
    date_of_birth: new Date('1995-04-12'),
    membership_status: 'Active',
  },
]

const initProducts = [
  {
    title: 'Product 1',
    category: 'Electronics',
    description: 'Good condition',
    price: 100,
    stockQuantity: 10,
    supplier: {
      name: 'Supplier A',
      contactEmail: 'supplierA@example.com',
      contactPhone: '123456789',
      rating: 5,
    },
  },
  {
    title: 'Product 2',
    category: 'Clothing',
    description: 'New',
    price: 50,
    stockQuantity: 20,
    supplier: {
      name: 'Supplier B',
      contactEmail: 'supplierB@example.com',
      contactPhone: '987654321',
      rating: 4,
    },
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  await Product.deleteMany({})

  const response = await api.post('/api/users/signup').send(users[0])
  token = response.body.token
  user = await User.findOne({ email: users[0].email })

  // Attach userId to products
  for (let product of initProducts) {
    product.userId = user._id
  }
  await Product.insertMany(initProducts)
})

describe('GET /api/products', () => {
  it('returns all products', async () => {
    const res = await api
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toHaveLength(initProducts.length)
    expect(res.body[0].title).toBe(initProducts[0].title)
  })
})

describe('GET /api/products/:id', () => {
  it('returns a product by ID', async () => {
    const product = await Product.findOne()
    const res = await api
      .get(`/api/products/${product._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(res.body.title).toBe(product.title)
  })

  it('returns 404 if product does not exist', async () => {
    const fakeId = new mongoose.Types.ObjectId()
    await api
      .get(`/api/products/${fakeId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })

  it('returns 400 for invalid ID format', async () => {
    await api
      .get('/api/products/123-invalid')
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })
})

describe('POST /api/products', () => {
  it('creates a new product', async () => {
    const newProduct = {
      title: 'Product 3',
      category: 'Furniture',
      description: 'Brand new',
      price: 300,
      stockQuantity: 5,
      supplier: {
        name: 'Supplier C',
        contactEmail: 'supplierC@example.com',
        contactPhone: '5555555',
        rating: 3,
      },
    }

    const res = await api
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(newProduct)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(res.body.title).toBe(newProduct.title)

    const productsAfter = await Product.find({})
    expect(productsAfter).toHaveLength(initProducts.length + 1)
  })

  it('fails with 400 if required fields missing', async () => {
    await api
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(400)
  })

  it('fails with 401 if token is missing', async () => {
    const newProduct = {
      title: 'Unauthorized Product',
      category: 'Electronics',
      description: 'No token',
      price: 10,
      stockQuantity: 1,
      supplier: {
        name: 'Supplier X',
        contactEmail: 'x@example.com',
        contactPhone: '000',
        rating: 1,
      },
    }
    await api.post('/api/products').send(newProduct).expect(401)
  })
})

describe('PUT /api/products/:id', () => {
  it('updates a product if owner', async () => {
    const product = await Product.findOne()
    const updates = { title: 'Updated Product' }

    const res = await api
      .put(`/api/products/${product._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updates)
      .expect(200)

    expect(res.body.title).toBe('Updated Product')
  })

  it("returns 404 if updating someone else's product", async () => {
    // create second user
    const secondUserRes = await api.post('/api/users/signup').send({
      ...users[0],
      email: 'second@example.com',
      name: 'Second User',
    })
    const secondToken = secondUserRes.body.token

    const product = await Product.findOne()
    await api
      .put(`/api/products/${product._id}`)
      .set('Authorization', `Bearer ${secondToken}`)
      .send({ title: 'Hacked' })
      .expect(404)
  })
})

describe('DELETE /api/products/:id', () => {
  it('deletes a product if owner', async () => {
    const product = await Product.findOne()
    await api
      .delete(`/api/products/${product._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const deleted = await Product.findById(product._id)
    expect(deleted).toBeNull()
  })

  it("fails if deleting someone else's product", async () => {
    const secondUserRes = await api.post('/api/users/signup').send({
      ...users[0],
      email: 'second@example.com',
      name: 'Second User',
    })
    const secondToken = secondUserRes.body.token

    const product = await Product.findOne()
    await api
      .delete(`/api/products/${product._id}`)
      .set('Authorization', `Bearer ${secondToken}`)
      .expect(404)

    const stillInDb = await Product.findById(product._id)
    expect(stillInDb).not.toBeNull()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
