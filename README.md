# Desafio Full Stack - Gerenciamento de Produtos

Este projeto consiste em uma aplicação Full Stack para o gerenciamento de produtos, com um backend em Node.js (TypeScript) e um frontend em React. A aplicação permite realizar operações de CRUD (Criar, Ler, Atualizar e Deletar) em um catálogo de produtos.

## ✨ Tecnologias Utilizadas

A aplicação foi construída utilizando um conjunto de tecnologias modernas e robustas, tanto no backend quanto no frontend.

#### **Backend**
* **Node.js com TypeScript:** Plataforma de desenvolvimento robusta e tipada.
* **Express.js:** Framework minimalista para a criação da API REST.
* **Prisma:** ORM para interação com o banco de dados, gerenciamento de schema e migrations.
* **PostgreSQL:** Banco de dados relacional para armazenamento dos produtos.
* **Swagger (OpenAPI):** Para documentação interativa e testes da API.
* **Jest & Supertest:** Para a suíte de testes unitários e de integração.

#### **Frontend**
* **React com Vite:** Biblioteca para construção de interfaces de usuário.
* **TypeScript:** Para adicionar tipagem estática e segurança ao código.
* **TanStack Table (React Table):** Biblioteca para a criação de tabelas e data grids.
* **shadcn/ui:** Coleção de componentes de UI reutilizáveis, construídos com Radix UI e Tailwind CSS.
* **Tailwind CSS:** Framework CSS "utility-first" para estilização rápida e consistente.
* **Fetch:** Para realizar as chamadas HTTP para a API do backend.

#### **DevOps & Infraestrutura**
* **Docker & Docker Compose:** Para containerizar a aplicação e garantir um ambiente de desenvolvimento e produção consistente e isolado.

---

## 🚀 Como Executar o Projeto

Com o Docker instalado, subir a aplicação completa (backend, frontend e banco de dados) é muito simples.

**Pré-requisitos:**
* [Node.js](https://nodejs.org/en/) (v18 ou superior)
* [Docker](https://www.docker.com/products/docker-desktop/)

**Passos:**
1.  Clone este repositório:
    ```bash
    git clone https://github.com/rafcez/teste_guilherme.git
    cd teste_guilherme
    ```

2.  Construa as imagens e inicie os contêineres com Docker Compose:
    ```bash
    cd backend
    docker compose up --build
    ```

3.  Clone este repositório:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  Acesse as aplicações:
    * **Frontend:** [http://localhost:5173](http://localhost:5173)
    * **Backend (API):** [http://localhost:3000](http://localhost:3000)
    * **Documentação da API (Swagger):** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🛠️ Detalhes da Implementação

#### **Backend**
A arquitetura do backend segue o padrão **Controller -> Service -> Model (ORM)**.

* **Migrations Automáticas:** Ao iniciar o contêiner do backend, um script de `entrypoint.sh` é executado. Este script roda o comando `npx prisma migrate deploy`, garantindo que o banco de dados esteja sempre com o schema mais recente antes de a aplicação iniciar. Isso automatiza a criação e atualização da tabela de produtos.
* **Paginação:** A rota `GET /products` foi implementada com paginação no lado do servidor. Ela aceita os parâmetros `page` e `pageSize` e retorna um objeto contendo os dados da página atual e o total de registros.

#### **Frontend**
O frontend foi estruturado com foco em componentização e separação de responsabilidades.

* **Tabela de Dados:** O componente principal utiliza a biblioteca `TanStack Table` para gerenciar o estado da tabela (ordenação, filtragem e paginação).
* **Paginação:** A interface de paginação é completa, permitindo ao usuário navegar entre as páginas, ir para a primeira/última e selecionar a quantidade de itens por página. Essa interação está conectada à API do backend para buscar os dados sob demanda.

---

## ✅ Testes

A qualidade do código do backend é garantida por uma suíte de testes que cobre as principais funcionalidades da aplicação.

#### **Estratégia de Testes**
Foram implementados dois tipos de testes para o backend:

1.  **Testes Unitários:**
    * **Foco:** Testar a camada de `Service` (`ProductService.ts`) de forma isolada.
    * **Como funciona:** Utiliza o **Jest** para simular (mockar) completamente o `PrismaClient`. Isso significa que os testes são executados sem qualquer conexão com o banco de dados, tornando-os extremamente rápidos e confiáveis para validar a lógica de negócio.

2.  **Testes de Integração:**
    * **Foco:** Testar o fluxo completo da API, desde a requisição HTTP até a resposta.
    * **Como funciona:** Utiliza o **Jest** em conjunto com o **Supertest** para fazer chamadas HTTP reais aos endpoints da API (ex: `POST /api/v1/products`). Esses testes interagem com um banco de dados de teste real (gerenciado pelo Docker) para garantir que a integração entre o Controller, o Service e o banco de dados está funcionando corretamente.

#### **Como Rodar os Testes**

Para executar todos os testes do backend, navegue até a pasta `backend` e rode o comando:

```bash
cd backend
npm test
