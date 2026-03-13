const express = require('express')
const router = express.Router()
const prisma = require('../prisma')

// Lista todos os agendamentos
router.get('/', async (req, res) => {
  try {
    const agendamentos = await prisma.agendamento.findMany({
      include: {
        cliente: true,
        barbeiro: true
      },
      orderBy: {
        criadoEm: 'desc'
      }
    })
    res.json(agendamentos)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar agendamentos' })
  }
})

// Cria um novo agendamento
router.post('/', async (req, res) => {
  try {
    const { clienteId, barbeiroId, servico, valor, data, hora, observacoes } = req.body
    const agendamento = await prisma.agendamento.create({
      data: {
        clienteId,
        barbeiroId,
        servico,
        valor,
        data,
        hora,
        observacoes
      }
    })
    res.json(agendamento)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar agendamento' })
  }
})

// Atualiza status do agendamento
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const agendamento = await prisma.agendamento.update({
      where: { id: parseInt(id) },
      data: { status }
    })
    res.json(agendamento)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar agendamento' })
  }
})

// Deleta agendamento
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await prisma.agendamento.delete({
      where: { id: parseInt(id) }
    })
    res.json({ mensagem: 'Agendamento removido!' })
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar agendamento' })
  }
})

module.exports = router