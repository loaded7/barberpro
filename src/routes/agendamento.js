const express = require('express')
const router = express.Router()
const prisma = require('../prisma')

// Lista todos os agendamentos
// Lista agendamentos com paginação
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const [agendamentos, total] = await Promise.all([
      prisma.agendamento.findMany({
        skip,
        take: limit,
        include: { cliente: true, barbeiro: true },
        orderBy: { criadoEm: 'desc' }
      }),
      prisma.agendamento.count()
    ])

    res.json({
      dados: agendamentos,
      paginacao: {
        total,
        pagina: page,
        limite: limit,
        totalPaginas: Math.ceil(total / limit)
      }
    })
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