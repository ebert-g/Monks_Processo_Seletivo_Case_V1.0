# Projeto de Métricas - Backend (API)

## Tecnologias Utilizadas

- **Python 3**
- **FastAPI:** Para a construção da API.
- **Pandas:** Para a leitura e manipulação dos dados dos arquivos CSV.
- **Uvicorn:** Como servidor para a aplicação FastAPI.

## Pré-requisitos

- Python 3.8 ou superior instalado.
- `pip` (gerenciador de pacotes do Python).

**IMPORTANTE:** O arquivo `metrics.csv` (94 MB) é muito grande para ser incluído neste repositório. Por favor, faça o download a partir do seguinte link e coloque-o dentro da pasta `data/` antes de iniciar o servidor:
https://drive.google.com/drive/folders/1C3F4N65TPcQA3FgDyZfG7pM1Ux-UzWlN?usp=sharing

## Como Executar

1.  **Navegue até a pasta do backend:**

    ```bash
    cd backend
    ```

2.  **Crie e ative um ambiente virtual:**

    ```bash
    # Criar o ambiente
    python -m venv venv

    # Ativar no Windows
    .\venv\Scripts\activate

    # Ativar no macOS/Linux
    source venv/bin/activate
    ```

3.  **Instale as dependências:**
    Certifique-se de que o arquivo `requirements.txt` está na pasta.

    ```bash
    pip install -r requirements.txt
    ```

4.  **Adicione os dados:**
    Garanta que os arquivos `metrics.csv` (94 MB) e `users.csv` estejam dentro da pasta `data/`.

5.  **Inicie o servidor:**

    ```bash
    uvicorn main:app --reload
    ```

6.  **Acesse a API:**
    - A API estará disponível em: `http://127.0.0.1:8000`
    - A documentação interativa (Swagger UI) estará disponível em: `http://127.0.0.1:8000/docs`

## Endpoints da API

- `POST /login`: Autentica um usuário com base em `username` e `password`. Retorna os dados do usuário e sua `role` (`admin` ou `user`).
- `GET /metrics`: Retorna os dados de métricas com paginação. Aceita parâmetros para filtro de data, ordenação e `role` do usuário.
