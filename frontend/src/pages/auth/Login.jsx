import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        window.location.href = "http://localhost:5000/home";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="root">
      <div className="card">
        <div className="logo">🍱</div>
        <h1 className="title">CanteenXpress</h1>
        <p className="subtitle">Sign in to place your order</p>

        {error && <div className="error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="input"
          />

          <div className="pw-wrap">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="input"
            />
            <button
              type="button"
              className="toggle"
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? <span className="spinner" /> : "Sign In →"}
          </button>
        </form>

        <p className="footer">
          No account? <Link to="/register" className="link">Register</Link>
        </p>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f0d0b;
          font-family: 'DM Sans', system-ui, sans-serif;
          padding: 20px;
        }

        .card {
          background: #1a1612;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 44px 36px;
          width: 100%;
          max-width: 380px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.5);
          text-align: center;
        }

        .logo { font-size: 40px; margin-bottom: 10px; }

        .title {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }

        .subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 28px;
        }

        .error {
          background: rgba(220,60,60,0.12);
          border: 1px solid rgba(220,60,60,0.35);
          color: #ff8080;
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 10px;
          margin-bottom: 20px;
          text-align: left;
        }

        .form { display: flex; flex-direction: column; gap: 14px; }

        .input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 14px;
          color: #fff;
          outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
        }
        .input::placeholder { color: rgba(255,255,255,0.25); }
        .input:focus { border-color: #ff6b2b; }

        .pw-wrap { position: relative; }
        .pw-wrap .input { padding-right: 44px; }

        .toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 0;
          line-height: 1;
        }

        .btn {
          width: 100%;
          background: linear-gradient(135deg, #ff6b2b, #e8400c);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 13px;
          font-size: 15px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          margin-top: 4px;
          transition: opacity 0.2s, transform 0.15s;
        }
        .btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .footer {
          margin-top: 24px;
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }

        .link {
          color: #ff6b2b;
          text-decoration: none;
          font-weight: 500;
          margin-left: 3px;
        }
        .link:hover { color: #ffaa80; }
      `}</style>
    </div>
  );
}