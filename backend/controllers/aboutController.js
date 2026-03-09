const aboutController = {
  getAboutPage: (req, res) => {
    const aboutData = {
      appName: "CanteenXpress",
      tagline: "Fresh Food, Fast Orders — Right at Your Fingertips",
      description:
        "CanteenXpress is a smart campus canteen ordering system built to simplify food ordering for students and staff. Browse the menu, add to cart, and pick up your order — no queues, no hassle. We believe every student deserves a hot meal without wasting precious time standing in line.",
      version: "1.0.0",
      features: [
        {
          icon: "🍽️",
          title: "Browse Menu",
          description:
            "Explore a wide variety of daily meals, snacks, and beverages across multiple categories.",
        },
        {
          icon: "🛒",
          title: "Easy Cart",
          description:
            "Add items, adjust quantities, and checkout in seconds with campus credits.",
        },
        {
          icon: "📦",
          title: "Track Orders",
          description:
            "Get real-time status updates on your order from kitchen to counter.",
        },
        {
          icon: "⚡",
          title: "Skip The Queue",
          description:
            "Order ahead during lecture breaks and pick up when it's ready — zero wait.",
        },
        {
          icon: "💸",
          title: "Student Offers",
          description:
            "Exclusive discounts and combo deals crafted for student budgets.",
        },
        {
          icon: "🔐",
          title: "Secure Login",
          description:
            "Role-based access for students and canteen admins, secured with JWT.",
        },
      ],
      team: [
        { name: "Aryan Sharma", role: "Full Stack Developer" },
        { name: "Priya Mehta", role: "UI/UX Designer" },
        { name: "Rohit Das", role: "Backend Engineer" },
      ],
      builtWith: ["React.js", "Node.js", "Express.js", "MongoDB", "EJS"],
      stats: [
        { value: "500+", label: "Daily Orders" },
        { value: "20min", label: "Avg Ready Time" },
        { value: "4.8★", label: "Student Rating" },
        { value: "100%", label: "Fresh Food" },
      ],
    };

    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json({ success: true, data: aboutData });
    }

    res.send(renderAboutPage(aboutData));
  },
};

// ─────────────────────────────────────────────
function renderAboutPage(data) {
  const featuresHTML = data.features
    .map(
      (f) => `
    <div class="feature-card">
      <div class="feature-icon">${f.icon}</div>
      <h3 class="feature-title">${f.title}</h3>
      <p class="feature-desc">${f.description}</p>
    </div>`,
    )
    .join("");

  const teamHTML = data.team
    .map(
      (m) => `
    <div class="team-card">
      <div class="team-avatar">${m.name.charAt(0)}</div>
      <h4 class="team-name">${m.name}</h4>
      <span class="team-role">${m.role}</span>
    </div>`,
    )
    .join("");

  const techHTML = data.builtWith
    .map(
      (t) => `
    <span class="tech-badge">${t}</span>`,
    )
    .join("");

  const statsHTML = data.stats
    .map(
      (s) => `
    <div class="stat-item">
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>About Us | ${data.appName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    /* ── VARIABLES (same as home.ejs) ── */
    :root {
      --primary:        #FF6B35;
      --primary-hover:  #E55A2B;
      --primary-light:  #FFF0E8;
      --secondary:      #4CAF50;
      --secondary-light:#E8F5E9;
      --bg-primary:     #FFF8E7;
      --bg-secondary:   #FFFFFF;
      --bg-tertiary:    #F8F9FA;
      --text-primary:   #2D3436;
      --text-secondary: #636E72;
      --border-color:   #E8E8E8;
      --shadow-sm:      0 2px 4px rgba(0,0,0,0.08);
      --shadow-md:      0 4px 12px rgba(0,0,0,0.1);
      --shadow-lg:      0 8px 24px rgba(0,0,0,0.12);
      --radius-sm:      6px;
      --radius-md:      10px;
      --radius-lg:      16px;
      --transition:     all 0.3s ease;
    }

    /* ── RESET ── */
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior: smooth; }

    body {
      font-family: 'Open Sans', sans-serif;
      background-color: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
    }

    h1,h2,h3,h4,h5 {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      line-height: 1.3;
    }

    a { text-decoration: none; color: inherit; transition: var(--transition); }
    ul { list-style: none; }

    /* ── NAVBAR (exact match to home.ejs) ── */
    body { padding-top: 68px; }

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

    .logo { display:flex; align-items:center; gap:10px; flex-shrink:0; }

    .logo-icon {
      width:40px; height:40px;
      background: var(--primary);
      border-radius: var(--radius-sm);
      display:flex; align-items:center; justify-content:center;
      color:white; font-size:17px;
      box-shadow: 0 4px 12px var(--primary-glow);
    }

    .logo-text {
      font-family: 'Poppins', sans-serif;
      font-size: 20px;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.5px;
    }

    .logo-text span { color: var(--primary); }

    .nav-links { display:flex; align-items:center; gap:4px; }

    .nav-link {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-secondary);
      padding: 7px 14px;
      border-radius: var(--radius-full);
      position: relative;
    }

    .nav-link:hover { color: var(--text-primary); background: var(--bg-tertiary); }
    .nav-link.active { color: var(--primary); background: var(--primary-light); font-weight: 600; }

    /* Search Bar */
    .search-bar {
      display: flex;
      align-items: center;
      background: var(--bg-tertiary);
      border: 1.5px solid transparent;
      border-radius: var(--radius-full);
      padding: 9px 16px;
      gap: 9px;
      width: 220px;
      transition: var(--transition);
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

    /* Cart icon */
    .nav-cart-btn {
      position: relative;
      width: 44px; height: 44px;
      background: var(--primary-light);
      border-radius: 50%;
      display: flex; align-items:center; justify-content:center;
      color: var(--primary);
      font-size: 18px;
      transition: var(--transition-bounce);
      flex-shrink: 0;
    }

    .nav-cart-btn:hover {
      background: var(--primary); color: white;
      transform: translateY(-1px);
      box-shadow: 0 6px 18px var(--primary-glow);
    }

    .nav-cart-count {
      position: absolute;
      top:-4px; right:-4px;
      background: var(--primary);
      color: white;
      font-size: 11px; font-weight: 700;
      width:20px; height:20px;
      border-radius: 50%;
      display:flex; align-items:center; justify-content:center;
      line-height: 1;
      border: 2px solid white;
    }

    .nav-cart-btn:hover .nav-cart-count { background: white; color: var(--primary); border-color: var(--primary); }

    /* Wallet */
    .wallet-balance {
      display: flex; align-items: center; gap: 6px;
      background: var(--secondary-light);
      color: var(--secondary);
      padding: 7px 13px;
      border-radius: var(--radius-full);
      font-size: 13px; font-weight: 600;
    }

    /* User profile */
    .user-profile {
      display:flex; align-items:center; gap:9px;
      cursor:pointer;
      padding: 5px 12px 5px 5px;
      border-radius: var(--radius-full);
      border: 1.5px solid var(--border-color);
      transition: var(--transition);
      position: relative;
    }

    .user-profile:hover { border-color: var(--primary); background: var(--primary-light); }

    .user-avatar {
      width:34px; height:34px;
      border-radius:50%;
      background: linear-gradient(135deg, var(--primary), #FF8A65);
      display:flex; align-items:center; justify-content:center;
      color:white; font-weight:700; font-size:13px;
    }

    .user-name {
      font-weight:600; font-size:13.5px;
      color: var(--text-primary);
      display: none;
    }

    @media (min-width: 900px) { .user-name { display: block; } }

    /* Dropdown */
    .dropdown { position: relative; }

    .dropdown-content {
      display: none;
      position: absolute;
      top: calc(100% + 8px); right: 0;
      background: white;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      min-width: 180px;
      padding: 8px;
      border: 1px solid var(--border-color);
      z-index: 100;
    }

    .dropdown:hover .dropdown-content { display: block; }

    .dropdown-content a {
      display: flex; align-items: center; gap: 10px;
      padding: 9px 12px;
      border-radius: var(--radius-sm);
      font-size: 13.5px; color: var(--text-secondary); font-weight: 500;
    }

    .dropdown-content a:hover { background: var(--bg-tertiary); color: var(--text-primary); }
    .dropdown-content hr { border: none; border-top: 1px solid var(--border-color); margin: 6px 0; }

    .auth-buttons { display:flex; align-items:center; gap:10px; }

    .btn-login {
      font-size:14px; font-weight:600;
      color: var(--text-secondary);
      padding: 8px 16px;
      border-radius: var(--radius-full);
      border: 1.5px solid var(--border-color);
    }

    .btn-login:hover { border-color:var(--primary); color:var(--primary); }

    .nav-right { display:flex; align-items:center; gap:10px; }

    /* Mobile toggle */
    .mobile-toggle {
      display: none; flex-direction: column; gap: 5px;
      background: none; padding: 8px;
      border: none; cursor: pointer;
    }

    .mobile-toggle span {
      width: 22px; height: 2px;
      background: var(--text-primary);
      border-radius: 2px;
      transition: var(--transition);
      display: block;
    }

    @media (max-width: 992px) {
      .nav-links, .search-bar { display:none; }
      .mobile-toggle { display: flex; }
    }

    /* Mobile menu */
    .mobile-menu {
      position: fixed;
      top: 0; left: -100%;
      width: 80%; max-width: 300px; height: 100vh;
      background: white;
      z-index: 1001;
      transition: var(--transition);
      padding: 24px;
      box-shadow: var(--shadow-xl);
      overflow-y: auto;
    }

    .mobile-menu.active { left: 0; }

    .mobile-menu-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 28px;
    }

    .mobile-menu-close {
      width: 38px; height: 38px;
      background: var(--bg-tertiary); border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 17px; color: var(--text-secondary);
      border: none; cursor: pointer;
    }

    .mobile-nav-links { display: flex; flex-direction: column; gap: 4px; }

    .mobile-nav-link {
      display: flex; align-items: center; gap: 12px;
      padding: 13px 14px;
      border-radius: var(--radius-md);
      font-weight: 500; font-size: 14.5px;
      color: var(--text-secondary);
    }

    .mobile-nav-link:hover,
    .mobile-nav-link.active { background: var(--primary-light); color: var(--primary); }

    .mobile-nav-link i { width: 18px; text-align: center; }

    .mobile-cart-row {
      display: flex; align-items: center; justify-content: space-between;
      background: var(--primary); color: white;
      padding: 13px 16px;
      border-radius: var(--radius-md);
      margin-top: 12px;
      font-weight: 600; font-size: 14.5px;
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
      z-index: 1000;
      opacity: 0; visibility: hidden;
      transition: var(--transition);
    }

    .overlay.active { opacity: 1; visibility: visible; }

    /* ── HERO BANNER ── */
    .about-hero {
      background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
      padding: 72px 24px 60px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .about-hero::before {
      content: '';
      position: absolute;
      top: -60px; right: -80px;
      width: 500px; height: 500px;
      background: var(--primary-light);
      border-radius: 50%;
      opacity: 0.5;
      z-index: 0;
    }

    .about-hero::after {
      content: '';
      position: absolute;
      bottom: -80px; left: -60px;
      width: 350px; height: 350px;
      background: var(--secondary-light);
      border-radius: 50%;
      opacity: 0.4;
      z-index: 0;
    }

    .about-hero-inner {
      position: relative;
      z-index: 1;
      max-width: 700px;
      margin: 0 auto;
    }

    .hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--primary-light);
      color: var(--primary);
      font-size: 13px;
      font-weight: 600;
      padding: 6px 16px;
      border-radius: 999px;
      margin-bottom: 20px;
    }

    .hero-dot {
      width: 7px; height: 7px;
      background: var(--primary);
      border-radius: 50%;
      animation: pulse-dot 2s ease-in-out infinite;
    }

    @keyframes pulse-dot {
      0%,100% { opacity:1; transform:scale(1); }
      50%      { opacity:0.5; transform:scale(0.7); }
    }

    .about-hero h1 {
      font-size: 48px;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -1px;
      margin-bottom: 16px;
    }

    .about-hero h1 span { color: var(--primary); }

    .about-hero p {
      font-size: 17px;
      color: var(--text-secondary);
      max-width: 560px;
      margin: 0 auto;
      line-height: 1.7;
    }

    @media (max-width: 576px) {
      .about-hero h1 { font-size: 32px; }
      .about-hero p  { font-size: 15px; }
    }

    /* ── STATS BAR ── */
    .stats-bar {
      background: var(--primary);
      padding: 32px 24px;
    }

    .stats-inner {
      max-width: 900px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      text-align: center;
    }

    .stat-item {}

    .stat-value {
      font-family: 'Poppins', sans-serif;
      font-size: 32px;
      font-weight: 800;
      color: white;
      line-height: 1;
    }

    .stat-label {
      font-size: 13px;
      color: rgba(255,255,255,0.8);
      margin-top: 4px;
      font-weight: 500;
    }

    @media (max-width: 576px) {
      .stats-inner { grid-template-columns: repeat(2,1fr); }
    }

    /* ── SHARED SECTION STYLES ── */
    .section {
      padding: 72px 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--primary);
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .section-title {
      font-size: 32px;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 12px;
    }

    .section-title span { color: var(--primary); }

    .section-subtitle {
      font-size: 15px;
      color: var(--text-secondary);
      max-width: 560px;
      line-height: 1.7;
      margin-bottom: 48px;
    }

    /* ── ABOUT DESCRIPTION ── */
    .about-desc-section {
      background: var(--bg-secondary);
      padding: 72px 24px;
    }

    .about-desc-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: center;
    }

    .about-desc-text {
      font-size: 16px;
      color: var(--text-secondary);
      line-height: 1.8;
    }

    .about-desc-text p { margin-bottom: 16px; }

    .about-highlight {
      background: var(--primary-light);
      border-left: 4px solid var(--primary);
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
      padding: 20px 24px;
      margin-top: 24px;
    }

    .about-highlight p {
      font-size: 15px;
      font-weight: 600;
      color: var(--primary);
      margin: 0;
      font-family: 'Poppins', sans-serif;
    }

    .about-visual {
      background: linear-gradient(135deg, var(--primary-light), #FFF5F0);
      border-radius: var(--radius-lg);
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .visual-item {
      background: white;
      border-radius: var(--radius-md);
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
    }

    .visual-item:hover {
      transform: translateX(6px);
      box-shadow: var(--shadow-md);
    }

    .visual-icon {
      width: 48px; height: 48px;
      border-radius: var(--radius-md);
      background: var(--primary-light);
      display: flex; align-items:center; justify-content:center;
      font-size: 22px;
      flex-shrink: 0;
    }

    .visual-text h4 {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 2px;
    }

    .visual-text p {
      font-size: 12px;
      color: var(--text-secondary);
      margin: 0;
    }

    @media (max-width: 768px) {
      .about-desc-inner { grid-template-columns: 1fr; gap: 40px; }
    }

    /* ── FEATURES GRID ── */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }

    .feature-card {
      background: var(--bg-secondary);
      border-radius: var(--radius-md);
      padding: 32px 28px;
      border: 2px solid transparent;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
      position: relative;
      overflow: hidden;
    }

    .feature-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 4px; height: 100%;
      background: var(--primary);
      opacity: 0;
      transition: var(--transition);
    }

    .feature-card:hover {
      transform: translateY(-5px);
      border-color: var(--primary);
      box-shadow: var(--shadow-md);
    }

    .feature-card:hover::before { opacity: 1; }

    .feature-icon {
      font-size: 36px;
      margin-bottom: 16px;
      display: block;
    }

    .feature-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 10px;
    }

    .feature-desc {
      font-size: 14px;
      color: var(--text-secondary);
      line-height: 1.7;
    }

    /* ── TEAM ── */
    .team-section {
      background: var(--bg-secondary);
      padding: 72px 24px;
    }

    .team-inner {
      max-width: 1200px;
      margin: 0 auto;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 24px;
      margin-top: 0;
    }

    .team-card {
      background: var(--bg-primary);
      border-radius: var(--radius-lg);
      padding: 36px 28px;
      text-align: center;
      border: 2px solid transparent;
      transition: var(--transition);
    }

    .team-card:hover {
      border-color: var(--primary);
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }

    .team-avatar {
      width: 70px; height: 70px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), #FF8A65);
      color: white;
      font-size: 26px;
      font-weight: 700;
      display: flex; align-items:center; justify-content:center;
      margin: 0 auto 16px;
      font-family: 'Poppins', sans-serif;
      box-shadow: 0 6px 20px rgba(255,107,53,0.3);
    }

    .team-name {
      font-size: 17px;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 6px;
    }

    .team-role {
      font-size: 13px;
      color: var(--primary);
      font-weight: 500;
      background: var(--primary-light);
      padding: 4px 12px;
      border-radius: 999px;
      display: inline-block;
    }

    /* ── TECH STACK ── */
    .tech-section {
      background: var(--bg-primary);
      padding: 72px 24px;
    }

    .tech-inner {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }

    .tech-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      margin-top: 0;
    }

    .tech-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-secondary);
      color: var(--text-primary);
      border: 1.5px solid var(--border-color);
      border-radius: 999px;
      padding: 10px 22px;
      font-size: 14px;
      font-weight: 600;
      font-family: 'Poppins', sans-serif;
      transition: var(--transition);
      box-shadow: var(--shadow-sm);
    }

    .tech-badge:hover {
      border-color: var(--primary);
      color: var(--primary);
      background: var(--primary-light);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    /* ── FOOTER (same as home.ejs) ── */
    .footer {
      background: var(--text-primary);
      color: white;
      padding: 60px 24px 24px;
    }

    .footer-container { max-width: 1200px; margin: 0 auto; }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;
      gap: 48px;
      margin-bottom: 40px;
    }

    .footer-about .logo-text { color: white; }

    .footer-about p {
      font-size: 13.5px;
      color: rgba(255,255,255,0.5);
      line-height: 1.7;
      margin-top: 14px;
    }

    .social-links { display:flex; gap:10px; margin-top:20px; }

    .social-link {
      width:38px; height:38px;
      background: rgba(255,255,255,0.07);
      border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      color: rgba(255,255,255,0.6);
      font-size:14px;
      transition: var(--transition);
    }

    .social-link:hover { background: var(--primary); color:white; transform:translateY(-2px); }

    .footer-title {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 18px;
      color: white;
    }

    .footer-links li { margin-bottom: 10px; }

    .footer-links a {
      font-size: 13.5px;
      color: rgba(255,255,255,0.45);
    }

    .footer-links a:hover { color: var(--primary); padding-left:4px; }

    .footer-contact p {
      display:flex; align-items:center; gap:10px;
      font-size: 13.5px;
      color: rgba(255,255,255,0.45);
      margin-bottom: 10px;
    }

    .footer-contact i { color: var(--primary); width:16px; font-size:13px; }

    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.07);
      padding-top: 24px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      flex-wrap:wrap;
      gap:14px;
    }

    .footer-bottom p { font-size:13px; color:rgba(255,255,255,0.3); }

    .footer-bottom-links { display:flex; gap:24px; }

    .footer-bottom-links a {
      font-size:13px;
      color: rgba(255,255,255,0.3);
    }

    .footer-bottom-links a:hover { color: var(--primary); }

    @media (max-width: 768px) {
      .footer-grid { grid-template-columns: 1fr; gap:32px; }
      .team-grid { grid-template-columns: 1fr 1fr; }
      .features-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <!-- ══ NAVBAR ══ -->
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="/home" class="logo">
        <div class="logo-icon"><i class="fas fa-utensils"></i></div>
        <span class="logo-text">Canteen<span>Xpress</span></span>
      </a>

      <ul class="nav-links">
        <li><a href="/"    class="nav-link">Home</a></li>
        <li><a href="/menu"    class="nav-link">Menu</a></li>
        <li><a href="/orders"  class="nav-link">My Orders</a></li>
        <li><a href="/about"   class="nav-link active">About</a></li>
        <li><a href="/contact" class="nav-link">Contact</a></li>
      </ul>

      <div class="nav-right">
        <!-- Search bar (always visible on desktop) -->
        <div class="search-bar">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search food..." id="searchInput">
        </div>

        <!-- Cart icon -->
        <a href="http://localhost:3000/cart" class="nav-cart-btn">
          <i class="fas fa-shopping-cart"></i>
          <span class="nav-cart-count" id="navCartCount">0</span>
        </a>

        <!-- Auth buttons (shown when not logged in) -->
<div class="auth-buttons" id="authButtons">
  <a href="http://localhost:3000/login" class="btn-login">Login</a>
  <a href="http://localhost:3000/register" class="btn-signup-nav">Sign Up</a>
</div>
<div class="user-section" id="userSection" style="display:none;align-items:center;gap:10px;">
  <div class="user-pill" style="display:flex;align-items:center;gap:9px;cursor:pointer;padding:5px 12px 5px 5px;border-radius:999px;border:1.5px solid #EBEBEB;">
    <div class="user-avatar" id="userAvatar" style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#FF6B35,#FF8A65);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:13px;">U</div>
    <span id="userNameDisplay" style="font-weight:600;font-size:13.5px;">User</span>
  </div>
  <button onclick="logout()" style="font-size:13px;font-weight:600;color:#636E72;padding:7px 14px;border-radius:999px;border:1.5px solid #EBEBEB;background:none;cursor:pointer;">Logout</button>
</div>

        <!-- Mobile Toggle -->
        <button class="mobile-toggle" onclick="toggleMobileMenu()">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>

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
      <li><a href="/about"   class="mobile-nav-link active"><i class="fas fa-info-circle"></i><span>About Us</span></a></li>
      <li><a href="/contact" class="mobile-nav-link"><i class="fas fa-envelope"></i><span>Contact</span></a></li>
      <li><a href="/login"   class="mobile-nav-link"><i class="fas fa-sign-in-alt"></i><span>Login</span></a></li>
    </ul>
    <a href="http://localhost:3000/cart" class="mobile-cart-row">

      <div style="display:flex;align-items:center;gap:10px;">
        <i class="fas fa-shopping-cart"></i> My Cart
      </div>
      <span id="mobileCartCount">0</span>
    </a>
  </div>

  <!-- ══ HERO ══ -->
  <section class="about-hero">
    <div class="about-hero-inner">
      <div class="hero-eyebrow">
        <span class="hero-dot"></span>
        About Us
      </div>
      <h1>We're Building <span>Smarter</span> Campus Dining</h1>
      <p>${data.description}</p>
    </div>
  </section>

  <!-- ══ STATS BAR ══ -->
  <div class="stats-bar">
    <div class="stats-inner">
      ${statsHTML}
    </div>
  </div>

  <!-- ══ ABOUT DESCRIPTION ══ -->
  <div class="about-desc-section">
    <div class="about-desc-inner">
      <div>
        <div class="section-label">Our Story</div>
        <h2 class="section-title">Why We Built <span>CanteenXpress</span></h2>
        <div class="about-desc-text">
          <p>Every student knows the frustration — a 30-minute lunch break, a 20-minute queue, and cold food at the end of it. We built CanteenXpress to fix exactly that.</p>
          <p>By letting students pre-order from their phones, we give the canteen staff advance notice, reduce congestion at the counter, and make sure every meal is fresh and ready on time.</p>
          <div class="about-highlight">
            <p>"Hot food, zero wait. Order ahead, eat on time."</p>
          </div>
        </div>
      </div>
      <div class="about-visual">
        <div class="visual-item">
          <div class="visual-icon">📱</div>
          <div class="visual-text">
            <h4>Order from anywhere on campus</h4>
            <p>Classroom, library, or hostel — place your order in seconds</p>
          </div>
        </div>
        <div class="visual-item">
          <div class="visual-icon">🔔</div>
          <div class="visual-text">
            <h4>Real-time notifications</h4>
            <p>Know exactly when your food is ready for pickup</p>
          </div>
        </div>
        <div class="visual-item">
          <div class="visual-icon">💳</div>
          <div class="visual-text">
            <h4>Campus credits & offers</h4>
            <p>Student-exclusive deals and easy digital payments</p>
          </div>
        </div>
        <div class="visual-item">
          <div class="visual-icon">⭐</div>
          <div class="visual-text">
            <h4>Rated 4.8 by students</h4>
            <p>Loved by hundreds of students across the campus</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ══ FEATURES ══ -->
  <section class="section">
    <div class="section-label">What We Offer</div>
    <h2 class="section-title">Everything You <span>Need</span></h2>
    <p class="section-subtitle">Powerful features designed to make campus dining effortless for every student.</p>
    <div class="features-grid">
      ${featuresHTML}
    </div>
  </section>


  <!-- ══ FOOTER (same as home.ejs) ══ -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">

        <div class="footer-about">
          <a href="/home" class="logo">
            <div class="logo-icon"><i class="fas fa-utensils"></i></div>
            <span class="logo-text">Canteen<span>Xpress</span></span>
          </a>
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
<script>
 // Auth check
const REACT_URL = "http://localhost:3000";
const API_URL = "http://localhost:5000/api";

async function initAuth() {
  const token = localStorage.getItem("canteen_token");
  if (!token) {
    document.getElementById("authButtons").style.display = "flex";
    document.getElementById("userSection").style.display = "none";
    return;
  }
  try {
    const res = await fetch(API_URL + "/auth/me", {
      headers: { Authorization: "Bearer " + token }
    });
    const data = await res.json();
    if (data.user) {
      document.getElementById("authButtons").style.display = "none";
      document.getElementById("userSection").style.display = "flex";
      document.getElementById("userNameDisplay").textContent = data.user.name.split(" ")[0];
      document.getElementById("userAvatar").textContent = data.user.name[0].toUpperCase();
    } else { logout(); }
  } catch(e) { logout(); }
}

function logout() {
  localStorage.removeItem("canteen_token");
  window.location.href = REACT_URL + "/login";
}

document.addEventListener("DOMContentLoaded", initAuth);
</script>
</body>
</html>`;
}

module.exports = aboutController;
