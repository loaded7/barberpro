const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const authMiddleware = require('./middlewares/auth')
const authRouter = require('./routes/auth')
const clientesRouter = require('./routes/clientes')
const barbeirosRouter = require('./routes/barbeiros')
const agendamentosRouter = require('./routes/agendamento')
const despesasRouter = require('./routes/despesas')
const relatorioRouter = require('./routes/relatorio')

app.use('/despesas', authMiddleware, despesasRouter)
app.use('/relatorio', authMiddleware, relatorioRouter)
app.use('/auth', authRouter)
app.use('/clientes', authMiddleware, clientesRouter)
app.use('/barbeiros', authMiddleware, barbeirosRouter)
app.use('/agendamentos', authMiddleware, agendamentosRouter)

app.get('/', (req, res) => {
  res.json({ mensagem: 'BarberPro API funcionando!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})