import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginRegister.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ email, password }));
    navigate("/");
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
