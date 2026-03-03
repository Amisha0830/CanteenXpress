
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // step 1: personal info, step 2: password

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
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters");
    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match");

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

  const fields1 = [
    { name: "name", type: "text", placeholder: "Your full name", label: "Full Name", icon: "👤" },
    { name: "email", type: "email", placeholder: "you@college.edu", label: "Email Address", icon: "✉️" },
    { name: "phone", type: "tel", placeholder: "+91 98765 43210 (optional)", label: "Phone Number", icon: "📱" },
  ];

  return (
    <div className="auth-root">
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
              Join thousands of students<br />who skip the queue every day.
            </p>

            <div className="perks">
              {[
                { icon: "⚡", text: "Order in under 60 seconds" },
                { icon: "🔔", text: "Real-time order updates" },
                { icon: "💸", text: "Exclusive student offers" },
                { icon: "🕐", text: "Pick your slot, skip the wait" },
              ].map((p, i) => (
                <div key={i} className="perk-item" style={{ animationDelay: `${i * 0.12}s` }}>
                  <span className="perk-icon">{p.icon}</span>
                  <span className="perk-text">{p.text}</span>
                </div>
              ))}
            </div>

            <div className="panel-footer">🎓 College students only</div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="auth-panel-right">
          <div className="form-wrapper">
            <div className="form-header">
              <div className="step-indicator">
                <div className={`step-dot ${step >= 1 ? "active" : ""}`} />
                <div className={`step-line ${step >= 2 ? "filled" : ""}`} />
                <div className={`step-dot ${step >= 2 ? "active" : ""}`} />
              </div>
              <h2 className="form-title">
                {step === 1 ? "Create account" : "Set password"}
              </h2>
              <p className="form-subtitle">
                {step === 1
                  ? "Step 1 of 2 — Tell us about you"
                  : "Step 2 of 2 — Secure your account"}
              </p>
            </div>

            {error && (
              <div className="error-banner">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <form onSubmit={handleStep1} className="auth-form">
                {fields1.map((f) => (
                  <div className="field-group" key={f.name}>
                    <label className="field-label">{f.label}</label>
                    <div className="input-wrap">
                      <span className="input-icon">{f.icon}</span>
                      <input
                        type={f.type}
                        name={f.name}
                        placeholder={f.placeholder}
                        value={form[f.name]}
                        onChange={handleChange}
                        required={f.name !== "phone"}
                        className="field-input"
                      />
                    </div>
                  </div>
                ))}

                <button type="submit" className="submit-btn">
                  Continue <span className="btn-arrow">→</span>
                </button>
              </form>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="field-group">
                  <label className="field-label">Password</label>
                  <div className="input-wrap">
                    <span className="input-icon">🔒</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Min 6 characters"
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

                <div className="field-group">
                  <label className="field-label">Confirm Password</label>
                  <div className="input-wrap">
                    <span className="input-icon">🔑</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Repeat your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className="field-input"
                    />
                  </div>
                </div>

                {/* Password strength indicator */}
                {form.password && (
                  <div className="pw-strength">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="pw-bar"
                        style={{
                          background:
                            form.password.length >= (i + 1) * 3
                              ? i < 1
                                ? "#ef4444"
                                : i < 2
                                ? "#f97316"
                                : i < 3
                                ? "#eab308"
                                : "#22c55e"
                              : "rgba(255,255,255,0.1)",
                        }}
                      />
                    ))}
                    <span className="pw-label">
                      {form.password.length < 4
                        ? "Too short"
                        : form.password.length < 7
                        ? "Weak"
                        : form.password.length < 10
                        ? "Good"
                        : "Strong 💪"}
                    </span>
                  </div>
                )}

                <div className="step2-actions">
                  <button
                    type="button"
                    className="back-btn"
                    onClick={() => { setStep(1); setError(""); }}
                  >
                    ← Back
                  </button>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? (
                      <span className="spinner" />
                    ) : (
                      <>Create Account ✓</>
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="auth-switch">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">Sign in</Link>
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
          from { transform: translate(0,0) scale(1); }
          to { transform: translate(30px,20px) scale(1.1); }
        }

        .auth-card {
          display: flex;
          width: 100%;
          max-width: 900px;
          min-height: 580px;
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
          gap: 16px;
        }

        .brand-logo {
          font-size: 56px;
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
        }

        .brand-tagline {
          font-size: 14px;
          color: rgba(255,255,255,0.8);
          line-height: 1.6;
        }

        .perks {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          margin-top: 8px;
        }

        .perk-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          padding: 10px 14px;
          backdrop-filter: blur(4px);
          text-align: left;
          animation: slideIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .perk-icon { font-size: 18px; }
        .perk-text { font-size: 13px; color: rgba(255,255,255,0.9); font-weight: 400; }

        .panel-footer {
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          background: rgba(0,0,0,0.2);
          padding: 7px 14px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.15);
        }

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

        .form-header { margin-bottom: 28px; }

        /* Step indicator */
        .step-indicator {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 16px;
        }
        .step-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.2);
          transition: all 0.3s;
        }
        .step-dot.active {
          background: #ff6b2b;
          border-color: #ff6b2b;
          box-shadow: 0 0 12px rgba(255,107,43,0.5);
        }
        .step-line {
          flex: 1;
          height: 2px;
          background: rgba(255,255,255,0.1);
          margin: 0 6px;
          border-radius: 2px;
          transition: background 0.3s;
        }
        .step-line.filled { background: #ff6b2b; }

        .form-title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 6px;
        }

        .form-subtitle {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
        }

        .error-banner {
          background: rgba(220,60,60,0.15);
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
          gap: 16px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .field-label {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
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
        }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 44px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.22); }
        .field-input:focus {
          border-color: #ff6b2b;
          background: rgba(255,107,43,0.08);
        }

        .toggle-pw {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 0;
        }

        /* Password strength */
        .pw-strength {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .pw-bar {
          flex: 1;
          height: 3px;
          border-radius: 4px;
          transition: background 0.3s;
        }
        .pw-label {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          white-space: nowrap;
          min-width: 60px;
          text-align: right;
        }

        .step2-actions {
          display: flex;
          gap: 10px;
          margin-top: 8px;
        }

        .back-btn {
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7);
          border-radius: 12px;
          padding: 14px 18px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .back-btn:hover { background: rgba(255,255,255,0.13); }

        .submit-btn {
          flex: 1;
          background: linear-gradient(135deg, #ff6b2b, #e8400c);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 14px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 8px 24px rgba(255,107,43,0.35);
          width: 100%;
        }
        .submit-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(255,107,43,0.45);
        }
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
          margin-top: 24px;
          text-align: center;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
        }

        .auth-link {
          color: #ff6b2b;
          text-decoration: none;
          font-weight: 500;
          margin-left: 4px;
        }
        .auth-link:hover { color: #ffaa80; }

        @media (max-width: 640px) {
          .auth-panel-left { display: none; }
          .auth-card { border-radius: 20px; }
          .auth-panel-right { padding: 40px 24px; }
        }
      `}</style>
    </div>
  );
}