(function () {

  const navItems = [
    { label: "Home", href: "index.html#hero", key: "home" },
    { label: "Services", href: "index.html#services", key: "services" },
    { label: "Products", href: "index.html#products", key: "products" },
    { label: "Process", href: "index.html#timeline", key: "timeline" },
    { label: "Team", href: "index.html#team", key: "team" },
    { label: "Case Studies", href: "case-studies.html", key: "case-studies" },
    { label: "Contact", href: "index.html#contact", key: "contact" }
  ];

  const pageKey = document.body.dataset.page || "";

  function renderGlobalUi() {
    const body = document.body;

    // Interactive Canvas background like Veloce
    if (!document.getElementById("fluid")) {
      const canvas = document.createElement("canvas");
      canvas.id = "fluid";
      canvas.className = "fixed inset-0 pointer-events-none z-0 w-full h-full";
      body.prepend(canvas);
    }

    if (!document.getElementById("scroll-progress")) {
      const sp = document.createElement("div");
      sp.id = "scroll-progress";
      body.appendChild(sp);
    }

    if (!document.getElementById("back-to-top")) {
      const btt = document.createElement("button");
      btt.id = "back-to-top";
      btt.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up"><polyline points="18 15 12 9 6 15"/></svg>';
      btt.ariaLabel = "Scroll to top";
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
        return `
          <a href="${item.href}" class="nav-link whitespace-nowrap text-sm font-medium ${active}">
            ${item.label}
          </a>
        `;
      })
      .join("");

    const mobileLinks = navItems
      .map((item) => {
        const active = pageKey === item.key ? "active" : "";
        return `
          <a href="${item.href}" class="block rounded-lg px-4 py-2.5 text-sm font-medium nav-link ${active}">
            ${item.label}
          </a>
        `;
      })
      .join("");

    slot.innerHTML = `
      <header id="main-header" class="site-header fixed inset-x-0 top-0 z-50 transition-all duration-300">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="index.html" class="flex items-center gap-3 group">
            <div class="relative w-10 h-10 flex items-center justify-center rounded-lg bg-green-500/10 border border-green-500/20 group-hover:border-green-500/40 group-hover:shadow-[0_0_15px_rgba(126,220,5,0.3)] transition-all">
              <img src="assets/images/logo-mark.svg" alt="Encode Logo" class="h-6 w-auto" width="24" height="24">
            </div>
            <div class="flex flex-col leading-[0.72] items-start">
              <span class="text-xl font-black tracking-tight text-white leading-none">ENCODE</span>
              <span class="text-[0.62rem] font-bold tracking-[0.38em] text-[#7edc05] leading-none uppercase">UNLIMITED</span>
            </div>
          </a>

          <nav class="hidden min-w-0 items-center justify-center gap-7 lg:flex">
            ${desktopLinks}
          </nav>

          <div class="hidden items-center gap-4 lg:flex">
            <a href="index.html#contact" class="btn-veloce-primary text-sm font-semibold tracking-wide">
              <span>Get Started</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>

          <button id="mobile-menu-button" class="inline-flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900/60 p-2 text-white hover:border-green-500/40 hover:text-green-400 transition-all lg:hidden" aria-label="Toggle navigation">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        <nav id="mobile-menu" class="mx-4 mb-4 hidden rounded-2xl border border-gray-800 bg-black/95 backdrop-blur-2xl p-4 lg:hidden shadow-2xl space-y-1">
          ${mobileLinks}
          <div class="pt-3 border-t border-gray-800">
            <a href="index.html#contact" class="btn-veloce-primary w-full text-center text-sm font-semibold">Get Started</a>
          </div>
        </nav>
      </header>
      <div class="h-[68px]"></div>
    `;

    const btn = document.getElementById("mobile-menu-button");
    const menu = document.getElementById("mobile-menu");
    if (btn && menu) {
      btn.addEventListener("click", function () {
        menu.classList.toggle("hidden");
      });
      menu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => menu.classList.add("hidden"));
      });
    }

    // Scroll listener for header blur styling
    const header = document.getElementById("main-header");
    window.addEventListener("scroll", () => {
      if (header) {
        header.classList.toggle("scrolled", window.scrollY > 25);
      }
    }, { passive: true });
  }

  function renderFooter() {
    const slot = document.getElementById("site-footer");
    if (!slot) return;

    slot.innerHTML = `
      <footer class="text-white relative overflow-hidden bg-black border-t border-white/5 mt-20">
        <!-- Ambient Glowing Orbs -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-10 left-10 w-48 h-48 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-10 right-10 w-56 h-56 bg-green-400/5 rounded-full blur-3xl animate-pulse" style="animation-delay:2s"></div>
        </div>

        <div class="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-20">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <!-- Col 1: Brand -->
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                  <img src="assets/images/logo-mark.svg" alt="Encode Logo" class="h-6 w-auto">
                </div>
                <div class="flex flex-col leading-[0.72] items-start">
                  <span class="text-2xl font-black tracking-tight text-white leading-none">ENCODE</span>
                  <span class="text-[0.68rem] font-bold tracking-[0.38em] text-[#7edc05] leading-none uppercase">UNLIMITED</span>
                </div>
              </div>
              <p class="text-gray-400 text-sm leading-relaxed">
                Innovating the future of enterprise technology with high-performance software platforms, cloud architectures, and digital transformation solutions.
              </p>
              <div class="flex items-center space-x-3 pt-2">
                <a href="https://github.com/encodeunlimited" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg border border-gray-800 bg-gray-900/60 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/40 hover:scale-110 transition-all" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a href="https://linkedin.com/company/encodeunlimited" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg border border-gray-800 bg-gray-900/60 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/40 hover:scale-110 transition-all" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://twitter.com/encodeunlimited" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg border border-gray-800 bg-gray-900/60 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/40 hover:scale-110 transition-all" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="mailto:info@encodeunlimited.com" class="w-9 h-9 rounded-lg border border-gray-800 bg-gray-900/60 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/40 hover:scale-110 transition-all" aria-label="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
              </div>
            </div>

            <!-- Col 2: Services -->
            <div class="space-y-4">
              <h3 class="text-base font-semibold text-green-400 uppercase tracking-wider">Services</h3>
              <ul class="space-y-2.5 text-sm">
                <li><a href="index.html#services" class="text-gray-400 hover:text-green-400 transition-all flex items-center gap-2 hover:translate-x-1"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>Custom Web Platforms</a></li>
                <li><a href="index.html#services" class="text-gray-400 hover:text-green-400 transition-all flex items-center gap-2 hover:translate-x-1"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>Mobile App Development</a></li>
                <li><a href="index.html#services" class="text-gray-400 hover:text-green-400 transition-all flex items-center gap-2 hover:translate-x-1"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>Cloud Architecture & DevOps</a></li>
                <li><a href="index.html#services" class="text-gray-400 hover:text-green-400 transition-all flex items-center gap-2 hover:translate-x-1"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>Enterprise ERP & Cloud POS</a></li>
                <li><a href="index.html#services" class="text-gray-400 hover:text-green-400 transition-all flex items-center gap-2 hover:translate-x-1"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>AI Copilots & Automation</a></li>
              </ul>
            </div>

            <!-- Col 3: Company -->
            <div class="space-y-4">
              <h3 class="text-base font-semibold text-green-400 uppercase tracking-wider">Company</h3>
              <ul class="space-y-2.5 text-sm">
                <li><a href="about.html" class="text-gray-400 hover:text-green-400 transition-all inline-block hover:translate-x-1">About Us</a></li>
                <li><a href="portfolio.html" class="text-gray-400 hover:text-green-400 transition-all inline-block hover:translate-x-1">Portfolio</a></li>
                <li><a href="case-studies.html" class="text-gray-400 hover:text-green-400 transition-all inline-block hover:translate-x-1">Case Studies</a></li>
                <li><a href="technologies.html" class="text-gray-400 hover:text-green-400 transition-all inline-block hover:translate-x-1">Technologies</a></li>
                <li><a href="careers.html" class="text-gray-400 hover:text-green-400 transition-all inline-block hover:translate-x-1">Careers</a></li>
                <li><a href="blog.html" class="text-gray-400 hover:text-green-400 transition-all inline-block hover:translate-x-1">Tech Insights Blog</a></li>
              </ul>
            </div>

            <!-- Col 4: Newsletter -->
            <div class="space-y-4">
              <h3 class="text-base font-semibold text-green-400 uppercase tracking-wider">Stay Updated</h3>
              <p class="text-gray-400 text-sm">Subscribe to our newsletter for the latest tech insights and company updates.</p>
              <form id="newsletter-form" class="space-y-2.5">
                <input type="email" name="email" required placeholder="Enter your email" class="veloce-input text-sm py-2">
                <button type="submit" class="btn-veloce-primary w-full text-sm font-semibold justify-center">
                  <span>Subscribe</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </form>
              <p id="newsletter-result" class="text-xs text-gray-400"></p>
            </div>
          </div>

          <div class="border-t border-gray-800/80 mt-14 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
              <div class="flex items-center gap-1.5">
                © ${new Date().getFullYear()} Encode Unlimited (PVT) Limited. Made with
                <span class="text-green-400 animate-pulse text-base">💚</span> for innovation.
              </div>
              <div class="flex items-center space-x-6 text-xs text-gray-400">
                <a href="#" class="hover:text-green-400 transition-colors">Privacy Policy</a>
                <a href="#" class="hover:text-green-400 transition-colors">Terms of Service</a>
                <a href="index.html#contact" class="hover:text-green-400 transition-colors">Support</a>
              </div>
            </div>
          </div>
        </div>
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
      "The Future of Tech Innovation in 2026": `
        <p>Welcome to the new era of technological advancement. 2026 brings unprecedented breakthroughs in how we interact with data, artificial intelligence, and our digital environments.</p>
        <p>From deep spatial computing integration in everyday enterprise operations to the mainstream adoption of quantum-secured networks, the tech landscape is evolving faster than ever.</p>
        <p>We are closely monitoring these trends to ensure that the architectures we design today remain resilient, scalable, and forward-looking for the challenges of tomorrow.</p>
      `,
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


  function initScheduleModal() {
    const triggers = document.querySelectorAll("[data-schedule-trigger]");
    const modal = document.getElementById("schedule-modal");
    const closeBtn = document.getElementById("close-schedule-modal");
    const form = document.getElementById("schedule-form");
    const result = document.getElementById("schedule-result");
    if (!modal) return;

    function openModal() {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }

    triggers.forEach(t => t.addEventListener("click", openModal));
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
    });

    if (form && result) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const submit = form.querySelector("button[type='submit']");
        if (submit) {
          submit.disabled = true;
          submit.textContent = "Scheduling Call...";
        }
        result.className = "mt-3 text-sm text-[#7edc05]";
        result.textContent = "Securing calendar slot...";

        const formData = new FormData(form);
        formData.append("formType", "schedule-call");

        const ok = await submitToGoogle(formData);
        if (ok) {
          result.className = "mt-3 text-sm text-emerald-300";
          result.textContent = "Discovery call request received! We will send a Google Meet invite shortly.";
          form.reset();
          setTimeout(closeModal, 2500);
        } else {
          result.className = "mt-3 text-sm text-red-400";
          result.textContent = "Submission failed. Please email us at info@encodeunlimited.com";
        }
        if (submit) {
          submit.disabled = false;
          submit.textContent = "Confirm Call Schedule";
        }
      });
    }
  }

  function initFluidCanvas() {
    const canvas = document.getElementById("fluid");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const mouse = { x: -1000, y: -1000, active: false };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });
    window.addEventListener("mouseleave", () => {
      mouse.active = false;
    });

    const numParticles = Math.min(50, Math.floor((width * height) / 28000));
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.4 + 0.15
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Ambient radial cursor glow
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 250);
        grad.addColorStop(0, "rgba(126, 220, 5, 0.08)");
        grad.addColorStop(0.5, "rgba(34, 197, 94, 0.03)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 250, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x -= (dx / dist) * force * 1.8;
            p.y -= (dy / dist) * force * 1.8;
          }
        }

        ctx.fillStyle = `rgba(126, 220, 5, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.12;
            ctx.strokeStyle = `rgba(74, 222, 128, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  function initMouseEffects() {
    const body = document.body;
    const cards = document.querySelectorAll(".card, .media-frame, .testimonial-shell, .modern-card-hover");

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
    initFluidCanvas();
    initScrollEffects();
    initContactForm();
    initNewsletterForm();
    initUrgentAiForm();
    initScheduleModal();
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


