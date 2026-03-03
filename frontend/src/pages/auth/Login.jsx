
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
      navigate(user.role === "admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      {/* Background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="auth-card">
        {/* Left Panel */}
        <div className="auth-panel-left">
          <div className="panel-content">
            <div className="brand-logo">🍱</div>
            <h1 className="brand-name">CanteenXpress</h1>
            <p className="brand-tagline">
              Hot food, zero wait.<br />Order ahead, eat on time.
            </p>
            <div className="food-grid">
              {["🍕","🍔","🥗","🍜","🧃","🍩","🌮","🍛"].map((f, i) => (
                <span key={i} className="food-emoji" style={{ animationDelay: `${i * 0.15}s` }}>{f}</span>
              ))}
            </div>
            <div className="panel-footer">
              Loved by 1200+ students daily
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="auth-panel-right">
          <div className="form-wrapper">
            <div className="form-header">
              <h2 className="form-title">Welcome back</h2>
              <p className="form-subtitle">Sign in to place your order</p>
            </div>

            {error && (
              <div className="error-banner">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="field-group">
                <label className="field-label">Email address</label>
                <div className="input-wrap">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@college.edu"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="field-input"
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Password</label>
                <div className="input-wrap">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="field-input"
                  />
                  <button
                    type="button"
                    className="toggle-pw"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span className="spinner" />
                ) : (
                  <>Sign In <span className="btn-arrow">→</span></>
                )}
              </button>
            </form>

            <div className="auth-switch">
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">Create one</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f0d0b;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          animation: drift 8s ease-in-out infinite alternate;
        }
        .blob-1 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #ff6b2b, #e8400c);
          top: -100px; left: -100px;
          animation-delay: 0s;
        }
        .blob-2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #ffb347, #ff8c00);
          bottom: -80px; right: -80px;
          animation-delay: 3s;
        }
        .blob-3 {
          width: 250px; height: 250px;
          background: radial-gradient(circle, #c94b4b, #8b0000);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 6s;
        }
        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(30px, 20px) scale(1.1); }
        }

        .auth-card {
          display: flex;
          width: 100%;
          max-width: 900px;
          min-height: 560px;
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          z-index: 1;
          box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06);
          animation: cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* LEFT PANEL */
        .auth-panel-left {
          flex: 1;
          background: linear-gradient(145deg, #ff6b2b 0%, #c94b4b 50%, #8b1a1a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }
        .auth-panel-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .panel-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .brand-logo {
          font-size: 56px;
          margin-bottom: 12px;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 12px;
        }

        .brand-tagline {
          font-size: 15px;
          color: rgba(255,255,255,0.8);
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .food-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 32px;
        }

        .food-emoji {
          font-size: 26px;
          background: rgba(255,255,255,0.15);
          border-radius: 12px;
          width: 50px; height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.2);
          animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          transition: transform 0.2s;
          cursor: default;
        }
        .food-emoji:hover { transform: scale(1.15) rotate(-5deg); }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }

        .panel-footer {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          background: rgba(0,0,0,0.2);
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.15);
        }

        /* RIGHT PANEL */
        .auth-panel-right {
          flex: 1.1;
          background: #1a1612;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
        }

        .form-wrapper {
          width: 100%;
          max-width: 340px;
        }

        .form-header {
          margin-bottom: 32px;
        }

        .form-title {
          font-family: 'Syne', sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 6px;
        }

        .form-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
        }

        .error-banner {
          background: rgba(220, 60, 60, 0.15);
          border: 1px solid rgba(220,60,60,0.4);
          color: #ff8080;
          font-size: 13px;
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-label {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.3px;
        }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          font-size: 16px;
          pointer-events: none;
          z-index: 1;
        }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 13px 44px 13px 44px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.25); }
        .field-input:focus {
          border-color: #ff6b2b;
          background: rgba(255, 107, 43, 0.08);
        }

        .toggle-pw {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 0;
          line-height: 1;
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #ff6b2b, #e8400c);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 15px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 8px 24px rgba(255, 107, 43, 0.35);
        }
        .submit-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(255, 107, 43, 0.45);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .btn-arrow { transition: transform 0.2s; }
        .submit-btn:hover .btn-arrow { transform: translateX(4px); }

        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .auth-switch {
          margin-top: 28px;
          text-align: center;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
        }

        .auth-link {
          color: #ff6b2b;
          text-decoration: none;
          font-weight: 500;
          margin-left: 4px;
          transition: color 0.2s;
        }
        .auth-link:hover { color: #ffaa80; }

        @media (max-width: 640px) {
          .auth-panel-left { display: none; }
          .auth-card { border-radius: 20px; }
          .auth-panel-right { padding: 40px 28px; }
        }
      `}</style>
    </div>
  );
}