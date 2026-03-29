(function () {

  const navItems = [
    { label: "Home", href: "index.html", key: "home" },
    { label: "Services", href: "services.html", key: "services" },
    { label: "Portfolio", href: "portfolio.html", key: "portfolio" },
    { label: "About", href: "about.html", key: "about" },
    { label: "Technologies", href: "technologies.html", key: "technologies" },
    { label: "Blog", href: "blog.html", key: "blog" },
    { label: "Contact", href: "contact.html", key: "contact" },
    { label: "Case Studies", href: "case-studies.html", key: "case-studies" },
    { label: "Testimonials", href: "index.html#testimonials", key: "testimonials" },
    { label: "Careers", href: "careers.html", key: "careers" }
  ];

  const pageKey = document.body.dataset.page || "";

  function renderGlobalUi() {
    const body = document.body;
    if (!document.getElementById("scroll-progress")) {
      const sp = document.createElement("div");
      sp.id = "scroll-progress";
      body.appendChild(sp);
    }

    if (!document.getElementById("quick-contact")) {
      const qc = document.createElement("a");
      qc.id = "quick-contact";
      qc.href = "contact.html";
      qc.className = "btn-primary hidden sm:inline-flex";
      qc.textContent = "Start Project";
      body.appendChild(qc);
    }

    if (!document.getElementById("back-to-top")) {
      const btt = document.createElement("button");
      btt.id = "back-to-top";
      btt.innerHTML = '<i data-lucide="arrow-up" class="w-5 h-5"></i>';
      btt.ariaLabel = "Back to top";
      body.appendChild(btt);
      btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    if (!document.getElementById("mouse-glow")) {
      const glow = document.createElement("div");
      glow.id = "mouse-glow";
      body.appendChild(glow);
    }
  }

  function renderNav() {
    const slot = document.getElementById("site-nav");
    if (!slot) return;

    const desktopLinks = navItems
      .map((item) => {
        const active = pageKey === item.key ? "active" : "";
        return `<a href="${item.href}" class="nav-link whitespace-nowrap ${active}">${item.label}</a>`;
      })
      .join("");

    const mobileLinks = navItems
      .map((item) => {
        const active = pageKey === item.key ? "active" : "";
        return `<a href="${item.href}" class="block rounded-lg px-3 py-2 nav-link ${active}">${item.label}</a>`;
      })
      .join("");

    slot.innerHTML = `
      <header class="site-header fixed inset-x-0 top-0 z-50 bg-slate-950/75 backdrop-blur-xl">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <a href="index.html" class="flex items-center gap-2.5">
            <img src="assets/images/logo-mark.svg" alt="Icon" class="h-9 w-auto" width="36" height="36">
            <div class="flex flex-col leading-[0.65] items-start">
              <span class="text-2xl font-black tracking-tight text-white leading-none">ENCODE</span>
              <span class="text-[0.72rem] font-bold tracking-[0.34em] text-[#7edc05] leading-none uppercase">UNLIMITED</span>
            </div>
          </a>
          <nav class="hidden min-w-0 flex-1 items-center justify-center gap-5 overflow-x-auto whitespace-nowrap text-[13px] lg:flex">${desktopLinks}</nav>
          <a href="contact.html" class="btn-primary hidden xl:inline-flex">Start Project</a>
          <button id="mobile-menu-button" class="rounded-lg border border-slate-700 p-2 text-slate-100 lg:hidden" aria-label="Toggle navigation">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <nav id="mobile-menu" class="mx-4 mb-4 hidden rounded-xl border border-slate-800 bg-slate-900/90 p-3 lg:hidden">${mobileLinks}</nav>
      </header>
      <div class="h-[72px] md:h-[76px]"></div>
    `;

    const btn = document.getElementById("mobile-menu-button");
    const menu = document.getElementById("mobile-menu");
    if (btn && menu) {
      btn.addEventListener("click", function () {
        menu.classList.toggle("hidden");
      });
    }
  }

  function renderFooter() {
    const slot = document.getElementById("site-footer");
    if (!slot) return;

    slot.innerHTML = `
      <footer class="mt-20 border-t border-slate-800/80 bg-slate-950/70">
        <div class="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div class="lg:col-span-2">
            <div class="mb-6 flex items-center gap-4">
              <img src="assets/images/logo-mark.svg" alt="Icon" class="h-16 w-auto" width="64" height="64">
              <div class="flex flex-col items-start leading-[0.72]">
                <span class="text-5xl font-black tracking-tight text-white leading-none">ENCODE</span>
                <span class="text-[1.05rem] font-bold tracking-[0.55em] text-[#7edc05] leading-none uppercase">UNLIMITED</span>
              </div>
            </div>
            <p class="mt-4 max-w-md text-sm text-slate-300">We design and build scalable digital platforms for ambitious businesses worldwide. Product strategy, engineering, and support under one team.</p>
          </div>
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-cyan-300">Quick Links</h4>
            <div class="mt-3 grid grid-cols-1 gap-2 text-sm">
              <a class="nav-link" href="services.html">Services</a>
              <a class="nav-link" href="portfolio.html">Portfolio</a>
              <a class="nav-link" href="case-studies.html">Case Studies</a>
              <a class="nav-link" href="careers.html">Careers</a>
            </div>
          </div>
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-cyan-300">Connect</h4>
            <div class="mt-3 flex gap-4 text-sm">
              <a class="nav-link" href="#" aria-label="LinkedIn">LinkedIn</a>
              <a class="nav-link" href="#" aria-label="GitHub">GitHub</a>
              <a class="nav-link" href="#" aria-label="X">X</a>
            </div>
          </div>
        </div>
        <div class="border-t border-slate-800/70 py-4 text-center text-xs text-slate-400">&copy; ${new Date().getFullYear()} Encode Unlimited. All rights reserved.</div>
      </footer>
    `;
  }

  function initScrollEffects() {
    const progress = document.getElementById("scroll-progress");
    const backToTop = document.getElementById("back-to-top");

    function update() {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      if (progress) {
        progress.style.width = percent + "%";
      }
      if (backToTop) {
        backToTop.classList.toggle("show", window.scrollY > 380);
      }
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  // Replace the placeholder below with the actual Web App URL from Google Apps Script deployment.
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzdLaT730bhZBExRw1Be73zJGiitptL3LRN_a946vaR1n38wn098eDO3bRYMKACz6SR4A/exec";

  async function submitToGoogle(formData) {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("YOUR_DEPLOYED")) {
      console.warn("Forms: Google Script URL is missing.");
      return false;
    }

    try {
      const params = new URLSearchParams();
      formData.forEach((value, key) => params.append(key, value));

      console.log("Submitting form data to Google:", Object.fromEntries(params));

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
      });

      return true;
    } catch (err) {
      console.error("Submission Error:", err);
      return false;
    }
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    const result = document.getElementById("form-result");
    if (!form || !result) return;

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const submit = form.querySelector("button[type='submit']");
      if (submit) {
        submit.disabled = true;
        submit.textContent = "Sending...";
      }
      result.textContent = "Processing your request...";
      result.className = "mt-4 text-sm text-[#7edc05]";

      const formData = new FormData(form);
      formData.append("formType", "contact");

      const ok = await submitToGoogle(formData);

      if (ok) {
        result.textContent = "Thank you. Your message has been received. Our team will contact you shortly.";
        result.className = "mt-4 text-sm text-emerald-300";
        form.reset();
      } else {
        result.textContent = "Sorry, something went wrong. Please check your connection and ensure the script is deployed correctly.";
        result.className = "mt-4 text-sm text-red-400";
      }

      if (submit) {
        submit.disabled = false;
        submit.textContent = "Submit Inquiry";
      }

      // Hide message after 5 seconds
      setTimeout(() => {
        result.textContent = "";
        result.className = "mt-4 text-sm";
      }, 5000);
    });
  }

  function initNewsletterForm() {
    const form = document.getElementById("newsletter-form");
    const result = document.getElementById("newsletter-result");
    if (!form || !result) return;

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const submit = form.querySelector("button[type='submit']");
      if (submit) submit.disabled = true;

      const formData = new FormData(form);
      formData.append("formType", "newsletter");

      const ok = await submitToGoogle(formData);

      if (ok) {
        result.textContent = "Subscribed. You will receive monthly product insights.";
        result.className = "mt-3 text-sm text-emerald-300";
        form.reset();
      } else {
        result.textContent = "Subscription failed. Please try again later.";
        result.className = "mt-3 text-sm text-red-400";
      }
      if (submit) submit.disabled = false;

      // Hide message after 5 seconds
      setTimeout(() => {
        result.textContent = "";
        result.className = "mt-3 text-sm";
      }, 5000);
    });
  }

  function animateCount(el) {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    const duration = 1500;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          // Lower threshold to 0.1 to trigger earlier, especially on mobile
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            // Small delay to wait for AOS to finish its initial fade/zoom
            setTimeout(() => {
              animateCount(entry.target);
            }, 150);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function initPortfolioFilters() {
    const buttons = Array.from(document.querySelectorAll("[data-filter-btn]"));
    const cards = Array.from(document.querySelectorAll("[data-project-card]"));
    const search = document.querySelector("[data-project-search]");
    const empty = document.querySelector("[data-project-empty]");
    if (!buttons.length || !cards.length) return;

    let activeFilter = "all";

    function applyFilter() {
      const query = (search ? search.value : "").trim().toLowerCase();
      let visible = 0;

      cards.forEach(function (card) {
        const category = (card.dataset.category || "").toLowerCase();
        const keywords = (card.dataset.keywords || "").toLowerCase();
        const filterMatch = activeFilter === "all" || category === activeFilter;
        const queryMatch = !query || keywords.includes(query);
        const show = filterMatch && queryMatch;
        card.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });

      if (empty) {
        empty.classList.toggle("hidden", visible !== 0);
      }
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeFilter = button.dataset.filterBtn || "all";
        buttons.forEach(function (btn) {
          btn.classList.toggle("is-active", btn === button);
        });
        applyFilter();
      });
    });

    if (search) {
      search.addEventListener("input", applyFilter);
    }

    applyFilter();
  }

  function initTypedHero() {
    const el = document.getElementById("typed-hero");
    if (!el || !window.Typed) return;
    const words = (el.dataset.typedWords || "").split("|").filter(Boolean);
    if (!words.length) return;
    new window.Typed("#typed-hero", {
      strings: words,
      typeSpeed: 45,
      backSpeed: 28,
      backDelay: 1700,
      loop: true
    });
  }

  function initTiltCards() {
    if (!window.VanillaTilt) return;
    const cards = document.querySelectorAll(".card:not([data-no-tilt])");
    if (!cards.length) return;
    window.VanillaTilt.init(cards, {
      max: 5,
      speed: 300,
      glare: true,
      "max-glare": 0.08,
      scale: 1.01
    });
  }

  function initLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }


  function renderAiChatbot() {
    if (document.getElementById("ai-chatbot")) return;
    const wrap = document.createElement("div");
    wrap.id = "ai-chatbot";
    wrap.innerHTML = `
      <div id="ai-chat-panel" class="hidden">
        <div class="ai-chat-head">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-[#7edc05] flex items-center justify-center text-slate-900 border border-white/20">
              <i data-lucide="bot" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-sm font-bold text-white leading-none">EUBOT <span class="ml-1 text-[10px] bg-white/10 px-1 rounded uppercase tracking-wider">AI v2.0</span></p>
              <p class="text-[10px] text-emerald-400 mt-1 flex items-center gap-1"><span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Online & Powerful</p>
            </div>
          </div>
        </div>
        <div id="ai-chat-messages" class="ai-chat-messages">
          <div class="ai-msg bot">Hi! I'm <strong>EUBOT</strong>, Encode Unlimited's digital brain. How can I help you engineer your vision today?</div>
        </div>
        <div class="ai-quick">
          <button type="button" data-ai-q="Tell me about ERP systems">ERP Expertise</button>
          <button type="button" data-ai-q="Government projects history">Gov Projects</button>
          <button type="button" data-ai-q="How do you handle security?">System Security</button>
          <button type="button" data-ai-q="What is the AI Urgent Track?">Urgent AI Track</button>
        </div>
        <div class="ai-chat-input">
          <input id="ai-chat-input" type="text" placeholder="Ask EUBOT anything..." />
          <button id="ai-chat-send" type="button"><i data-lucide="send" class="w-4 h-4"></i></button>
        </div>
      </div>
      <button id="ai-chat-toggle" type="button" class="group relative flex items-center justify-center" aria-label="Toggle EUBOT">
        <!-- Pulse Glow Layer -->
        <span class="absolute inset-0 rounded-full bg-[#7edc05]/20 animate-ping"></span>
        
        <!-- Online Badge -->
        <span class="absolute top-0 right-0 z-10 flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-slate-900"></span>
        </span>
        
        <!-- Icon Container -->
        <div class="relative z-0 w-12 h-12 rounded-full border-2 border-[#7edc05]/50 bg-slate-900 flex items-center justify-center text-[#7edc05] group-hover:border-[#7edc05] group-hover:shadow-[0_0_15px_rgba(126,220,5,0.4)] transition-all duration-300">
           <i data-lucide="bot" class="w-6 h-6 group-hover:scale-110 transition-transform"></i>
        </div>
      </button>
    `;
    document.body.appendChild(wrap);
  }

  function initAiChatbot() {
    const toggle = document.getElementById("ai-chat-toggle");
    const panel = document.getElementById("ai-chat-panel");
    const input = document.getElementById("ai-chat-input");
    const send = document.getElementById("ai-chat-send");
    const msgs = document.getElementById("ai-chat-messages");
    if (!toggle || !panel || !input || !send || !msgs) return;

    function botReply(text) {
      const t = text.toLowerCase();

      const qa = [
        // --- IDENTITY & GREETINGS ---
        {
          keys: ["who are you", "what is your name", "eubot", "who is this", "identity"],
          ans: "I am **EUBOT v2.0**, Encode Unlimited's AI brain. I'm trained on our entire portfolio and engineering standards. How can I help you engineering your vision today?"
        },
        {
          keys: ["hi", "hello", "hey", "greet", "good morning", "good evening", "how are you", "suwa"],
          ans: "Greetings! I'm EUBOT. I'm currently analyzing global tech trends. Are we architecting a local solution or a global platform today?"
        },

        // --- SRI LANKAN CONTEXT (PAYMENTS, TAX, LOCAL POS) ---
        {
          keys: ["payment gateway", "payhere", "webxpay", "lanka", "local payment", "direct pay", "koko", "mintpay"],
          ans: "We specialize in **Sri Lankan payment integrations**. We possess deep experience with **PayHere**, **WEBXPAY**, and **DirectPay**. We also implement 'Buy Now Pay Later' solutions like Koko and Mintpay for local eCommerce."
        },
        {
          keys: ["vat", "tax", "sscl", "billing", "invoice", "compliance", "sri lanka tax"],
          ans: "Our billing systems are fully compliant with Sri Lankan tax regulations, including **VAT** and **SSCL** calculations. We ensure your POS or ERP generates legally valid invoices for the local market."
        },
        {
          keys: ["pharmacy", "medical", "dispensary", "drug", "prescription"],
          ans: "We build specialized **Pharmacy Management Systems**. Features include drug expiry tracking, batch management, prescription history, and SLMC-compliant record keeping."
        },

        // --- GLOBAL CONTEXT (STANDARDS, CLOUD, GLOBAL PAYMENTS) ---
        {
          keys: ["global", "international", "stripe", "paypal", "2checkout", "worldpay"],
          ans: "For international markets, we integrate global standard gateways like **Stripe**, **PayPal**, and **2Checkout**. We handle multi-currency conversions and global PCI-DSS compliance."
        },
        {
          keys: ["standards", "gdpr", "iso", "security compliance", "privacy"],
          ans: "We adhere to international engineering standards. Our systems can be built to be **GDPR compliant** for the EU market, focusing on data encryption and user privacy rights."
        },
        {
          keys: ["architecture", "microservices", "scalable", "serverless", "distributed"],
          ans: "We design for massive scale. Using **Microservices** and **Serverless** architectures on AWS/Azure, we ensure your system can handle millions of users globally without downtime."
        },

        // --- CORE SERVICES (DEEP) ---
        {
          keys: ["service", "what you build", "offer", "capabilities", "product", "software", "development"],
          ans: "We engineer enterprise-grade solutions: \n1. **ERP & POS**: Custom retail/wholesale engines. \n2. **AI & Automation**: Intelligent bots and predictive models. \n3. **Mobile Ecosystems**: Native iOS & Android apps. \n4. **GovTech**: Secure government digitalization and auditing."
        },
        {
          keys: ["pos", "point of sale", "billing", "retail system", "shop software", "inventory", "stock", "management"],
          ans: "Our POS systems are built for speed and 100% inventory accuracy. We offer multi-store sync, barcode automation, and profit analytics. Check our 'Danesha Bookshop' case study for a real example!"
        },
        {
          keys: ["erp", "enterprise resource planning", "management system", "business software"],
          ans: "Our ERPs unify Finance, HR, Supply Chain, and CRM. They are built using scalable architectures to handle millions of transactions securely."
        },
        {
          keys: ["ai", "machine learning", "automation", "intelligence", "chatbot"],
          ans: "From automated document processing to intelligent chatbots (like me!), we use AI to eliminate redundancy and drive data-backed decisions."
        },

        // --- SPECIFIC PROJECTS & CLIENTS ---
        {
          keys: ["portfolio", "project", "work", "example", "done", "case study", "clients"],
          ans: "We've delivered **50+ successful projects**. Key highlights: \n- **Freshworld.lk**: High-end eCommerce. \n- **IRD Platform**: GovTech workflow automation. \n- **Danesha Bookshop**: Retail engine. \n- **Horana Tools**: Industrial inventory management."
        },
        {
          keys: ["freshworld", "ecommerce", "online shop", "grocery", "shopping"],
          ans: "Freshworld.lk is a high-traffic grocery platform we built with real-time stock sync and multi-vendor delivery dispatch logic."
        },
        {
          keys: ["ird", "government", "gov", "department", "document", "tracking"],
          ans: "For the IRD, we built a highly secure document tracking engine that manages critical files with full audit trails and user permissions."
        },

        // --- STATS & HISTORY ---
        {
          keys: ["stats", "numbers", "how many", "experience", "how old", "years", "track record"],
          ans: "Encode Unlimited by the numbers: \n- **7+ Years** of engineering experience. \n- **50+ Projects** delivered successfully. \n- **20+ Expert Engineers** globally. \n- **100% Quality** delivery satisfaction."
        },

        // --- LOCATION & CONTACT ---
        {
          keys: ["where", "location", "place", "office", "horana", "kubuka", "address", "map", "sri lanka", "visit"],
          ans: "Our primary engineering headquarters is in **Kubuka, Horana, Sri Lanka**. We operate 24/7 for global clients but our heart is in Horana."
        },
        {
          keys: ["contact", "call", "phone", "email", "number", "talk", "human", "mobile"],
          ans: "Need a human expert? Reach us at: \n📞 **+94 70 62 91 709** \n📧 **info@encodeunlimited.com** \nWe usually respond in under 4 hours."
        },

        // --- URGENT TRACK ---
        {
          keys: ["urgent", "fast", "emergency", "immediately", "quick", "asap", "deadline", "soon"],
          ans: "Facing a tight deadline? Our **AI Urgent Track** can get a squad mobilized and starting delivery in 24-48 hours. Fill the 'Need AI Delivery Fast?' form on the home page!"
        },

        // --- TECHNOLOGY & SECURITY ---
        {
          keys: ["tech", "language", "stack", "react", "python", "node", "php", "javascript", "framework", "database", "sql"],
          ans: "We use cutting-edge tech stacks: \n- **Frontend**: React, Next.js, Vue. \n- **Backend**: Node.js, Python (FastAPI/Django). \n- **Mobile**: Flutter, SwiftUI. \n- **Cloud**: AWS, Google Cloud, Azure."
        },
        {
          keys: ["security", "safe", "hack", "data", "protect", "encrypted", "privacy"],
          ans: "Security is non-negotiable. We use AES-256 encryption, SSL-only traffic, and secure API gateways to ensure your data remains impenetrable."
        },

        // --- MISSION & CULTURE ---
        {
          keys: ["mission", "vision", "goal", "why", "believe", "culture", "dna"],
          ans: "We live by our motto: **'Engineering Your Vision Into Reality'**. Our culture is rooted in rapid innovation, transparency, and automation of the digital future."
        }
      ];

      for (const item of qa) {
        if (item.keys.some(k => t.includes(k))) return item.ans;
      }

      return "I'm EUBOT, and I'm currently parsing our extensive project database for that. Try asking about our **7+ years experience**, **Specific project case studies (like IRD)**, or our **Office location in Horana**.";
    }

    function pushMsg(role, text) {
      const el = document.createElement("div");
      el.className = "ai-msg " + role;
      el.textContent = text;
      msgs.appendChild(el);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function submitUserMessage(text) {
      const val = (text || input.value).trim();
      if (!val) return;
      pushMsg("user", val);
      if (!text) input.value = "";
      setTimeout(function () {
        pushMsg("bot", botReply(val));
      }, 280);
    }

    toggle.addEventListener("click", function () {
      panel.classList.toggle("hidden");
      if (!panel.classList.contains("hidden")) input.focus();
    });

    send.addEventListener("click", function () { submitUserMessage(); });
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") submitUserMessage();
    });

    document.querySelectorAll("[data-ai-q]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        submitUserMessage(btn.dataset.aiQ || "");
      });
    });
  }
  
  function initPortfolioModal() {
    const cards = document.querySelectorAll("[data-project-card]");
    const modal = document.getElementById("project-modal");
    const closeBtn = document.getElementById("close-modal");
    if (!cards.length || !modal) return;

    function openModal(card) {
      const title = card.querySelector("h2")?.textContent || "Project Details";
      const shortDesc = card.querySelector("p.text-sm")?.textContent || "";
      const fullDesc = card.dataset.fullDesc || shortDesc;
      const tech = card.querySelector("p.text-xs")?.textContent || "";
      const img = card.querySelector("img")?.src || "";
      const category = card.dataset.category || "Project Information";
      const features = (card.dataset.features || "").split("|").filter(Boolean);

      const modalImg = document.getElementById("modal-img");
      const modalTitle = document.getElementById("modal-title");
      const modalDesc = document.getElementById("modal-desc");
      const modalTech = document.getElementById("modal-tech");
      const modalCategory = document.getElementById("modal-category");
      const modalIndustry = document.getElementById("modal-industry");
      const modalFeatures = document.getElementById("modal-features");
      const modalFeaturesContainer = document.getElementById("modal-features-container");

      if (modalImg) modalImg.src = img;
      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = fullDesc;
      if (modalTech) modalTech.textContent = tech;
      if (modalCategory) modalCategory.textContent = category;
      if (modalIndustry) modalIndustry.textContent = category.charAt(0).toUpperCase() + category.slice(1);

      if (modalFeatures) {
        modalFeatures.innerHTML = features.map(f => `
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#7edc05]"></span>
            ${f.trim()}
          </li>
        `).join("");
      }
      if (modalFeaturesContainer) {
        modalFeaturesContainer.classList.toggle("hidden", features.length === 0);
      }

      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }

    cards.forEach(card => {
      card.classList.add("cursor-pointer");
      card.addEventListener("click", () => openModal(card));
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    
    // Support ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
    });
  }

  function initBlogModal() {
    const cards = document.querySelectorAll("[data-blog-card]");
    const modal = document.getElementById("blog-modal");
    const closeBtn = document.getElementById("close-blog-modal");
    if (!cards.length || !modal) return;

    const blogContent = {
      "AI Agents: The Next Evolution of Digital Workforces": `
        <p>In 2026, the boundary between passive software and active agents has blurred. AI Agents are no longer just responding to queries; they are executing complex multi-step workflows across different systems.</p>
        <p>At Encode Unlimited, we are building agents that can handle supply chain logistics, automated code auditing, and even proactive customer support that resolves issues before the user notices them. The key is <strong>autonomy</strong>—giving the AI the tools to 'think' and 'act' rather than just 'show'.</p>
        <p>Businesses adopting agentic workflows are seeing a 40% reduction in operational overhead within the first quarter of deployment. This isn't just automation; it's a digital workforce expansion.</p>
      `,
      "Optimizing for Local Speed with Edge Computing": `
        <p>For Sri Lankan users, every millisecond counts. Traditionally, data residing in US or EU data centers created noticeable 'lag' during high-traffic sessions. Edge computing changes this narrative by bringing processing power to the network's periphery.</p>
        <p>We deploy critical application logic to edge nodes globally, ensuring that a user in Colombo or Kandy receives a response in sub-30ms. This is critical for real-time inventory systems and high-frequency trading platforms.</p>
        <p>By leveraging platforms like Cloudflare Workers and AWS Lambda@Edge, we've helped local retailers sustain performance even during massive holiday sales peaks.</p>
      `,
      "Protecting Your Digital Assets in an Interconnected World": `
        <p>Cyber threats are becoming more sophisticated, targeting small to medium local businesses with global-tier ransomware. A 'firewall' is no longer enough; you need <strong>Zero Trust Architecture</strong>.</p>
        <p>Our security protocols involve multi-factor authentication at every layer, end-to-end encryption for sitting and moving data, and continuous AI-driven threat monitoring.</p>
        <p>We believe that security should be baked into the code from Day 1, not added as a patch on Day 100. Protecting your client data is protecting your business reputation.</p>
      `,
      "Designing SaaS Architecture for 10x Growth": `
        <p>Scaling a SaaS product from 100 users to 100,000 requires more than just adding servers. It requires a fundamental shift in how you handle multi-tenancy and data isolation.</p>
        <p>We focus on high-availability database clusters and event-driven architectures that can handle sudden spikes without affecting the performance of other tenants.</p>
        <p>Architecture is a living entity—it must evolve as the product finds its market fit and expands into new territories.</p>
      `
    };

    const defaultContent = `
      <p>This article explores the technical depth and engineering challenges faced during modern product delivery. At Encode Unlimited, we prioritize clean code, scalable architecture, and user-centric design.</p>
      <p>Continuous learning and adaptation are core to our engineering DNA. Stay tuned for more deep dives into our specific project implementations and technology stack updates.</p>
    `;

    function openModal(card) {
      const title = card.querySelector("h2")?.textContent || "Article Title";
      const date = card.querySelector("p.text-xs")?.textContent || "";
      const img = card.querySelector("img")?.src || "";
      const body = blogContent[title] || defaultContent;

      const modalImg = document.getElementById("blog-modal-img");
      const modalTitle = document.getElementById("blog-modal-title");
      const modalDate = document.getElementById("blog-modal-date");
      const modalBody = document.getElementById("blog-modal-body");

      if (modalImg) modalImg.src = img;
      if (modalTitle) modalTitle.textContent = title;
      if (modalDate) modalDate.textContent = date;
      if (modalBody) modalBody.textContent = ""; // Reset body
      if (modalBody) modalBody.innerHTML = body;

      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }

    cards.forEach(card => {
      const btn = card.querySelector("button");
      if (btn) btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openModal(card);
      });
      card.classList.add("cursor-pointer");
      card.addEventListener("click", () => openModal(card));
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
    });
  }

  function initUrgentAiForm() {
    const form = document.getElementById("urgent-ai-form");
    const result = document.getElementById("urgent-ai-result");
    if (!form || !result) return;

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const submit = form.querySelector("button[type='submit']");
      if (submit) {
        submit.disabled = true;
        submit.textContent = "Sending Urgent Request...";
      }
      result.className = "mt-3 text-sm text-[#7edc05]";
      result.textContent = "Processing urgent intake...";

      const formData = new FormData(form);
      formData.append("formType", "urgent-ai");

      const ok = await submitToGoogle(formData);

      if (ok) {
        result.className = "mt-3 text-sm text-emerald-300";
        result.textContent = "Urgent AI request received. Our team will contact you within 1 hour.";
        form.reset();
      } else {
        result.className = "mt-3 text-sm text-red-400";
        result.textContent = "Upload failed. Please try again or contact us directly.";
      }
      if (submit) {
        submit.disabled = false;
        submit.textContent = "Submit Urgent Request";
      }

      // Hide message after 5 seconds
      setTimeout(() => {
        result.textContent = "";
        result.className = "mt-3 text-sm";
      }, 5000);
    });
  }


  function initMouseEffects() {
    const body = document.body;
    const cards = document.querySelectorAll(".card, .media-frame, .testimonial-shell");

    window.addEventListener("mousemove", e => {
      body.style.setProperty("--mouse-x", `${e.clientX}px`);
      body.style.setProperty("--mouse-y", `${e.clientY}px`);

      // Spotlight effect for cards
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });
  }

  function initAOSLibrary() {
    if (window.AOS) {
      window.AOS.init({
        duration: 700,
        once: true,
        offset: 80
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderGlobalUi();
    renderAiChatbot();
    renderNav();
    renderFooter();
    initScrollEffects();
    initContactForm();
    initNewsletterForm();
    initUrgentAiForm();
    initAiChatbot();
    initCounters();
    initPortfolioFilters();
    initPortfolioModal();
    initBlogModal();
    initTypedHero();
    initTiltCards();
    initLucideIcons();
    initAOSLibrary();
    initMouseEffects();
  });
})();


