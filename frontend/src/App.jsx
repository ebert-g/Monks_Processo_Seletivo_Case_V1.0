import { useState } from "react";
import LoginPage from "./components/LoginPage";
import MetricsDashboard from "./components/MetricsDashboard";

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    console.log("Usuários logado no App", userData);
    setUser(userData);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Processo Seletivo | Case</h1>
      {!user ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <MetricsDashboard user={user} />
      )}
    </div>
  );
}

export default App;
