import axios from "axios";
import { useState } from "react";

export default function AuthForm({ type, onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const url = `/api/auth/${type}`;
      const payload =
        type === "register" ? { email, password, role } : { email, password };
      const res = await axios.post(url, payload, { withCredentials: true });
      onAuth(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 320,
        margin: "1rem auto",
        padding: 16,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2>{type === "register" ? "Register" : "Login"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      {type === "register" && (
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        >
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>
      )}
      <button type="submit" style={{ width: "100%" }}>
        {type === "register" ? "Register" : "Login"}
      </button>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </form>
  );
}
