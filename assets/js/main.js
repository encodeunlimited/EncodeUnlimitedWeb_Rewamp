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
    if (!document.getElementById("scroll-progress")) {
      const progress = document.createElement("div");
      progress.id = "scroll-progress";
      document.body.appendChild(progress);
    }

    if (!document.getElementById("quick-contact")) {
      const quickContact = document.createElement("a");
      quickContact.id = "quick-contact";
      quickContact.href = "contact.html";
      quickContact.className = "btn-primary hidden sm:inline-flex";
      quickContact.textContent = "Start Project";
      document.body.appendChild(quickContact);
    }

    if (!document.getElementById("back-to-top")) {
      const button = document.createElement("button");
      button.id = "back-to-top";
      button.type = "button";
      button.setAttribute("aria-label", "Back to top");
      button.innerHTML = "↑";
      button.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      document.body.appendChild(button);
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
          <a href="index.html" class="text-lg font-semibold text-white">Encode <span class="text-cyan-300">Unlimited</span></a>
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
            <h3 class="text-lg font-semibold text-white">Encode Unlimited</h3>
            <p class="mt-3 max-w-md text-sm text-slate-300">We design and build scalable digital platforms for ambitious businesses worldwide. Product strategy, engineering, and support under one team.</p>
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

  function initContactForm() {
    const form = document.getElementById("contact-form");
    const result = document.getElementById("form-result");
    if (!form || !result) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const submit = form.querySelector("button[type='submit']");
      if (submit) {
        submit.disabled = true;
        submit.textContent = "Submitting...";
      }
      result.textContent = "Sending...";
      result.className = "mt-4 text-sm text-cyan-300";

      setTimeout(function () {
        result.textContent = "Thank you. Your message has been received. Our team will contact you shortly.";
        result.className = "mt-4 text-sm text-emerald-300";
        form.reset();
        if (submit) {
          submit.disabled = false;
          submit.textContent = "Submit";
        }
      }, 900);
    });
  }

  function initNewsletterForm() {
    const form = document.getElementById("newsletter-form");
    const result = document.getElementById("newsletter-result");
    if (!form || !result) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      result.textContent = "Subscribed. You will receive monthly product insights.";
      result.className = "mt-3 text-sm text-emerald-300";
      form.reset();
    });
  }

  function animateCount(el) {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
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
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
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
          <p class="text-sm font-semibold text-white">AI Assistant</p>
          <p class="text-xs text-slate-300">Ask about services, timeline, or urgent projects.</p>
        </div>
        <div id="ai-chat-messages" class="ai-chat-messages">
          <div class="ai-msg bot">Hi, I am Encode AI Assistant. How can we help today?</div>
        </div>
        <div class="ai-quick">
          <button type="button" data-ai-q="Need an urgent AI project">Urgent AI Project</button>
          <button type="button" data-ai-q="What AI services do you offer?">AI Services</button>
          <button type="button" data-ai-q="How fast can you start?">Start Timeline</button>
        </div>
        <div class="ai-chat-input">
          <input id="ai-chat-input" type="text" placeholder="Type your message..." />
          <button id="ai-chat-send" type="button">Send</button>
        </div>
      </div>
      <button id="ai-chat-toggle" type="button" aria-label="Toggle AI chatbot">AI</button>
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
      if (t.includes("urgent")) return "For urgent AI projects, use the Urgent AI form on Home or Contact page. We can respond within 1 hour.";
      if (t.includes("service") || t.includes("ai")) return "We offer AI chatbot development, workflow automation, predictive analytics, and AI integration with existing systems.";
      if (t.includes("start") || t.includes("timeline")) return "Standard kickoff is 7-10 days. Urgent AI tracks can start in 24-48 hours after scope confirmation.";
      if (t.includes("price") || t.includes("cost")) return "Share your scope via Contact or Urgent AI form. We will provide a practical estimate quickly.";
      return "Thanks. I can help with AI services, urgent project intake, timelines, and integration strategy.";
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

  function initUrgentAiForm() {
    const form = document.getElementById("urgent-ai-form");
    const result = document.getElementById("urgent-ai-result");
    if (!form || !result) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      result.className = "mt-3 text-sm text-cyan-300";
      result.textContent = "Submitting urgent request...";
      setTimeout(function () {
        result.className = "mt-3 text-sm text-emerald-300";
        result.textContent = "Urgent AI request received. Our team will contact you within 1 hour.";
        form.reset();
      }, 700);
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
    initTypedHero();
    initTiltCards();
    initLucideIcons();
    initAOSLibrary();
  });
})();






