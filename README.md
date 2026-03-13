# ✂️ BarberPro — Sistema de Gestão para Barbearia

> API REST completa para gerenciamento de barbearias masculinas, com autenticação, agendamentos, controle financeiro e deploy em produção.

![Node.js](https://img.shields.io/badge/Node.js-v24-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-black?style=flat-square&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?style=flat-square&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=flat-square&logo=jsonwebtokens)
![Railway](https://img.shields.io/badge/Deploy-Railway-purple?style=flat-square&logo=railway)

## 🌐 Demo

**API em produção:** [barberpro-production-5c08.up.railway.app](https://barberpro-production-5c08.up.railway.app)

---

## 📋 Sobre o Projeto

O BarberPro é um sistema de gestão desenvolvido para barbearias masculinas. O projeto nasceu como trabalho acadêmico e foi desenvolvido do zero com foco em boas práticas de desenvolvimento de software.

O sistema permite gerenciar agendamentos, clientes, barbeiros e finanças através de uma API REST segura com autenticação JWT.

---

## 🚀 Funcionalidades

- **Autenticação segura** — registro e login com JWT e senhas criptografadas com bcrypt
- **Gestão de agendamentos** — criar, listar, atualizar status e deletar agendamentos
- **Cadastro de clientes** — histórico completo de atendimentos por cliente
- **Perfil de barbeiros** — cadastro e vinculação aos agendamentos
- **Controle financeiro** — registro de receitas e despesas
- **Rotas protegidas** — todas as rotas exigem autenticação via Bearer Token

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| Node.js | Runtime JavaScript no servidor |
| Express | Framework web para criação da API |
| PostgreSQL | Banco de dados relacional |
| Prisma ORM | Mapeamento objeto-relacional e migrations |
| JWT | Autenticação stateless via tokens |
| bcryptjs | Criptografia de senhas |
| Neon | Banco PostgreSQL serverless na nuvem |
| Railway | Deploy e hospedagem da aplicação |

---

## 📁 Estrutura do Projeto

```
barberpro/
├── prisma/
│   ├── migrations/       # Histórico de alterações no banco
│   └── schema.prisma     # Modelos do banco de dados
├── src/
│   ├── middlewares/
│   │   └── auth.js       # Middleware de autenticação JWT
│   ├── routes/
│   │   ├── auth.js       # Registro e login
│   │   ├── agendamento.js
│   │   ├── clientes.js
│   │   └── barbeiros.js
│   ├── prisma.js         # Instância do Prisma Client
│   └── server.js         # Entrada da aplicação
├── .env                  # Variáveis de ambiente (não versionado)
├── .gitignore
└── package.json
```

---

## ⚙️ Como rodar localmente

### Pré-requisitos
- Node.js v18+
- Conta no [Neon](https://neon.tech) (banco PostgreSQL gratuito)

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/loaded7/barberpro.git
cd barberpro

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env na raiz com:
DATABASE_URL="sua_connection_string_do_neon"
JWT_SECRET="seu_segredo_jwt"

# Rode as migrations do banco
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

O servidor vai rodar em `http://localhost:3000`

---

## 📡 Endpoints da API

### Autenticação
```
POST /auth/registro   — Cria novo usuário
POST /auth/login      — Retorna token JWT
```

### Clientes (🔒 requer token)
```
GET    /clientes      — Lista todos os clientes
POST   /clientes      — Cria novo cliente
DELETE /clientes/:id  — Remove cliente
```

### Barbeiros (🔒 requer token)
```
GET  /barbeiros       — Lista todos os barbeiros
POST /barbeiros       — Cria novo barbeiro
```

### Agendamentos (🔒 requer token)
```
GET    /agendamentos      — Lista todos os agendamentos
POST   /agendamentos      — Cria novo agendamento
PATCH  /agendamentos/:id  — Atualiza status
DELETE /agendamentos/:id  — Remove agendamento
```

### Exemplo de uso

```bash
# Login
curl -X POST https://barberpro-production-5c08.up.railway.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seu@email.com","senha":"123456"}'

# Listar clientes (com token)
curl https://barberpro-production-5c08.up.railway.app/clientes \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 🗄️ Modelo do Banco de Dados

```
Usuario         Cliente         Barbeiro
─────────       ─────────       ─────────
id              id              id
nome            nome            nome
email           telefone        especialidade
senha           email           telefone
role            observacoes     criadoEm
criadoEm        criadoEm
                    │               │
                    └───────────────┘
                          │
                    Agendamento
                    ─────────────
                    id
                    clienteId (FK)
                    barbeiroId (FK)
                    servico
                    valor
                    data
                    hora
                    status
                    observacoes
                    criadoEm
```

---

## 👨‍💻 Autor

**Thomas Modesto**
- GitHub: [@loaded7](https://github.com/loaded7)

---

## 📄 Licença

Este projeto está sob a licença MIT.