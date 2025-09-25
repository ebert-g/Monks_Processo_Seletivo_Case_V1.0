import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

class UserLogin(BaseModel):
    username: str
    password: str


app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware (
    CORSMiddleware,
    allow_origins=origins,       
    allow_credentials=True,      
    allow_methods=["*"],         
    allow_headers=["*"],
)

try: 
    users_df = pd.read_csv('data/users.csv').set_index('username')

    metricas_df = pd.read_csv('data/metrics.csv')

    print("Arquivos CSV carregados!")
except FileNotFoundError:
    print("Erro: arquivo nao encontrado!")
    users_df = None
    metricas_df = None

# VERIFICACAO SIMPLES - 
@app.get("/")
def read_root():
    return {"message": "API DE METRICAS ON!"}

# LOGIN - 
@app.post("/login")
def login(user_credentials: UserLogin):
    if users_df is None:
        raise HTTPException(status_code=500, detail="Erro interno do servidor: dados de user nao carregados")
    
    credentials = user_credentials.dict();
    username = credentials['username']
    password = credentials['password']

    if username in users_df.index:
        correct_password = users_df.loc[username, 'password']
        if password == correct_password:
            user_role = users_df.loc[username, 'role']
            return {
                "message": "Login bem-sucedido!",
                "username": username,
                "role": user_role
            }
    raise HTTPException(
        status_code=401,
        detail="Credenciais invalidas",
        headers={"WWW-Authenticate": "Bearer"}
    )
    

# METRICAS - 

@app.get("/metrics")
def get_metrics(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    sort_by: Optional[str] = None,
    order: Optional[str] = 'asc',
    role: Optional[str] = None,
    page: int = 1,
    size: int = 100
):
    if metricas_df is None:
        raise HTTPException(status_code=500, detail="Erro interno do servidor: Metricas não carregadas.")
    
    df = metricas_df.copy()
    
    df['date'] = pd.to_datetime(df['date'])
    
    if start_date:
        df = df[df['date'] >= datetime.strptime(start_date, '%Y-%m-%d')]
    if end_date:
        df = df[df['date'] <= datetime.strptime(end_date, '%Y-%m-%d')]
        
    if sort_by:
        if sort_by not in df.columns:
            raise HTTPException(status_code=400, detail=f"Coluna '{sort_by}' invalida para ordenacao.")
        is_ascending = order.lower() == 'asc'
        df = df.sort_values(by=sort_by, ascending=is_ascending)
        
    if role != 'admin':
        if 'cost_micros' in df.columns:
            df = df.drop(columns=['cost_micros'])
            
    total_items = len(df)
    start_index = (page - 1) * size
    end_index = start_index + size
    
    paginated_df = df.iloc[start_index:end_index]
    
    data = paginated_df.to_dict(orient='records')
    
    return {
        "total_items": total_items,
        "total_pages": (total_items + size - 1) // size,
        "current_page": page,
        "page_size": size,
        "data": data
    }