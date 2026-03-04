const contactController = {
  getContactPage: (req, res) => {
    // JSON API
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json({ success: true, message: "Contact page" });
    }
    res.send(renderContactPage());
  },

  // POST /api/contact — handle form submission
  submitContact: async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
      }
      // TODO: send email / save to DB here
      res.status(200).json({ success: true, message: "Message received! We'll get back to you within 24 hours." });
    } catch (err) {
      res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
    }
  },
};

// ─────────────────────────────────────────────────────────────
function renderContactPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Contact Us | CanteenXpress</title>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    /* ══ VARIABLES (exact match to home.ejs) ══ */
    :root {
      --primary:           #FF5722;
      --primary-hover:     #E64A19;
      --primary-light:     #FFF3EE;
      --primary-glow:      rgba(255, 87, 34, 0.18);
      --secondary:         #43A047;
      --secondary-light:   #E8F5E9;
      --bg-primary:        #FAFAF8;
      --bg-secondary:      #FFFFFF;
      --bg-tertiary:       #F4F3EF;
      --bg-dark:           #1A1A1A;
      --text-primary:      #1C1C1C;
      --text-secondary:    #717171;
      --text-muted:        #A0A0A0;
      --border-color:      #EBEBEB;
      --shadow-sm:         0 1px 4px rgba(0,0,0,0.06);
      --shadow-md:         0 4px 16px rgba(0,0,0,0.09);
      --shadow-lg:         0 12px 40px rgba(0,0,0,0.13);
      --shadow-xl:         0 24px 64px rgba(0,0,0,0.14);
      --radius-xs:         4px;
      --radius-sm:         8px;
      --radius-md:         14px;
      --radius-lg:         20px;
      --radius-xl:         28px;
      --radius-full:       999px;
      --transition:        all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      --transition-bounce: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }

    body {
      font-family: 'Open Sans', sans-serif;
      background-color: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      padding-top: 68px;
    }

    h1,h2,h3,h4,h5 {
      font-family: 'Poppins', sans-serif;
      line-height: 1.2;
    }

    a { text-decoration: none; color: inherit; transition: var(--transition); }
    ul { list-style: none; }
    button { cursor: pointer; border: none; font-family: inherit; transition: var(--transition); }

    /* ══ NAVBAR ══ */
    .navbar {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-color);
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      transition: var(--transition);
    }

    .nav-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 68px;
      gap: 24px;
    }

    .logo { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

    .logo-icon {
      width: 40px; height: 40px;
      background: var(--primary);
      border-radius: var(--radius-sm);
      display: flex; align-items: center; justify-content: center;
      color: white; font-size: 17px;
      box-shadow: 0 4px 12px var(--primary-glow);
    }

    .logo-text {
      font-family: 'Poppins', sans-serif;
      font-size: 20px; font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.5px;
    }

    .logo-text span { color: var(--primary); }

    .nav-links { display: flex; align-items: center; gap: 4px; }

    .nav-link {
      font-size: 14px; font-weight: 500;
      color: var(--text-secondary);
      padding: 7px 14px;
      border-radius: var(--radius-full);
    }

    .nav-link:hover { color: var(--text-primary); background: var(--bg-tertiary); }
    .nav-link.active { color: var(--primary); background: var(--primary-light); font-weight: 600; }

    .search-bar {
      display: flex; align-items: center;
      background: var(--bg-tertiary);
      border: 1.5px solid transparent;
      border-radius: var(--radius-full);
      padding: 9px 16px; gap: 9px;
      width: 240px; transition: var(--transition);
    }

    .search-bar:focus-within {
      border-color: var(--primary);
      background: white;
      box-shadow: 0 0 0 3px var(--primary-glow);
    }

    .search-bar input {
      border: none; background: transparent; outline: none;
      font-size: 13.5px; width: 100%;
      color: var(--text-primary);
      font-family: 'Open Sans', sans-serif;
    }

    .search-bar input::placeholder { color: var(--text-muted); }
    .search-bar i { color: var(--text-muted); font-size: 13px; }

    .nav-cart-btn {
      position: relative;
      width: 44px; height: 44px;
      background: var(--primary-light);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: var(--primary); font-size: 18px;
      transition: var(--transition-bounce);
      flex-shrink: 0;
    }

    .nav-cart-btn:hover {
      background: var(--primary); color: white;
      transform: translateY(-1px);
      box-shadow: 0 6px 18px var(--primary-glow);
    }

    .nav-cart-count {
      position: absolute; top: -4px; right: -4px;
      background: var(--primary); color: white;
      font-size: 11px; font-weight: 700;
      width: 20px; height: 20px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid white;
    }

    .nav-cart-btn:hover .nav-cart-count { background: white; color: var(--primary); border-color: var(--primary); }

    .wallet-balance {
      display: flex; align-items: center; gap: 6px;
      background: var(--secondary-light); color: var(--secondary);
      padding: 7px 13px; border-radius: var(--radius-full);
      font-size: 13px; font-weight: 600;
    }

    .user-profile {
      display: flex; align-items: center; gap: 9px;
      cursor: pointer; padding: 5px 12px 5px 5px;
      border-radius: var(--radius-full);
      border: 1.5px solid var(--border-color);
      transition: var(--transition); position: relative;
    }

    .user-profile:hover { border-color: var(--primary); background: var(--primary-light); }

    .user-avatar {
      width: 34px; height: 34px; border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), #FF8A65);
      display: flex; align-items: center; justify-content: center;
      color: white; font-weight: 700; font-size: 13px;
    }

    .user-name { font-weight: 600; font-size: 13.5px; color: var(--text-primary); display: none; }
    @media (min-width: 900px) { .user-name { display: block; } }

    .dropdown { position: relative; }

    .dropdown-content {
      display: none; position: absolute;
      top: calc(100% + 8px); right: 0;
      background: white; border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg); min-width: 180px;
      padding: 8px; border: 1px solid var(--border-color); z-index: 100;
    }

    .dropdown:hover .dropdown-content { display: block; }

    .dropdown-content a {
      display: flex; align-items: center; gap: 10px;
      padding: 9px 12px; border-radius: var(--radius-sm);
      font-size: 13.5px; color: var(--text-secondary); font-weight: 500;
    }

    .dropdown-content a:hover { background: var(--bg-tertiary); color: var(--text-primary); }
    .dropdown-content hr { border: none; border-top: 1px solid var(--border-color); margin: 6px 0; }

    .auth-buttons { display: flex; align-items: center; gap: 10px; }

    .btn-login {
      font-size: 14px; font-weight: 600;
      color: var(--text-secondary); padding: 8px 16px;
      border-radius: var(--radius-full);
      border: 1.5px solid var(--border-color);
    }

    .btn-login:hover { border-color: var(--primary); color: var(--primary); }

    .btn-signup-nav {
      font-size: 14px; font-weight: 600;
      background: var(--primary); color: white;
      padding: 10px 22px; border-radius: var(--radius-full);
      border: none; cursor: pointer;
    }

    .btn-signup-nav:hover { background: var(--primary-hover); }

    .nav-right { display: flex; align-items: center; gap: 10px; }

    .mobile-toggle {
      display: none; flex-direction: column; gap: 5px;
      background: none; padding: 8px;
    }

    .mobile-toggle span {
      width: 22px; height: 2px;
      background: var(--text-primary);
      border-radius: 2px; display: block;
      transition: var(--transition);
    }

    @media (max-width: 992px) {
      .nav-links, .search-bar { display: none; }
      .mobile-toggle { display: flex; }
    }

    /* ══ HERO ══ */
    .contact-hero {
      background: linear-gradient(135deg, var(--bg-secondary) 0%, #FFF8E7 100%);
      padding: 72px 28px 64px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .contact-hero::before {
      content: '';
      position: absolute;
      top: -80px; right: -80px;
      width: 500px; height: 500px;
      background: radial-gradient(circle, var(--primary-light) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }

    .contact-hero::after {
      content: '';
      position: absolute;
      bottom: -60px; left: -60px;
      width: 350px; height: 350px;
      background: radial-gradient(circle, var(--secondary-light) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }

    .hero-inner {
      position: relative; z-index: 1;
      max-width: 620px; margin: 0 auto;
    }

    .hero-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--primary-light); color: var(--primary);
      font-size: 13px; font-weight: 600;
      padding: 6px 14px; border-radius: var(--radius-full);
      margin-bottom: 20px; letter-spacing: 0.3px;
    }

    .eyebrow-dot {
      width: 7px; height: 7px;
      background: var(--primary); border-radius: 50%;
      animation: pulse-dot 2s ease-in-out infinite;
    }

    @keyframes pulse-dot {
      0%,100% { opacity: 1; transform: scale(1); }
      50%      { opacity: 0.5; transform: scale(0.7); }
    }

    .contact-hero h1 {
      font-size: 48px; font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -1.5px; margin-bottom: 16px;
    }

    .contact-hero h1 span { color: var(--primary); }

    .contact-hero p {
      font-size: 17px; color: var(--text-secondary);
      line-height: 1.7;
    }

    @media (max-width: 576px) {
      .contact-hero h1 { font-size: 32px; }
      .contact-hero p  { font-size: 15px; }
    }

    /* ══ QUICK CONTACT CARDS ══ */
    .quick-cards {
      max-width: 1240px; margin: 0 auto;
      padding: 56px 28px 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
    }

    .quick-card {
      background: var(--bg-secondary);
      border: 1.5px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 32px 24px;
      text-align: center;
      transition: var(--transition-bounce);
      box-shadow: var(--shadow-sm);
      position: relative;
      overflow: hidden;
    }

    .quick-card::before {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 3px;
      background: var(--primary);
      transform: scaleX(0);
      transition: var(--transition);
    }

    .quick-card:hover {
      transform: translateY(-6px);
      border-color: var(--primary);
      box-shadow: var(--shadow-md);
    }

    .quick-card:hover::before { transform: scaleX(1); }

    .qc-icon {
      width: 60px; height: 60px;
      background: var(--primary-light);
      border-radius: var(--radius-md);
      display: flex; align-items: center; justify-content: center;
      color: var(--primary); font-size: 22px;
      margin: 0 auto 16px;
      transition: var(--transition);
    }

    .quick-card:hover .qc-icon {
      background: var(--primary); color: white;
      transform: scale(1.08);
    }

    .qc-title {
      font-size: 16px; font-weight: 700;
      color: var(--text-primary); margin-bottom: 8px;
    }

    .qc-value {
      font-size: 14px; color: var(--primary);
      font-weight: 600; margin-bottom: 4px;
    }

    .qc-sub {
      font-size: 12px; color: var(--text-muted);
    }

    /* ══ MAIN CONTENT — form + map/info split ══ */
    .contact-main {
      max-width: 1240px; margin: 0 auto;
      padding: 64px 28px;
      display: grid;
      grid-template-columns: 1fr 420px;
      gap: 48px;
      align-items: start;
    }

    @media (max-width: 992px) {
      .contact-main { grid-template-columns: 1fr; gap: 40px; }
    }

    /* ── FORM ── */
    .form-card {
      background: var(--bg-secondary);
      border-radius: var(--radius-xl);
      padding: 40px;
      border: 1.5px solid var(--border-color);
      box-shadow: var(--shadow-sm);
    }

    .form-card-header { margin-bottom: 32px; }

    .section-label {
      font-size: 12px; font-weight: 600;
      color: var(--primary);
      letter-spacing: 1.5px; text-transform: uppercase;
      margin-bottom: 8px;
    }

    .form-card-title {
      font-size: 26px; font-weight: 700;
      color: var(--text-primary); margin-bottom: 6px;
    }

    .form-card-title span { color: var(--primary); }

    .form-card-sub {
      font-size: 14px; color: var(--text-secondary); line-height: 1.6;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }

    @media (max-width: 576px) { .form-row { grid-template-columns: 1fr; } }

    .field-group { display: flex; flex-direction: column; gap: 7px; margin-bottom: 16px; }

    .field-label {
      font-size: 13px; font-weight: 600;
      color: var(--text-secondary); letter-spacing: 0.2px;
    }

    .field-label span { color: var(--primary); }

    .input-wrap { position: relative; display: flex; align-items: center; }

    .input-icon {
      position: absolute; left: 14px;
      color: var(--text-muted); font-size: 14px;
      pointer-events: none; z-index: 1;
    }

    .field-input {
      width: 100%;
      background: var(--bg-tertiary);
      border: 1.5px solid transparent;
      border-radius: var(--radius-md);
      padding: 13px 16px 13px 42px;
      font-size: 14px; font-family: 'Open Sans', sans-serif;
      color: var(--text-primary); outline: none;
      transition: var(--transition);
    }

    .field-input::placeholder { color: var(--text-muted); }

    .field-input:focus {
      border-color: var(--primary);
      background: white;
      box-shadow: 0 0 0 3px var(--primary-glow);
    }

    .field-input.error { border-color: #EF4444; background: #FFF5F5; }

    textarea.field-input {
      resize: vertical; min-height: 140px;
      padding-top: 14px; line-height: 1.6;
    }

    .subject-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 10px;
      margin-top: 4px;
    }

    .subject-option { display: none; }

    .subject-label {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 14px;
      background: var(--bg-tertiary);
      border: 1.5px solid transparent;
      border-radius: var(--radius-md);
      cursor: pointer; font-size: 13px;
      font-weight: 500; color: var(--text-secondary);
      transition: var(--transition);
      user-select: none;
    }

    .subject-label i { font-size: 14px; color: var(--text-muted); transition: var(--transition); }

    .subject-option:checked + .subject-label {
      border-color: var(--primary);
      background: var(--primary-light);
      color: var(--primary);
      font-weight: 600;
    }

    .subject-option:checked + .subject-label i { color: var(--primary); }

    .subject-label:hover { border-color: var(--primary); color: var(--primary); }

    .char-count {
      text-align: right; font-size: 11px;
      color: var(--text-muted); margin-top: 4px;
    }

    .submit-btn {
      width: 100%;
      background: var(--primary);
      color: white;
      border: none; border-radius: var(--radius-full);
      padding: 16px 32px;
      font-size: 15px; font-weight: 700;
      font-family: 'Open Sans', sans-serif;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      transition: var(--transition-bounce);
      box-shadow: 0 6px 20px var(--primary-glow);
      margin-top: 8px;
    }

    .submit-btn:hover:not(:disabled) {
      background: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: 0 10px 28px var(--primary-glow);
    }

    .submit-btn:active:not(:disabled) { transform: translateY(0); }
    .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

    .submit-btn .btn-arrow { transition: transform 0.2s; }
    .submit-btn:hover .btn-arrow { transform: translateX(4px); }

    .spinner {
      width: 18px; height: 18px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      display: inline-block;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    /* Success/Error toast */
    .form-toast {
      display: none;
      padding: 14px 18px;
      border-radius: var(--radius-md);
      font-size: 14px; font-weight: 500;
      margin-top: 16px;
      align-items: center; gap: 10px;
    }

    .form-toast.success {
      display: flex;
      background: #F0FDF4;
      border: 1.5px solid #86EFAC;
      color: #166534;
    }

    .form-toast.error {
      display: flex;
      background: #FFF5F5;
      border: 1.5px solid #FECACA;
      color: #991B1B;
    }

    /* ── RIGHT PANEL ── */
    .info-panel { display: flex; flex-direction: column; gap: 20px; }

    /* Hours card */
    .hours-card {
      background: var(--bg-dark);
      border-radius: var(--radius-xl);
      padding: 32px;
      color: white;
      position: relative;
      overflow: hidden;
    }

    .hours-card::before {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 200px; height: 200px;
      background: radial-gradient(circle, rgba(255,87,34,0.2) 0%, transparent 70%);
      pointer-events: none;
    }

    .hours-card-title {
      font-size: 18px; font-weight: 700;
      margin-bottom: 20px;
      display: flex; align-items: center; gap: 10px;
    }

    .hours-card-title i { color: var(--primary); }

    .hours-row {
      display: flex; justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      font-size: 13.5px;
    }

    .hours-row:last-child { border-bottom: none; }

    .hours-day { color: rgba(255,255,255,0.6); }

    .hours-time {
      font-weight: 600; color: white;
      background: rgba(255,87,34,0.15);
      padding: 3px 10px;
      border-radius: var(--radius-full);
      font-size: 12.5px;
    }

    .hours-time.closed {
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.35);
    }

    .live-badge {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(67,160,71,0.15);
      color: #4CAF50;
      padding: 6px 14px;
      border-radius: var(--radius-full);
      font-size: 12px; font-weight: 600;
      margin-top: 20px;
    }

    .live-dot {
      width: 7px; height: 7px;
      background: #4CAF50; border-radius: 50%;
      animation: pulse-dot 1.5s ease-in-out infinite;
    }

    /* Map card */
    .map-card {
      background: var(--bg-secondary);
      border-radius: var(--radius-xl);
      border: 1.5px solid var(--border-color);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }

    .map-placeholder {
      background: linear-gradient(135deg, #FFF8E7 0%, var(--primary-light) 100%);
      height: 200px;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 12px;
      position: relative;
      overflow: hidden;
    }

    .map-placeholder::before {
      content: '';
      position: absolute; inset: 0;
      background: repeating-linear-gradient(
        0deg, transparent, transparent 30px,
        rgba(255,87,34,0.04) 30px, rgba(255,87,34,0.04) 31px
      ),
      repeating-linear-gradient(
        90deg, transparent, transparent 30px,
        rgba(255,87,34,0.04) 30px, rgba(255,87,34,0.04) 31px
      );
    }

    .map-pin {
      width: 52px; height: 52px;
      background: var(--primary);
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 24px var(--primary-glow);
      position: relative; z-index: 1;
      animation: pin-bounce 2s ease-in-out infinite;
    }

    .map-pin i {
      transform: rotate(45deg);
      color: white; font-size: 20px;
    }

    @keyframes pin-bounce {
      0%,100% { transform: rotate(-45deg) translateY(0); }
      50%      { transform: rotate(-45deg) translateY(-6px); }
    }

    .map-label {
      font-size: 13px; font-weight: 600;
      color: var(--text-secondary);
      position: relative; z-index: 1;
    }

    .map-info {
      padding: 20px 24px;
      display: flex; flex-direction: column; gap: 10px;
    }

    .map-info-row {
      display: flex; align-items: center; gap: 12px;
      font-size: 13.5px; color: var(--text-secondary);
    }

    .map-info-row i {
      color: var(--primary); width: 16px;
      font-size: 13px; flex-shrink: 0;
    }

    .directions-btn {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      width: 100%;
      background: var(--primary-light);
      color: var(--primary);
      border: 1.5px solid var(--primary);
      border-radius: var(--radius-full);
      padding: 11px 20px;
      font-size: 13.5px; font-weight: 600;
      font-family: 'Open Sans', sans-serif;
      cursor: pointer;
      margin-top: 4px;
      transition: var(--transition);
    }

    .directions-btn:hover { background: var(--primary); color: white; }

    /* FAQ Card */
    .faq-card {
      background: var(--bg-secondary);
      border-radius: var(--radius-xl);
      border: 1.5px solid var(--border-color);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }

    .faq-header {
      padding: 24px 28px 16px;
    }

    .faq-title {
      font-size: 18px; font-weight: 700;
      color: var(--text-primary);
      display: flex; align-items: center; gap: 10px;
    }

    .faq-title i { color: var(--primary); }

    .faq-item {
      border-top: 1px solid var(--border-color);
    }

    .faq-q {
      width: 100%;
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 28px;
      background: none;
      text-align: left;
      font-size: 13.5px; font-weight: 600;
      color: var(--text-primary);
      font-family: 'Open Sans', sans-serif;
      cursor: pointer;
      gap: 12px;
      transition: var(--transition);
    }

    .faq-q:hover { color: var(--primary); background: var(--primary-light); }

    .faq-q i {
      color: var(--text-muted); font-size: 12px;
      flex-shrink: 0; transition: var(--transition);
    }

    .faq-q.open i { transform: rotate(180deg); color: var(--primary); }
    .faq-q.open { color: var(--primary); }

    .faq-a {
      display: none;
      padding: 0 28px 16px;
      font-size: 13px; color: var(--text-secondary);
      line-height: 1.7;
      background: var(--bg-tertiary);
    }

    .faq-a.open { display: block; }

    /* ══ SOCIAL STRIP ══ */
    .social-strip {
      background: #FFF8E7;
      padding: 56px 28px;
      text-align: center;
    }

    .social-strip-inner { max-width: 700px; margin: 0 auto; }

    .social-strip h2 {
      font-size: 28px; font-weight: 700;
      color: var(--text-primary); margin-bottom: 8px;
    }

    .social-strip h2 span { color: var(--primary); }

    .social-strip p {
      font-size: 15px; color: var(--text-secondary);
      margin-bottom: 32px;
    }

    .social-links-row {
      display: flex; align-items: center; justify-content: center;
      gap: 14px; flex-wrap: wrap;
    }

    .social-pill {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 12px 22px;
      border-radius: var(--radius-full);
      font-size: 14px; font-weight: 600;
      font-family: 'Open Sans', sans-serif;
      border: 1.5px solid var(--border-color);
      background: white;
      color: var(--text-primary);
      transition: var(--transition-bounce);
      box-shadow: var(--shadow-sm);
      cursor: pointer;
    }

    .social-pill:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
    .social-pill.insta:hover { background: #E1306C; border-color: #E1306C; color: white; }
    .social-pill.twitter:hover { background: #1DA1F2; border-color: #1DA1F2; color: white; }
    .social-pill.facebook:hover { background: #1877F2; border-color: #1877F2; color: white; }
    .social-pill.whatsapp:hover { background: #25D366; border-color: #25D366; color: white; }

    /* ══ FOOTER ══ */
    .footer {
      background: #0F0F0F;
      color: white;
      padding: 64px 28px 28px;
    }

    .footer-container { max-width: 1240px; margin: 0 auto; }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;
      gap: 48px; margin-bottom: 48px;
    }

    @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr; gap: 32px; } }

    .footer-about .logo-text { color: white; }
    .footer-about .logo-icon { box-shadow: none; }

    .footer-about p {
      font-size: 13.5px; color: rgba(255,255,255,0.5);
      line-height: 1.7; margin-top: 14px;
    }

    .social-links { display: flex; gap: 10px; margin-top: 20px; }

    .social-link {
      width: 38px; height: 38px;
      background: rgba(255,255,255,0.07);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: rgba(255,255,255,0.6); font-size: 14px;
      transition: var(--transition);
    }

    .social-link:hover { background: var(--primary); color: white; transform: translateY(-2px); }

    .footer-title {
      font-family: 'Poppins', sans-serif;
      font-size: 14px; font-weight: 700;
      margin-bottom: 18px; color: white; letter-spacing: 0.3px;
    }

    .footer-links li { margin-bottom: 10px; }

    .footer-links a {
      font-size: 13.5px; color: rgba(255,255,255,0.45);
      transition: var(--transition);
    }

    .footer-links a:hover { color: var(--primary); padding-left: 4px; }

    .footer-contact p {
      display: flex; align-items: center; gap: 10px;
      font-size: 13.5px; color: rgba(255,255,255,0.45);
      margin-bottom: 10px;
    }

    .footer-contact i { color: var(--primary); width: 16px; font-size: 13px; }

    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.07);
      padding-top: 24px;
      display: flex; justify-content: space-between;
      align-items: center; flex-wrap: wrap; gap: 14px;
    }

    .footer-bottom p { font-size: 13px; color: rgba(255,255,255,0.3); }

    .footer-bottom-links { display: flex; gap: 24px; }

    .footer-bottom-links a {
      font-size: 13px; color: rgba(255,255,255,0.3);
      transition: var(--transition);
    }

    .footer-bottom-links a:hover { color: var(--primary); }

    /* ══ FLOATING CART ══ */
    .floating-cart {
      position: fixed; bottom: 28px; right: 28px;
      display: flex; align-items: center; gap: 10px;
      background: var(--primary); color: white;
      padding: 14px 20px; border-radius: var(--radius-full);
      font-weight: 700; font-size: 15px;
      box-shadow: 0 8px 28px rgba(255,87,34,0.35);
      cursor: pointer; z-index: 999;
      transition: var(--transition-bounce);
      border: none; font-family: 'Open Sans', sans-serif;
      opacity: 0; visibility: hidden; transform: translateY(16px);
      text-decoration: none;
    }

    .floating-cart.visible { opacity: 1; visibility: visible; transform: translateY(0); }
    .floating-cart:hover { background: var(--primary-hover); transform: translateY(-3px); }

    .floating-cart-count {
      background: white; color: var(--primary);
      font-size: 12px; font-weight: 800;
      min-width: 22px; height: 22px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
    }

    /* ══ MOBILE MENU ══ */
    .mobile-menu {
      position: fixed; top: 0; left: -100%;
      width: 80%; max-width: 300px; height: 100vh;
      background: white; z-index: 1001;
      transition: var(--transition); padding: 24px;
      box-shadow: var(--shadow-xl); overflow-y: auto;
    }

    .mobile-menu.active { left: 0; }

    .mobile-menu-header {
      display: flex; justify-content: space-between;
      align-items: center; margin-bottom: 28px;
    }

    .mobile-menu-close {
      width: 38px; height: 38px;
      background: var(--bg-tertiary); border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 17px; color: var(--text-secondary); border: none; cursor: pointer;
    }

    .mobile-nav-links { display: flex; flex-direction: column; gap: 4px; }

    .mobile-nav-link {
      display: flex; align-items: center; gap: 12px;
      padding: 13px 14px; border-radius: var(--radius-md);
      font-weight: 500; font-size: 14.5px;
      color: var(--text-secondary);
    }

    .mobile-nav-link:hover,
    .mobile-nav-link.active { background: var(--primary-light); color: var(--primary); }

    .mobile-nav-link i { width: 18px; text-align: center; }

    .mobile-cart-row {
      display: flex; align-items: center; justify-content: space-between;
      background: var(--primary); color: white;
      padding: 13px 16px; border-radius: var(--radius-md);
      margin-top: 12px; font-weight: 600; font-size: 14.5px;
      text-decoration: none;
    }

    .mobile-cart-row span {
      background: white; color: var(--primary);
      font-size: 11px; font-weight: 800;
      padding: 2px 8px; border-radius: var(--radius-full);
    }

    .overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.45);
      backdrop-filter: blur(3px);
      z-index: 1000; opacity: 0; visibility: hidden;
      transition: var(--transition);
    }

    .overlay.active { opacity: 1; visibility: visible; }
  </style>
</head>
<body>

  <!-- ══ NAVBAR ══ -->
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="#" class="logo">
        <div class="logo-icon"><i class="fas fa-utensils"></i></div>
        <span class="logo-text">Canteen<span>Xpress</span></span>
      </a>

      <ul class="nav-links">
        <li><a href="/"    class="nav-link">Home</a></li>
        <li><a href="/menu"    class="nav-link">Menu</a></li>
        <li><a href="/order"  class="nav-link">My Orders</a></li>
        <li><a href="/about"   class="nav-link">About</a></li>
        <li><a href="/contact" class="nav-link active">Contact</a></li>
      </ul>

      <div class="nav-right">
        <div class="search-bar">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search food..." id="searchInput">
        </div>

        <a href="/cart" class="nav-cart-btn">
          <i class="fas fa-shopping-cart"></i>
          <span class="nav-cart-count" id="navCartCount">0</span>
        </a>

        <div class="auth-buttons" id="authButtons">
          <a href="/login"  class="btn-login">Login</a>
          <a href="/signup" class="btn-signup-nav">Sign Up</a>
        </div>

        <button class="mobile-toggle" onclick="toggleMobileMenu()">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>

  <!-- ══ HERO ══ -->
  <section class="contact-hero">
    <div class="hero-inner">
      <div class="hero-eyebrow">
        <span class="eyebrow-dot"></span>
        Get In Touch
      </div>
      <h1>We'd Love to <span>Hear</span> From You</h1>
      <p>Have a question, feedback, or a complaint about your order? Our team is here and ready to help — usually within a few hours.</p>
    </div>
  </section>

  <!-- ══ QUICK CONTACT CARDS ══ -->
  <div class="quick-cards">
    <div class="quick-card">
      <div class="qc-icon"><i class="fas fa-envelope"></i></div>
      <div class="qc-title">Email Us</div>
      <div class="qc-value">hello@canteenxpress.in</div>
      <div class="qc-sub">Reply within 24 hours</div>
    </div>
    <div class="quick-card">
      <div class="qc-icon"><i class="fas fa-phone-alt"></i></div>
      <div class="qc-title">Call Us</div>
      <div class="qc-value">+91 98765 43210</div>
      <div class="qc-sub">Mon – Sat, 8AM – 8PM</div>
    </div>
    <div class="quick-card">
      <div class="qc-icon"><i class="fab fa-whatsapp"></i></div>
      <div class="qc-title">WhatsApp</div>
      <div class="qc-value">+91 98765 43210</div>
      <div class="qc-sub">Fastest response</div>
    </div>
    <div class="quick-card">
      <div class="qc-icon"><i class="fas fa-map-marker-alt"></i></div>
      <div class="qc-title">Visit Us</div>
      <div class="qc-value">Block B, Tech Campus</div>
      <div class="qc-sub">Bengaluru, India</div>
    </div>
  </div>

  <!-- ══ MAIN — FORM + INFO ══ -->
  <div class="contact-main">

    <!-- FORM -->
    <div class="form-card">
      <div class="form-card-header">
        <div class="section-label">Send a Message</div>
        <h2 class="form-card-title">Drop Us a <span>Note</span></h2>
        <p class="form-card-sub">Fill in the form below and we'll get back to you as soon as possible.</p>
      </div>

      <form id="contactForm" onsubmit="handleSubmit(event)">

        <!-- Name + Email -->
        <div class="form-row">
          <div class="field-group" style="margin-bottom:0">
            <label class="field-label">Full Name <span>*</span></label>
            <div class="input-wrap">
              <i class="fas fa-user input-icon"></i>
              <input type="text" class="field-input" id="name" placeholder="Your full name" required>
            </div>
          </div>
          <div class="field-group" style="margin-bottom:0">
            <label class="field-label">Email Address <span>*</span></label>
            <div class="input-wrap">
              <i class="fas fa-envelope input-icon"></i>
              <input type="email" class="field-input" id="email" placeholder="you@college.edu" required>
            </div>
          </div>
        </div>

        <!-- Phone (optional) -->
        <div class="field-group">
          <label class="field-label">Phone Number <span style="color:var(--text-muted);font-weight:400">(optional)</span></label>
          <div class="input-wrap">
            <i class="fas fa-phone-alt input-icon"></i>
            <input type="tel" class="field-input" id="phone" placeholder="+91 98765 43210">
          </div>
        </div>

        <!-- Subject chips -->
        <div class="field-group">
          <label class="field-label">Subject <span>*</span></label>
          <div class="subject-grid">
            <div>
              <input type="radio" name="subject" id="s1" class="subject-option" value="Order Issue" checked>
              <label for="s1" class="subject-label"><i class="fas fa-box"></i> Order Issue</label>
            </div>
            <div>
              <input type="radio" name="subject" id="s2" class="subject-option" value="Payment Problem">
              <label for="s2" class="subject-label"><i class="fas fa-credit-card"></i> Payment</label>
            </div>
            <div>
              <input type="radio" name="subject" id="s3" class="subject-option" value="Food Quality">
              <label for="s3" class="subject-label"><i class="fas fa-utensils"></i> Food Quality</label>
            </div>
            <div>
              <input type="radio" name="subject" id="s4" class="subject-option" value="Feedback">
              <label for="s4" class="subject-label"><i class="fas fa-star"></i> Feedback</label>
            </div>
            <div>
              <input type="radio" name="subject" id="s5" class="subject-option" value="Account Help">
              <label for="s5" class="subject-label"><i class="fas fa-user-circle"></i> Account</label>
            </div>
            <div>
              <input type="radio" name="subject" id="s6" class="subject-option" value="Other">
              <label for="s6" class="subject-label"><i class="fas fa-ellipsis-h"></i> Other</label>
            </div>
          </div>
        </div>

        <!-- Message -->
        <div class="field-group">
          <label class="field-label">Message <span>*</span></label>
          <div class="input-wrap" style="align-items:flex-start;">
            <i class="fas fa-comment-alt input-icon" style="top:14px;position:absolute;"></i>
            <textarea class="field-input" id="message" placeholder="Tell us what's on your mind..." maxlength="500" oninput="updateCount(this)" required></textarea>
          </div>
          <div class="char-count"><span id="charCount">0</span> / 500</div>
        </div>

        <button type="submit" class="submit-btn" id="submitBtn">
          Send Message <i class="fas fa-paper-plane btn-arrow"></i>
        </button>

        <div class="form-toast" id="formToast"></div>

      </form>
    </div>

    <!-- RIGHT INFO PANEL -->
    <div class="info-panel">

      <!-- Hours card -->
      <div class="hours-card">
        <div class="hours-card-title">
          <i class="fas fa-clock"></i> Opening Hours
        </div>
        <div class="hours-row">
          <span class="hours-day">Monday – Friday</span>
          <span class="hours-time">8:00 AM – 8:00 PM</span>
        </div>
        <div class="hours-row">
          <span class="hours-day">Saturday</span>
          <span class="hours-time">9:00 AM – 6:00 PM</span>
        </div>
        <div class="hours-row">
          <span class="hours-day">Sunday</span>
          <span class="hours-time closed">Closed</span>
        </div>
        <div class="hours-row">
          <span class="hours-day">Public Holidays</span>
          <span class="hours-time closed">Closed</span>
        </div>
        <div class="live-badge">
          <span class="live-dot"></span> Currently Open
        </div>
      </div>

      <!-- FAQ card -->
      <div class="faq-card">
        <div class="faq-header">
          <div class="faq-title"><i class="fas fa-question-circle"></i> Quick Help</div>
        </div>
        <div class="faq-item">
          <button class="faq-q" onclick="toggleFaq(this)">
            How do I cancel my order? <i class="fas fa-chevron-down"></i>
          </button>
          <div class="faq-a">You can cancel your order within 2 minutes of placing it from the "My Orders" page. After that, please call us directly.</div>
        </div>
        <div class="faq-item">
          <button class="faq-q" onclick="toggleFaq(this)">
            How long does a refund take? <i class="fas fa-chevron-down"></i>
          </button>
          <div class="faq-a">Refunds to campus wallet are instant. Bank refunds take 3–5 business days depending on your bank.</div>
        </div>
        <div class="faq-item">
          <button class="faq-q" onclick="toggleFaq(this)">
            My order is late — what should I do? <i class="fas fa-chevron-down"></i>
          </button>
          <div class="faq-a">Check the live status on the "My Orders" page. If it's been more than 30 minutes, call us or use WhatsApp for the fastest response.</div>
        </div>
        <div class="faq-item">
          <button class="faq-q" onclick="toggleFaq(this)">
            Can I change my order after placing it? <i class="fas fa-chevron-down"></i>
          </button>
          <div class="faq-a">Changes can only be made within 2 minutes of ordering. Please call us immediately if you need a change.</div>
        </div>
      </div>

    </div>
  </div>

  <!-- ══ SOCIAL STRIP ══ -->
  <section class="social-strip">
    <div class="social-strip-inner">
      <h2>Follow <span>CanteenXpress</span></h2>
      <p>Stay updated with today's specials, offers, and announcements on social media.</p>
      <div class="social-links-row">
        <button class="social-pill insta"><i class="fab fa-instagram"></i> Instagram</button>
        <button class="social-pill twitter"><i class="fab fa-twitter"></i> Twitter</button>
        <button class="social-pill facebook"><i class="fab fa-facebook-f"></i> Facebook</button>
        <button class="social-pill whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</button>
      </div>
    </div>
  </section>

  <!-- ══ FOOTER ══ -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-about">
          <div class="logo">
            <div class="logo-icon"><i class="fas fa-utensils"></i></div>
            <span class="logo-text">Canteen<span>Xpress</span></span>
          </div>
          <p>Your college canteen, now just a click away. Fresh, delicious, and affordable meals for every student.</p>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
          </div>
        </div>

        <div>
          <h4 class="footer-title">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/orders">My Orders</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div class="footer-contact">
          <h4 class="footer-title">Contact Us</h4>
          <p><i class="fas fa-map-marker-alt"></i> College Canteen, Campus</p>
          <p><i class="fas fa-phone-alt"></i> +91 98765 43210</p>
          <p><i class="fas fa-envelope"></i> hello@canteenxpress.in</p>
          <p><i class="fas fa-clock"></i> Mon–Sat: 8AM – 8PM</p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} CanteenXpress. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Refund Policy</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- ══ FLOATING CART ══ -->
  <a href="/cart" class="floating-cart" id="floatingCart">
    <i class="fas fa-shopping-cart"></i>
    View Cart
    <span class="floating-cart-count" id="floatingCartCount">0</span>
  </a>

  <!-- ══ MOBILE MENU ══ -->
  <div class="overlay" id="overlay" onclick="closeMobileMenu()"></div>

  <div class="mobile-menu" id="mobileMenu">
    <div class="mobile-menu-header">
      <div class="logo">
        <div class="logo-icon"><i class="fas fa-utensils"></i></div>
        <span class="logo-text">Canteen<span>Xpress</span></span>
      </div>
      <button class="mobile-menu-close" onclick="closeMobileMenu()">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <ul class="mobile-nav-links">
      <li><a href="/home"    class="mobile-nav-link"><i class="fas fa-home"></i><span>Home</span></a></li>
      <li><a href="/menu"    class="mobile-nav-link"><i class="fas fa-utensils"></i><span>Menu</span></a></li>
      <li><a href="/orders"  class="mobile-nav-link"><i class="fas fa-receipt"></i><span>My Orders</span></a></li>
      <li><a href="/about"   class="mobile-nav-link"><i class="fas fa-info-circle"></i><span>About Us</span></a></li>
      <li><a href="/contact" class="mobile-nav-link active"><i class="fas fa-envelope"></i><span>Contact</span></a></li>
      <li><a href="/login"   class="mobile-nav-link"><i class="fas fa-sign-in-alt"></i><span>Login</span></a></li>
    </ul>
    <a href="/cart" class="mobile-cart-row">
      <div style="display:flex;align-items:center;gap:10px;">
        <i class="fas fa-shopping-cart"></i> My Cart
      </div>
      <span id="mobileCartCount">0</span>
    </a>
  </div>

  <!-- ══ JAVASCRIPT ══ -->
  <script>
    // ── Navbar scroll shadow ──────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 10) {
        navbar.style.background   = 'rgba(255,255,255,0.98)';
        navbar.style.boxShadow    = '0 4px 20px rgba(0,0,0,0.08)';
      } else {
        navbar.style.background   = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow    = 'none';
      }
    });

    // ── Floating cart on scroll ───────────────────────────────────────
    window.addEventListener('scroll', () => {
      document.getElementById('floatingCart')
        .classList.toggle('visible', window.pageYOffset > 280);
    });

    // ── Mobile menu ───────────────────────────────────────────────────
    function toggleMobileMenu() {
      document.getElementById('mobileMenu').classList.add('active');
      document.getElementById('overlay').classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      document.getElementById('mobileMenu').classList.remove('active');
      document.getElementById('overlay').classList.remove('active');
      document.body.style.overflow = '';
    }

    // ── Search on Enter ───────────────────────────────────────────────
    document.getElementById('searchInput').addEventListener('keyup', function(e) {
      if (e.key === 'Enter' && this.value.trim()) {
        window.location.href = '/menu?q=' + encodeURIComponent(this.value.trim());
      }
    });

    // ── Char counter ──────────────────────────────────────────────────
    function updateCount(el) {
      document.getElementById('charCount').textContent = el.value.length;
    }

    // ── FAQ accordion ─────────────────────────────────────────────────
    function toggleFaq(btn) {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-q').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));

      // Toggle clicked
      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    }

    // ── Form submit ───────────────────────────────────────────────────
    async function handleSubmit(e) {
      e.preventDefault();
      const btn   = document.getElementById('submitBtn');
      const toast = document.getElementById('formToast');

      const subject = document.querySelector('input[name="subject"]:checked')?.value || '';
      const payload = {
        name:    document.getElementById('name').value.trim(),
        email:   document.getElementById('email').value.trim(),
        phone:   document.getElementById('phone').value.trim(),
        subject,
        message: document.getElementById('message').value.trim(),
      };

      btn.disabled   = true;
      btn.innerHTML  = '<span class="spinner"></span> Sending…';
      toast.className = 'form-toast';

      try {
        const res  = await fetch('/api/contact', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        });
        const data = await res.json();

        if (data.success) {
          toast.className   = 'form-toast success';
          toast.innerHTML   = '<i class="fas fa-check-circle"></i> ' + data.message;
          document.getElementById('contactForm').reset();
          document.getElementById('charCount').textContent = '0';
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        toast.className = 'form-toast error';
        toast.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + (err.message || 'Something went wrong. Please try again.');
      } finally {
        btn.disabled  = false;
        btn.innerHTML = 'Send Message <i class="fas fa-paper-plane btn-arrow"></i>';
        toast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  </script>

</body>
</html>`;
}

module.exports = contactController;