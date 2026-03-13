const express = require('express')
const router = express.Router()
const prisma = require('../prisma')

router.get('/', async (req, res) => {
  try {
    const { inicio, fim } = req.query

    const where = { status: 'Concluído' }
    if (inicio && fim) {
      where.data = { gte: inicio, lte: fim }
    }

    const agendamentos = await prisma.agendamento.findMany({
      where,
      include: { cliente: true, barbeiro: true },
      orderBy: { data: 'asc' }
    })

    const despesas = await prisma.despesa.findMany({
      where: inicio && fim ? { data: { gte: inicio, lte: fim } } : {},
      orderBy: { data: 'asc' }
    })

    // Faturamento total
    const receita = agendamentos.reduce((s, a) => s + a.valor, 0)
    const totalDespesas = despesas.reduce((s, d) => s + d.valor, 0)
    const lucro = receita - totalDespesas

    // Ranking de serviços
    const servicos = {}
    agendamentos.forEach(a => {
      if (!servicos[a.servico]) servicos[a.servico] = { quantidade: 0, total: 0 }
      servicos[a.servico].quantidade++
      servicos[a.servico].total += a.valor
    })

    // Ranking de barbeiros
    const barbeiros = {}
    agendamentos.forEach(a => {
      const nome = a.barbeiro?.nome || 'Desconhecido'
      if (!barbeiros[nome]) barbeiros[nome] = { quantidade: 0, total: 0 }
      barbeiros[nome].quantidade++
      barbeiros[nome].total += a.valor
    })

    // Receita por dia
    const porDia = {}
    agendamentos.forEach(a => {
      porDia[a.data] = (porDia[a.data] || 0) + a.valor
    })

    res.json({
      receita,
      totalDespesas,
      lucro,
      totalAgendamentos: agendamentos.length,
      servicos,
      barbeiros,
      porDia,
      despesas
    })
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao gerar relatório' })
  }
})

module.exports = router