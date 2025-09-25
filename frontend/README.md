# Projeto de Métricas - Frontend

Esta é a interface de usuário (frontend) para a aplicação de visualização de métricas, desenvolvida em React. A aplicação consome a API do backend para exibir os dados de forma interativa.

## Tecnologias Utilizadas

- **React:** Biblioteca para a construção da interface.
- **Vite:** Ferramenta de build para um desenvolvimento rápido.
- **Bootstrap:** Para a estilização dos componentes.
- **Fetch API:** Para a comunicação com o backend.

## Pré-requisitos

- Node.js (versão 20.x ou superior recomendada).
- `npm` (gerenciador de pacotes do Node.js).

## Como Executar

1.  **Navegue até a pasta do frontend:**

    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

4.  **Acesse a aplicação:**
    - Abra seu navegador e acesse: `http://localhost:5173` (ou a porta indicada no seu terminal).

## Funcionalidades

- Sistema de login que se comunica com a API.
- Dashboard para visualização dos dados em uma tabela.
- Filtro de dados por intervalo de datas.
- Ordenação dos dados por qualquer coluna, de forma ascendente ou descendente.
- Paginação para lidar com o grande volume de dados de forma eficiente.
- Interface responsiva e agradável utilizando Bootstrap.

**Importante:** A API do backend (`http://127.0.0.1:8000`) precisa estar em execução para que o frontend funcione corretamente.
