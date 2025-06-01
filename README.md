# **Jobify** – Plataforma de Busca e Favoritos de Vagas

<div align="start">
  <img src="https://img.shields.io/badge/React-Frontend%20Interativo-0A66C2?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-Tipagem%20Estática-0A66C2?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-Estilo%20Utilitário-0A66C2?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/Frame--Motion-Animações%20Suaves-0A66C2?style=for-the-badge&logo=framermotion&logoColor=white">
  <img src="https://img.shields.io/badge/ShadCN-Componentes%20Modernos-0A66C2?style=for-the-badge&logo=vercel&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-Build%20Rápido-0A66C2?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-Servidor%20Backend-0A66C2?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-API%20RESTful-0A66C2?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/Sequelize-ORM%20SQL-0A66C2?style=for-the-badge&logo=sequelize&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-Banco%20de%20Dados-0A66C2?style=for-the-badge&logo=mysql&logoColor=white">
</div>

---

## **Como Rodar o Projeto Localmente** 

- **MySQL** (recomenda-se o uso do MySQL Workbench) instalado
- Abra seu MySQL Workbench e execute:

```sql
CREATE DATABASE jobify;
```

- Clone o repositório:
```bash
git clone https://github.com/seu-usuario/jobify.git
```

- Configure as variáveis de ambiente:
  - Acesse o arquivo .env.example no diretório da pasta backend.
  - Preencha com seus dados (host, usuário, senha etc.) e renomeie para .env.

- Instale as dependências e rode o backend:
```bash
cd backend
npm i
node dist/server.js
```

- Instale as dependências e rode o frontend:
```bash
cd frontend
npm i
npm run dev
```

---

## **Funcionalidades da Plataforma** 

- 🔍 **Exibição de vagas** via API do Remotive.
- 📂 **Filtragem por categoria** de vagas.
- 🔎 Campo de **busca** para encontrar vagas por palavras-chave.
- ❤️ **Contador de vagas favoritadas** visível na interface.
- ➕ Botão **"Ver mais vagas"**: carrega +18 vagas por clique para evitar sobrecarga.
- ⭐ **API de favoritos**: salva as vagas favoritas no banco de dados.
- 💾 **Persistência de favoritos** na página "Favorite", mesmo após atualizar.
- 🧾 **Modal de detalhes da vaga** com botão para se candidatar.
- 🧱 Arquitetura **MVC** organizada e modular.
- 📱 **Responsividade** para todos os dispositivos.
- ✨ **Animações** com Frame Motion e componentes animados com React Bits.
- ♿ **Acessibilidade** com `alt`, `aria-label` e `onekeys` para navegação assistiva.

---

## **Desafios Técnicos Superados** 

- 📘 **Primeiro contato com TypeScript**, estudado com curso da Alura e documentação.
- 🎨 **TailwindCSS e ShadCN**: aprendidos via documentação oficial.
- ⏱️ **Produção completa em 3 dias**:
  - **Dia 1**: Aprendizado de TypeScript, Tailwind e ShadCN + integração com Remotive + API de favoritos com persistência em banco.
  - **Dia 2**: Criação da página de favoritos + implementação de Frame Motion.
  - **Dia 3**: Finalização do design, ajustes visuais e responsividade.
- 🔁 Integração completa de Frontend com Backend usando  **TypeScript** -> **Node** + **Express**, **Axios**, **Sequelize** e **MySQL**.

---

## **Tecnologias e Metodologias Utilizadas** 🛠️

| **Tecnologia/Metodologia** | **Descrição** | **Badge** |
|----------------------------|-----------------------------|----------------|
| **React**                  | Biblioteca para UI | ![React](https://img.shields.io/badge/React-0A66C2?style=for-the-badge&logo=react&logoColor=white) |
| **TypeScript**             | Tipagem segura no projeto | ![TypeScript](https://img.shields.io/badge/TypeScript-0A66C2?style=for-the-badge&logo=typescript&logoColor=white) |
| **TailwindCSS**            | Estilização rápida e utilitária | ![Tailwind](https://img.shields.io/badge/TailwindCSS-0A66C2?style=for-the-badge&logo=tailwindcss&logoColor=white) |
| **ShadCN**                 | Componentes acessíveis e modernos | ![ShadCN](https://img.shields.io/badge/ShadCN-0A66C2?style=for-the-badge&logo=vercel&logoColor=white) |
| **Frame Motion**           | Animações visuais suaves | ![Framer Motion](https://img.shields.io/badge/Framer--Motion-0A66C2?style=for-the-badge&logo=framermotion&logoColor=white) |
| **React Bits**             | Componentes animados reutilizáveis | 🧩 |
| **Vite**                   | Ferramenta de build ultra-rápida | ![Vite](https://img.shields.io/badge/Vite-0A66C2?style=for-the-badge&logo=vite&logoColor=white) |
| **Node.js**                | Backend para manipulação de dados | ![Node](https://img.shields.io/badge/Node.js-0A66C2?style=for-the-badge&logo=node.js&logoColor=white) |
| **Express.js**             | Framework leve para APIs REST | ![Express](https://img.shields.io/badge/Express-0A66C2?style=for-the-badge&logo=express&logoColor=white) |
| **Sequelize**              | ORM para integração com SQL | ![Sequelize](https://img.shields.io/badge/Sequelize-0A66C2?style=for-the-badge&logo=sequelize&logoColor=white) |
| **MySQL**                  | Banco de dados relacional | ![MySQL](https://img.shields.io/badge/MySQL-0A66C2?style=for-the-badge&logo=mysql&logoColor=white) |
| **Axios**                  | Comunicação com APIs | 🛰️ |
| **Arquitetura MVC**        | Organização modular de código | 🧱 |
| **Acessibilidade**         | Interface inclusiva e navegação por teclado | ♿ |

---
