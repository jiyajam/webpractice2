const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/userModel')

const users = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'Password123',
    phone_number: '+358401234567',
    gender: 'Female',
    date_of_birth: '1995-04-12',
    membership_status: 'active',
  },
]

beforeEach(async () => {
  await User.deleteMany({})
})

describe('User Routes', () => {
  // SIGNUP TESTS

  describe('POST /api/users/signup', () => {
    it('should create a new user and return email + token', async () => {
      const response = await api
        .post('/api/users/signup')
        .send(users[0])
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveProperty('token')
      expect(response.body.email).toBe(users[0].email)

      const savedUser = await User.findOne({ email: users[0].email })
      expect(savedUser).not.toBeNull()
      expect(savedUser.password).not.toBe(users[0].password) // hashed password
    })

    it('should return 400 when required fields are missing', async () => {
      await api
        .post('/api/users/signup')
        .send({
          name: 'Missing Fields',
          email: 'missing@example.com',
          phoneNumber: '+358409876543',
          gender: 'Male',
          dateOfBirth: new Date('1990-11-23'),
          address: {
            street: 'Itäkatu 45',
            city: 'Vantaa',
            state: 'Uusimaa',
            zipCode: '01300',
          },
        })
        .expect(400)
    })

    it('should not allow duplicate email', async () => {
      await api.post('/api/users/signup').send(users[0]).expect(201)

      const response = await api
        .post('/api/users/signup')
        .send(users[0])
        .expect(400)

      expect(response.body.error).toBe('User already exists')
    })
  })

  // LOGIN TESTS

  describe('POST /api/users/login', () => {
    it('should return token when login is valid', async () => {
      await api.post('/api/users/signup').send(users[0]).expect(201)

      const response = await api
        .post('/api/users/login')
        .send({
          email: users[0].email,
          password: users[0].password,
        })
        .expect(200)

      expect(response.body).toHaveProperty('token')
    })

    it('should return 400 when email is wrong', async () => {
      await api.post('/api/users/signup').send(users[0]).expect(201)

      await api
        .post('/api/users/login')
        .send({
          email: 'wrong@example.com',
          password: users[0].password,
        })
        .expect(400)
    })

    it(' should return 400 when password is incorrect', async () => {
      await api.post('/api/users/signup').send(users[0]).expect(201)

      await api
        .post('/api/users/login')
        .send({
          email: users[0].email,
          password: 'incorrectPass',
        })
        .expect(400)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
