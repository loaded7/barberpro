const express = require('express')
const router = express.Router()
const prisma = require('../prisma')

// Lista todos os barbeiros
router.get('/', async (req, res) => {
  try {
    const barbeiros = await prisma.barbeiro.findMany()
    res.json(barbeiros)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar barbeiros' })
  }
})

// Cria um novo barbeiro
router.post('/', async (req, res) => {
  try {
    const { nome, especialidade, telefone } = req.body
    const barbeiro = await prisma.barbeiro.create({
      data: { nome, especialidade, telefone }
    })
    res.json(barbeiro)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar barbeiro' })
  }
})

module.exports = router