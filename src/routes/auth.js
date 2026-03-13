const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../prisma')

// Registro
router.post('/registro', async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body
    const senhaCriptografada = await bcrypt.hash(senha, 10)
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaCriptografada, role }
    })
    res.json({ mensagem: 'Usuário criado!', id: usuario.id })
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar usuário' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body
    const usuario = await prisma.usuario.findUnique({ where: { email } })
    if (!usuario) return res.status(401).json({ erro: 'Email ou senha inválidos' })

    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    if (!senhaValida) return res.status(401).json({ erro: 'Email ou senha inválidos' })

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )
    res.json({ token, nome: usuario.nome, role: usuario.role })
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao fazer login' })
  }
})

module.exports = router