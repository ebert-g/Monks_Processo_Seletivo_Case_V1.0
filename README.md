# Case Técnico de Engenharia - Monks | Aplicação de Métricas

Olá! Este repositório contém a resolução do case técnico para o processo seletivo de Engenheiro de Software Estagiário na Monks.

## Visão Geral do Projeto

A aplicação é uma solução full-stack desenvolvida para visualizar dados de performance de marketing. Ela consiste em uma API RESTful em Python (FastAPI) que serve os dados e um frontend interativo em React que os consome e exibe ao usuário.

O projeto cumpre todos os requisitos propostos, incluindo:
- Sistema de autenticação por usuário e senha.
- Exibição de dados em tabela.
- Funcionalidades de filtro por data e ordenação por colunas.
- Paginação para lidar com um grande volume de dados (94 MB).
- Sistema de permissão para visualização de colunas sensíveis (`cost_micros`).

---

## Estrutura do Projeto

Este repositório está organizado em duas pastas principais, cada uma contendo uma parte da aplicação:

### 📁 `/backend_api`
- Contém a API desenvolvida em **Python** com o framework **FastAPI**.
- Responsável por ler os arquivos `.csv`, autenticar usuários, processar e servir os dados.
- Para instruções detalhadas de como configurar e executar o backend, por favor, consulte o [**README do Backend](./backend_api/README.md)**.

### 📁 `/frontend`
- Contém a interface do usuário desenvolvida com **React** e **Vite**.
- Responsável por se comunicar com a API, exibir o formulário de login e o dashboard com a tabela de métricas interativa.
- Para instruções detalhadas de como configurar e executar o frontend, por favor, consulte o [**README do Frontend](./frontend/README.md)**.

---

## Como Começar

### Pré-requisitos Gerais
Para executar o projeto completo, você precisará ter os seguintes softwares instalados em sua máquina:
- **Python 3.8+**
- **Node.js v20.x+** (com `npm`)

### Ordem de Execução
1.  Primeiro, siga as instruções no `README.md` da pasta `/backend_api` para iniciar o servidor da API.
2.  Depois, siga as instruções no `README.md` da pasta `/frontend` para iniciar a aplicação React.

**É fundamental que o backend esteja em execução para que o frontend funcione corretamente.**

---

Obrigado pela oportunidade de participar deste desafio!