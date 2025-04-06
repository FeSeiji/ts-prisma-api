import express from 'express'
import { PrismaClient } from '@prisma/client'
import path from 'path'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get('/teste', (req, res) => {
  res.send('🚀 API Prisma está no ar!')
})
app.use(express.json());

// Serve arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));
// Rota base (opcional)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  console.log("procurando usuário...")
  res.json(users)
})

app.get('/biblioteca',(req, res)=>{res.send('em manutenção...⚠️ 👷🏽‍♂️ 🔨 ')})

app.post('/users', async (req, res) => {
  const { name, email } = req.body
  try {
    const user = await prisma.user.create({ data: { name, email } })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário.' })
  }
})

app.put('/users/:id', async (req, res) => {
    const userId = Number(req.params.id);
    const { name, email } = req.body;
  
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name, email },
      });
      res.json(updatedUser);
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Não foi possível atualizar o usuário' });
    }
  });

app.listen(3000, () => {
  console.log('🚀 Servidor rodando em http://localhost:3000')
})
