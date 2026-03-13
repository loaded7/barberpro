const express = require('express')
const router = express.Router()
const prisma = require('../prisma')

// Lista todas as despesas
router.get('/', async (req, res) => {
  try {
    const despesas = await prisma.despesa.findMany({
      orderBy: { data: 'desc' }
    })
    res.json(despesas)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar despesas' })
  }
})

// Cria nova despesa
router.post('/', async (req, res) => {
  try {
    const { descricao, valor, categoria, data } = req.body
    const despesa = await prisma.despesa.create({
      data: { descricao, valor: parseFloat(valor), categoria, data }
    })
    res.json(despesa)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar despesa' })
  }
})

// Deleta despesa
router.delete('/:id', async (req, res) => {
  try {
    await prisma.despesa.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ mensagem: 'Despesa removida!' })
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar despesa' })
  }
})

module.exports = router