# ✂️ BarberPro

> Sistema completo de gestão para barbearias masculinas com dashboard financeiro, agendamentos, relatórios e autenticação JWT.

![Node.js](https://img.shields.io/badge/Node.js-v24-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Railway](https://img.shields.io/badge/Deploy-Railway-0B0D0E?style=flat-square&logo=railway&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

## 🌐 Demo

**🔗 Sistema em produção:** [barberpro-production-5c08.up.railway.app](https://barberpro-production-5c08.up.railway.app)

> Login de demonstração: `thomas@barberpro.com` / `123456`

![BarberPro Dashboard](https://i.imgur.com/placeholder.png)

---

## 📋 Sobre

O BarberPro é um sistema de gestão fullstack desenvolvido para barbearias masculinas. O projeto resolve um problema real — a maioria das barbearias ainda gerencia agendamentos por WhatsApp e controle financeiro por planilha.

O sistema oferece uma interface profissional para gerenciar toda a operação da barbearia em um único lugar.

---

## 🚀 Funcionalidades

- **Dashboard** — faturamento do dia, métricas do mês, gráficos de serviços e status
- **Agendamentos** — criar, listar com paginação, filtrar por status e exportar CSV
- **Clientes** — cadastro completo com histórico de atendimentos
- **Barbeiros** — perfil com total de atendimentos e faturamento por profissional
- **Relatório financeiro** — análise por período personalizado, ranking de serviços e barbeiros
- **Controle de despesas** — registro por categoria com cálculo de lucro líquido
- **Autenticação JWT** — login seguro com bcrypt e tokens de 8 horas
- **API documentada** — Swagger UI em `/docs`

---

## 🛠️ Stack

| Tecnologia | Uso |
|---|---|
| Node.js + Express | Servidor e API REST |
| PostgreSQL (Neon) | Banco de dados na nuvem |
| Prisma ORM | Modelagem e migrations |
| JWT + bcryptjs | Autenticação e criptografia |
| Swagger UI | Documentação interativa |
| Railway | Deploy e hospedagem |

---

## 📁 Estrutura

```
barberpro/
├── prisma/
│   ├── migrations/        # Histórico de migrations
│   └── schema.prisma      # Modelos do banco
├── public/
│   └── index.html         # Frontend integrado
├── src/
│   ├── middlewares/
│   │   └── auth.js        # Middleware JWT
│   ├── routes/
│   │   ├── auth.js        # Login e registro
│   │   ├── agendamento.js # CRUD agendamentos
│   │   ├── clientes.js    # CRUD clientes
│   │   ├── barbeiros.js   # CRUD barbeiros
│   │   ├── despesas.js    # CRUD despesas
│   │   └── relatorio.js   # Relatórios financeiros
│   ├── prisma.js          # Instância Prisma Client
│   ├── swagger.js         # Configuração Swagger
│   └── server.js          # Entry point
├── .env.example
└── package.json
```

---

## ⚙️ Como rodar localmente

### Pré-requisitos
- Node.js v18+
- Conta no [Neon](https://neon.tech) (PostgreSQL gratuito)

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/loaded7/barberpro.git
cd barberpro

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# Execute as migrations
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

Acesse: `http://localhost:3000`
Documentação: `http://localhost:3000/docs`

### Variáveis de ambiente

```env
DATABASE_URL="postgresql://usuario:senha@host/barberpro"
JWT_SECRET="seu_segredo_jwt"
PORT=3000
```

---

## 📡 Endpoints

### Autenticação
| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/registro` | Cadastro de usuário |
| POST | `/auth/login` | Login e geração de token |

### Agendamentos 🔒
| Método | Rota | Descrição |
|---|---|---|
| GET | `/agendamentos?page=1&limit=10` | Lista com paginação |
| POST | `/agendamentos` | Cria agendamento |
| PATCH | `/agendamentos/:id` | Atualiza status |
| DELETE | `/agendamentos/:id` | Remove agendamento |

### Relatório 🔒
| Método | Rota | Descrição |
|---|---|---|
| GET | `/relatorio?inicio=2026-01-01&fim=2026-01-31` | Relatório por período |

> 🔒 Rotas protegidas requerem `Authorization: Bearer <token>`

---

## 👨‍💻 Autor

**Thomas Modesto**
- GitHub: [@loaded7](https://github.com/loaded7)
- LinkedIn: [thomasmodesto](https://linkedin.com/in/thomasmodesto)

---

## 📄 Licença

MIT License — veja [LICENSE](LICENSE) para mais detalhes.
