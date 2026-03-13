const express = require('express')
const router = express.Router()
const prisma = require('../prisma')

// Lista todos os clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: { criadoEm: 'desc' }
    })
    res.json(clientes)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar clientes' })
  }
})

// Cria um novo cliente
router.post('/', async (req, res) => {
  try {
    const { nome, telefone, email, observacoes } = req.body
    const cliente = await prisma.cliente.create({
      data: { nome, telefone, email, observacoes }
    })
    res.json(cliente)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar cliente' })
  }
})

// Deleta cliente
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await prisma.cliente.delete({
      where: { id: parseInt(id) }
    })
    res.json({ mensagem: 'Cliente removido!' })
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar cliente' })
  }
})

module.exports = router