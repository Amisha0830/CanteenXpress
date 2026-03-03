const aboutController = {
  getAboutPage: (req, res) => {
    const aboutData = {
      appName: "CanteenQ",
      tagline: "Fresh Food, Fast Orders — Right at Your Fingertips",
      description:
        "CanteenQ is a smart canteen ordering system built to simplify food ordering for students and staff. Browse the menu, add to cart, and pick up your order — no queues, no hassle.",
      version: "1.0.0",
      features: [
        {
          icon: "🍽️",
          title: "Browse Menu",
          description: "Explore a wide variety of daily meals, snacks, and beverages.",
        },
        {
          icon: "🛒",
          title: "Easy Cart",
          description: "Add items, adjust quantities, and checkout in seconds.",
        },
        {
          icon: "📦",
          title: "Track Orders",
          description: "Get real-time status updates on your order from kitchen to counter.",
        },
        {
          icon: "🔐",
          title: "Secure Login",
          description: "Role-based access for students and canteen admins.",
        },
      ],
      team: [
        { name: "Aryan Sharma", role: "Full Stack Developer" },
        { name: "Priya Mehta", role: "UI/UX Designer" },
        { name: "Rohit Das", role: "Backend Engineer" },
      ],
      contact: {
        email: "support@canteenq.app",
        phone: "+91-9876543210",
        address: "Block B, Tech Campus, Bengaluru, India",
      },
      builtWith: ["React.js", "Node.js", "Express.js", "MongoDB", "ImageKit"],
    };

    // JSON API response
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json({ success: true, data: aboutData });
    }

    // HTML page response
    res.send(renderAboutPage(aboutData));
  },
};

function renderAboutPage(data) {
  const featuresHTML = data.features
    .map(
      (f) => `
      <div class="card">
        <div class="card-icon">${f.icon}</div>
        <h3>${f.title}</h3>
        <p>${f.description}</p>
      </div>`
    )
    .join("");

  const teamHTML = data.team
    .map(
      (m) => `
      <div class="team-card">
        <div class="avatar">${m.name.charAt(0)}</div>
        <h4>${m.name}</h4>
        <span>${m.role}</span>
      </div>`
    )
    .join("");

  const techHTML = data.builtWith
    .map((t) => `<span class="badge">${t}</span>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>About | ${data.appName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #f9fafb;
      color: #1f2937;
    }

    /* HERO */
    .hero {
      background: linear-gradient(135deg, #f97316, #ea580c);
      color: white;
      padding: 80px 20px;
      text-align: center;
    }
    .hero h1 { font-size: 3rem; font-weight: 800; letter-spacing: -1px; }
    .hero p { font-size: 1.2rem; margin-top: 12px; opacity: 0.9; }
    .version-badge {
      display: inline-block;
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.4);
      border-radius: 20px;
      padding: 4px 14px;
      font-size: 0.85rem;
      margin-top: 16px;
    }

    /* SECTIONS */
    section { padding: 60px 20px; max-width: 1100px; margin: 0 auto; }
    section h2 {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 8px;
      color: #ea580c;
    }
    section .subtitle {
      color: #6b7280;
      margin-bottom: 36px;
      font-size: 1rem;
    }

    /* ABOUT TEXT */
    .about-text {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #374151;
      max-width: 760px;
    }

    /* FEATURES GRID */
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; }
    .card {
      background: white;
      border-radius: 16px;
      padding: 28px 24px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
    .card-icon { font-size: 2.2rem; margin-bottom: 14px; }
    .card h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 8px; }
    .card p { font-size: 0.9rem; color: #6b7280; line-height: 1.6; }

    /* TEAM */
    .team-grid { display: flex; flex-wrap: wrap; gap: 24px; }
    .team-card {
      background: white;
      border-radius: 16px;
      padding: 28px 32px;
      text-align: center;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07);
      min-width: 160px;
    }
    .avatar {
      width: 56px; height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f97316, #ea580c);
      color: white;
      font-size: 1.4rem;
      font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 12px;
    }
    .team-card h4 { font-size: 1rem; font-weight: 600; }
    .team-card span { font-size: 0.85rem; color: #9ca3af; }

    /* TECH STACK */
    .badge {
      display: inline-block;
      background: #fff7ed;
      color: #ea580c;
      border: 1px solid #fed7aa;
      border-radius: 20px;
      padding: 6px 16px;
      font-size: 0.9rem;
      font-weight: 500;
      margin: 4px;
    }

    /* CONTACT */
    .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
    .contact-item {
      background: white;
      border-radius: 12px;
      padding: 20px 24px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    }
    .contact-item .label { font-size: 0.8rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
    .contact-item .value { font-size: 0.95rem; font-weight: 500; color: #1f2937; }

    /* DIVIDER */
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 0 20px; }

    /* FOOTER */
    footer {
      text-align: center;
      padding: 28px;
      background: #1f2937;
      color: #9ca3af;
      font-size: 0.9rem;
    }
    footer strong { color: #f97316; }
  </style>
</head>
<body>

  <!-- HERO -->
  <div class="hero">
    <h1>${data.appName}</h1>
    <p>${data.tagline}</p>
    <div class="version-badge">v${data.version}</div>
  </div>

  <!-- ABOUT -->
  <section>
    <h2>About Us</h2>
    <p class="subtitle">What we're building and why</p>
    <p class="about-text">${data.description}</p>
  </section>

  <hr class="divider"/>

  <!-- FEATURES -->
  <section>
    <h2>Features</h2>
    <p class="subtitle">Everything you need, nothing you don't</p>
    <div class="grid">${featuresHTML}</div>
  </section>

  <hr class="divider"/>

  <!-- TEAM -->
  <section>
    <h2>Meet the Team</h2>
    <p class="subtitle">The people behind ${data.appName}</p>
    <div class="team-grid">${teamHTML}</div>
  </section>

  <hr class="divider"/>

  <!-- TECH STACK -->
  <section>
    <h2>Built With</h2>
    <p class="subtitle">Our technology stack</p>
    <div>${techHTML}</div>
  </section>

  <hr class="divider"/>

  <!-- CONTACT -->
  <section>
    <h2>Contact Us</h2>
    <p class="subtitle">Reach out for support or feedback</p>
    <div class="contact-grid">
      <div class="contact-item">
        <div class="label">Email</div>
        <div class="value">${data.contact.email}</div>
      </div>
      <div class="contact-item">
        <div class="label">Phone</div>
        <div class="value">${data.contact.phone}</div>
      </div>
      <div class="contact-item">
        <div class="label">Address</div>
        <div class="value">${data.contact.address}</div>
      </div>
    </div>
  </section>

  <footer>
    &copy; ${new Date().getFullYear()} <strong>${data.appName}</strong> — All rights reserved.
  </footer>

</body>
</html>`;
}

module.exports = aboutController;