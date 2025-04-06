import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('🚀 API Prisma está no ar!')
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.post('/users', async (req, res) => {
  const { name, email } = req.body
  try {
    const user = await prisma.user.create({ data: { name, email } })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário.' })
  }
})

app.listen(3000, () => {
  console.log('🚀 Servidor rodando em http://localhost:3000')
})
