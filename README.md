# Jobify - Site de Vagas de Emprego

Este projeto é uma aplicação **full-stack** para listagem, visualização e gerenciamento de vagas de emprego, desenvolvida como parte do desafio **Jobify** da **MBRAS**.

## Tecnologias Utilizadas

- **Frontend:** Next.js, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion  
- **Backend:** Express.js, Supabase (PostgreSQL + Auth), JWT, bcrypt, dotenv, CORS

## Funcionalidades

- Cadastro e login de usuários com autenticação JWT  
- Listagem de vagas públicas com filtros por categoria  
- Página de detalhes de cada vaga  
- Sistema de favoritos (usuário logado pode favoritar/desfavoritar vagas)  
- Página de listagem de favoritos  
- Layout responsivo (mobile e desktop)  
- Código organizado com boas práticas e Clean Code  

## Como Rodar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/FabioAsseiro/mbras-jobify-challenge.git
cd mbras-jobify-challenge
```
2. Instale as dependecias
```bash
cd frontend
npm install
cd ..
cd backend
npm install
```

3. Crie as tabela no supabase:

<pre lang="markdown"> sql CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  job_id INTEGER NOT NULL,
  job_title TEXT NOT NULL,
  job_url TEXT NOT NULL,
  job_company TEXT,
  job_logo TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);  </pre>

4. Crie um arquivo .env dentro da pasta backend com as credenciais do Supabase:

<pre> SUPABASE_URL=https://kxvrqazhseahahuvpmhr.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.........(chave private)  </pre>

5. Execute o backend:

cd backend
npx ts-node src/index.ts

6. execute o frontend:
cd frontend
npm run start

