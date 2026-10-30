/* Builds the page from content.js. You normally do not need to edit this file. */
(function () {
  const C = CONTENT;
  const $ = (id) => document.getElementById(id);

  // Small helper: create an element safely (text is never treated as HTML)
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") return;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    });
    (children || []).forEach((c) => c && node.appendChild(c));
    return node;
  }

  // Icons (simple line icons)
  const ICONS = {
    mail: '<path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/>',
    linkedin: '<path d="M6 9v10M6 5.5v.01M10 19v-6a3 3 0 0 1 6 0v6M10 9v10"/>',
    github: '<path d="M9 19c-4 1.3-4-2-6-2.5m12 4.5v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6.2 0C6.3 2.8 5.3 3.1 5.3 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.9 9.5c0 4.600 2.800 5.700 5.500 6a2.800 2.800 0 0 0-.8 2.200V21"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.500 6.500v.01"/>',
    pinterest: '<circle cx="12" cy="12" r="9"/><path d="M10.500 20.500 12 13m-1.500-3.500a2.500 2.500 0 1 1 3.500 2.300M9.500 9.500"/>',
    download: '<path d="M12 4v10m0 0-4-4m4 4 4-4M5 19h14"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5H5V6h5"/>',
    code: '<path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 5l-4 14"/>',
    award: '<circle cx="12" cy="9" r="5"/><path d="m9 13-1.500 7L12 18l4.500 2L15 13"/>',
    eye: '<path d="M2 12s3.500-6.500 10-6.500S22 12 22 12s-3.500 6.500-10 6.500S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.800"/><path d="m21 16-5-5-9 9"/>'
  };
  function icon(name) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = ICONS[name] || "";
    return svg;
  }

  // Gives each item one of the six color sets in style.css (data-c = 0..5)
  function paint(nodes, offset) {
    nodes.forEach((n, i) => n && n.setAttribute("data-c", String((i + (offset || 0)) % 6)));
  }

  // ---------- Header / hero ----------
  const firstName = C.name.split(" ")[1] || C.name;
  const brand = $("brand");
  brand.textContent = "";
  brand.appendChild(document.createTextNode(firstName));
  brand.appendChild(el("span", { text: "." }));

  $("hero-eyebrow").textContent = C.eyebrow;
  $("hero-name").textContent = C.name;
  $("hero-role").textContent = C.role;
  $("hero-tagline").textContent = C.tagline;
  $("hero-img").src = C.photo;
  $("resume-btn").href = C.resume;

  const socials = [
    ["linkedin", "LinkedIn", C.links.linkedin],
    ["github", "GitHub", C.links.github],
    ["instagram", "Instagram", C.links.instagram],
    ["pinterest", "Pinterest", C.links.pinterest],
    ["mail", "Email", "mailto:" + C.links.email]
  ];
  const heroSocial = $("hero-social");
  socials.forEach(([ic, label, url]) => {
    const a = el("a", { href: url, "aria-label": label, title: label, target: url.startsWith("http") ? "_blank" : null, rel: "noopener noreferrer" });
    a.appendChild(icon(ic));
    heroSocial.appendChild(el("li", {}, [a]));
  });
  paint(Array.from(heroSocial.children));

  // ---------- About ----------
  const aboutText = $("about-text");
  C.about.forEach((p) => aboutText.appendChild(el("p", { text: p })));
  const facts = $("about-facts");
  C.facts.forEach((f) =>
    facts.appendChild(el("div", {}, [el("dt", { text: f.label }), el("dd", { text: f.value })]))
  );
  paint(Array.from(facts.children), 1);

  // ---------- Experience ----------
  const expList = $("experience-list");
  C.experience.forEach((job) => {
    const ul = el("ul", { class: "bullets" }, job.bullets.map((b) => el("li", { text: b })));
    expList.appendChild(
      el("article", { class: "job reveal" }, [
        el("div", { class: "job-head" }, [
          el("div", {}, [
            el("h3", { text: job.role }),
            el("p", { class: "job-company", text: job.company + " · " + job.place })
          ]),
          el("span", { class: "pill", text: job.dates })
        ]),
        ul
      ])
    );
  });

  // ---------- Projects ----------
  const projList = $("projects-list");
  C.projects.forEach((p) => {
    let media;
    if (p.image) {
      media = el("div", { class: "project-media" }, [el("img", { src: p.image, alt: p.imageAlt || p.title, loading: "lazy" })]);
    } else {
      const ph = el("div", { class: "placeholder" }, [el("span", { text: "Project preview coming soon" })]);
      ph.insertBefore(icon("image"), ph.firstChild);
      media = el("div", { class: "project-media" }, [ph]);
    }
    const btns = el("div", { class: "btn-row" });
    (p.buttons || []).forEach((b) => {
      const isGit = /github/i.test(b.label);
      const a = el("a", { class: "btn " + (b.style || "primary"), href: b.url, target: "_blank", rel: "noopener noreferrer" });
      a.appendChild(icon(isGit ? "code" : "external"));
      a.appendChild(document.createTextNode(b.label));
      btns.appendChild(a);
    });
    projList.appendChild(
      el("article", { class: "project reveal" }, [
        media,
        el("div", { class: "project-body" }, [
          el("div", { class: "project-top" }, [el("h3", { text: p.title }), el("span", { class: "project-date", text: p.date })]),
          el("p", { class: "project-desc", text: p.description }),
          el("ul", { class: "bullets" }, (p.bullets || []).map((b) => el("li", { text: b }))),
          el("ul", { class: "tags" }, (p.tags || []).map((t) => el("li", { text: t }))),
          btns
        ])
      ])
    );
  });

  // Each project card gets its own color
  Array.from(projList.children).forEach((card, pi) => {
    card.setAttribute("data-c", String([0, 3, 1, 2, 4, 5][pi % 6]));
    paint(Array.from(card.querySelectorAll(".tags li")), pi);
  });

  // ---------- Skills ----------
  const skillsList = $("skills-list");
  C.skills.forEach((s) =>
    skillsList.appendChild(
      el("div", { class: "skill-card reveal" }, [
        el("h3", { text: s.group }),
        el("ul", { class: "chips" }, s.items.map((i) => el("li", { text: i })))
      ])
    )
  );

  Array.from(skillsList.children).forEach((card, gi) => {
    card.setAttribute("data-c", String(gi % 6));
    paint(Array.from(card.querySelectorAll(".chips li")), gi);
  });

  // ---------- Education ----------
  const eduList = $("education-list");
  C.education.forEach((e) =>
    eduList.appendChild(
      el("article", { class: "edu reveal" }, [
        el("h3", { text: e.degree }),
        el("p", { text: e.school }),
        el("div", { class: "edu-meta" }, [el("span", { class: "pill", text: e.years }), el("span", { class: "edu-score", text: e.score })])
      ])
    )
  );

  // ---------- Certifications ----------
  const certList = $("cert-list");
  C.certifications.forEach((c) => {
    const dot = el("span", { class: "dot" });
    dot.appendChild(icon("award"));
    const meta = c.issuer + (c.date ? " · " + c.date : "");
    certList.appendChild(
      el("li", { class: "reveal" }, [dot, el("div", {}, [el("p", { class: "cert-title", text: c.title }), el("p", { class: "cert-meta", text: meta })])])
    );
  });

  paint(Array.from(eduList.children));
  paint(Array.from(certList.children), 2);

  // ---------- Beyond code ----------
  const b = C.beyond;
  const left = el("div", {}, [
    el("p", { class: "eyebrow", text: b.niche }),
    el("h3", { text: b.title }),
    el("p", { text: b.description })
  ]);
  const act = el("div", { class: "beyond-actions" });
  const pinBtn = el("a", { class: "btn primary", href: C.links.pinterest, target: "_blank", rel: "noopener noreferrer" });
  pinBtn.appendChild(icon("external"));
  pinBtn.appendChild(document.createTextNode("View Pinterest"));
  act.appendChild(pinBtn);
  act.appendChild(el("span", { class: "handle", text: "@" + b.handle }));
  left.appendChild(act);

  const stats = el("div", { class: "stats" }, b.stats.map((s) => el("div", { class: "stat" }, [el("strong", { text: s.value }), el("span", { text: s.label })])));
  const interests = el("div", { class: "interests" }, [el("span", { class: "label", text: "Interests" })].concat(b.interests.map((i) => el("span", { class: "pill", text: i }))));
  const card = $("beyond-card");
  card.appendChild(left);
  card.appendChild(stats);
  card.appendChild(interests);
  paint(Array.from(stats.children), 1);
  paint(Array.from(interests.querySelectorAll(".pill")));

  // ---------- Contact ----------
  const contactList = $("contact-list");
  [
    ["mail", "Email", C.links.email, "mailto:" + C.links.email],
    ["linkedin", "LinkedIn", "rajashekar-reddy-ardha", C.links.linkedin],
    ["instagram", "Instagram", "@hanumantha.raj25", C.links.instagram],
    ["github", "GitHub", "rajashekar2629", C.links.github],
    ["pinterest", "Pinterest", "@" + b.handle, C.links.pinterest]
  ].forEach(([ic, label, value, url]) => {
    const iconWrap = el("span", { class: "c-icon" });
    iconWrap.appendChild(icon(ic));
    const a = el("a", { href: url, target: url.startsWith("http") ? "_blank" : null, rel: "noopener noreferrer" }, [
      iconWrap,
      el("span", {}, [el("span", { class: "c-label", text: label }), el("span", { class: "c-value", text: value })])
    ]);
    contactList.appendChild(el("li", {}, [a]));
  });
  paint(Array.from(contactList.children));

  // ---------- Footer ----------
  $("footer-text").textContent = "© " + new Date().getFullYear() + " " + C.name + ". Built with HTML, CSS and JavaScript.";

  // ---------- Behaviour ----------
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = $("nav-toggle");
  const links = $("nav-links");
  function setMenu(open) {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("open")));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Highlight current section in nav
  const navAnchors = Array.from(links.querySelectorAll("a[href^='#']")).filter((a) => !a.classList.contains("nav-cta"));
  const sections = navAnchors.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach((s) => spy.observe(s));

    // Reveal on scroll
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
  } else {
    document.querySelectorAll(".reveal").forEach((n) => n.classList.add("visible"));
  }

  // ---------- Intro: water bubbles cover the square photo, then fly away ----------
  (function bubbleIntro() {
    const root = document.documentElement;
    const stage = $("photo-stage");
    const layer = $("bubbles");
    const showPhoto = () => root.classList.add("photo-ready");
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // No animation for people who prefer reduced motion, or very old browsers
    if (!stage || !layer || reduce || typeof layer.animate !== "function") {
      showPhoto();
      if (layer) layer.remove();
      return;
    }
    const W = stage.getBoundingClientRect().width;
    const H = stage.getBoundingClientRect().height;
    if (!W || !H) { showPhoto(); layer.remove(); return; }

    const HOLD = 1500;                       // ms the bubbles stay on the photo
    const HUES = [255, 330, 28, 172, 212, 45]; // violet, pink, orange, teal, blue, yellow
    const rand = (a, b) => a + Math.random() * (b - a);

    // 1) Cover the whole square with overlapping bubbles
    const cell = Math.max(44, W / 7);
    const step = cell * 0.72;
    const bubbles = [];
    for (let y = 0; y <= H + 1; y += step) {
      for (let x = 0; x <= W + 1; x += step) {
        const d = cell * rand(1.25, 1.6);
        const cx = Math.min(Math.max(x + rand(-0.12, 0.12) * cell, d * 0.4), W - d * 0.4);
        const cy = Math.min(Math.max(y + rand(-0.12, 0.12) * cell, d * 0.4), H - d * 0.4);
        const node = document.createElement("div");
        node.className = "bubble";
        node.style.cssText =
          "left:" + (cx - d / 2) + "px;top:" + (cy - d / 2) + "px;width:" + d + "px;height:" + d + "px;" +
          "--h:" + HUES[Math.floor(Math.random() * HUES.length)] + ";--d:" + rand(0, 1).toFixed(2) + "s";
        layer.appendChild(node);
        bubbles.push({ node: node, cx: cx, cy: cy });
      }
    }

    // 2) After a short hold, every bubble floats away and fades out
    const finished = [];
    setTimeout(function () {
      bubbles.forEach(function (bb) {
        bb.node.classList.add("go");
        const angle = Math.atan2(bb.cy - H / 2, bb.cx - W / 2) + rand(-0.7, 0.7);
        const dist = rand(150, 420);
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist - rand(80, 220); // drifts upward like real bubbles
        const wiggle = rand(-30, 30);
        const anim = bb.node.animate(
          [
            { transform: "translate(0px,0px) scale(1)", opacity: 1 },
            { transform: "translate(" + (dx * 0.35 + wiggle) + "px," + dy * 0.35 + "px) scale(1.08)", opacity: 1, offset: 0.35 },
            { transform: "translate(" + dx + "px," + dy + "px) scale(" + rand(0.7, 1.5) + ")", opacity: 0 }
          ],
          { duration: rand(1400, 2400), delay: rand(0, 700), easing: "cubic-bezier(.25,.1,.4,1)", fill: "forwards" }
        );
        finished.push(anim.finished.catch(function () {}));
      });
      // 3) The photo fades in as the last bubbles leave
      setTimeout(showPhoto, 1400);
      Promise.all(finished).then(function () { layer.remove(); });
    }, HOLD);

    // Safety net: never leave the photo hidden
    setTimeout(function () { showPhoto(); if (layer.isConnected) layer.remove(); }, 7000);
  })();
})();
