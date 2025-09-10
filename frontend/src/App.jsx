import { useState } from "react";
import AuthForm from "./AuthForm";

function App() {
  const [mode, setMode] = useState("login");
  const [user, setUser] = useState(null);

  if (user) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h2>Welcome, {user.role}!</h2>
        <button
          onClick={() => {
            setUser(null);
            setMode("login");
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <button onClick={() => setMode("login")} disabled={mode === "login"}>
          Login
        </button>
        <button
          onClick={() => setMode("register")}
          disabled={mode === "register"}
        >
          Register
        </button>
      </div>
      <AuthForm type={mode} onAuth={setUser} />
    </div>
  );
}

export default App;
