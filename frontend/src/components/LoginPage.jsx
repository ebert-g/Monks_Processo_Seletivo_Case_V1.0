import React, { useState } from "react";

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login 200 OK", data);
        onLoginSuccess(data);
      } else {
        setError(data.detail || "Ocorreu um erro no login.");
      }
    } catch (err) {
      console.error("Erro de conexao", err);
      setError("Nao foi possivel conectar ao servidor. Tente novamente!");
    }
  };

  return (
    <div className="card p-4" style={{ maxWidth: "400px", margin: "auto" }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Usuário:
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="alert alert-danger">{error}</p>}
        <button type="submit" className="btn btn-primary w-100">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
