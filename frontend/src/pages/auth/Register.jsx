import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleStep1 = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Please enter your name");
    if (!form.email.trim()) return setError("Please enter your email");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.phone);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const strength = form.password.length;
  const strengthLabel = strength === 0 ? "" : strength < 4 ? "Too short" : strength < 7 ? "Weak" : strength < 10 ? "Good" : "Strong 💪";
  const strengthColor = strength < 4 ? "#ef4444" : strength < 7 ? "#f97316" : strength < 10 ? "#eab308" : "#22c55e";

  return (
    <div className="root">
      <div className="card">
        <div className="logo">🍱</div>
        <h1 className="title">CanteenXpress</h1>

        <div className="steps">
          <div className={`dot ${step >= 1 ? "on" : ""}`} />
          <div className={`line ${step >= 2 ? "on" : ""}`} />
          <div className={`dot ${step >= 2 ? "on" : ""}`} />
        </div>

        <p className="subtitle">
          {step === 1 ? "Step 1 of 2 — About you" : "Step 2 of 2 — Set password"}
        </p>

        {error && <div className="error">⚠️ {error}</div>}

        {step === 1 && (
          <form onSubmit={handleStep1} className="form">
            <input type="text" name="name" placeholder="Full name" value={form.name} onChange={handleChange} required className="input" />
            <input type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} required className="input" />
            <input type="tel" name="phone" placeholder="Phone (optional)" value={form.phone} onChange={handleChange} className="input" />
            <button type="submit" className="btn">Continue →</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="form">
            <div className="pw-wrap">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password (min 6 chars)"
                value={form.password}
                onChange={handleChange}
                required
                className="input"
              />
              <button type="button" className="toggle" onClick={() => setShowPassword((p) => !p)}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {form.password && (
              <div className="strength">
                <div className="strength-bar">
                  <div className="strength-fill" style={{ width: `${Math.min(100, (strength / 12) * 100)}%`, background: strengthColor }} />
                </div>
                <span className="strength-label" style={{ color: strengthColor }}>{strengthLabel}</span>
              </div>
            )}

            <div className="pw-wrap">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div className="row">
              <button type="button" className="back" onClick={() => { setStep(1); setError(""); }}>← Back</button>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? <span className="spinner" /> : "Create Account ✓"}
              </button>
            </div>
          </form>
        )}

        <p className="footer">
          Already have an account? <Link to="/login" className="link">Sign in</Link>
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
          margin-bottom: 16px;
        }

        .steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-bottom: 8px;
        }
        .dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          transition: background 0.3s;
        }
        .dot.on { background: #ff6b2b; }
        .line {
          width: 40px; height: 2px;
          background: rgba(255,255,255,0.1);
          margin: 0 6px;
          border-radius: 2px;
          transition: background 0.3s;
        }
        .line.on { background: #ff6b2b; }

        .subtitle {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 24px;
        }

        .error {
          background: rgba(220,60,60,0.12);
          border: 1px solid rgba(220,60,60,0.35);
          color: #ff8080;
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 10px;
          margin-bottom: 16px;
          text-align: left;
        }

        .form { display: flex; flex-direction: column; gap: 12px; }

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
        }

        .strength { display: flex; align-items: center; gap: 10px; }
        .strength-bar {
          flex: 1;
          height: 3px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
        }
        .strength-fill { height: 100%; border-radius: 4px; transition: width 0.3s, background 0.3s; }
        .strength-label { font-size: 11px; white-space: nowrap; }

        .row { display: flex; gap: 10px; }

        .back {
          background: rgba(255,255,255,0.07);
          border: 1.5px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 14px;
          font-family: inherit;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .back:hover { background: rgba(255,255,255,0.12); }

        .btn {
          flex: 1;
          background: linear-gradient(135deg, #ff6b2b, #e8400c);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 12px;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
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