(() => {
  const NAV_BREAKPOINT = 992;

  // ===== Sticky navbar: shadow + background change =====
  const navbar = document.querySelector(".navbar");
  const setNavbarStyle = (scrolled) => {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", scrolled);
  };
  setNavbarStyle(window.scrollY > 50);
  window.addEventListener("scroll", () => setNavbarStyle(window.scrollY > 50));

  // ===== Mobile drawer navigation =====
  const hamburgerBtn = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".nav-drawer");
const drawerBackdrop = document.querySelector(".nav-backdrop");
  const navLinkEls = document.querySelectorAll(".nav-links a");

  const getActiveHref = (a) => {
    // allow pages to override active matching (useful for index.html "Home" -> index.html)
    return a.getAttribute("data-active-href") || a.getAttribute("href") || "";
  };

  const openDrawer = () => {
    if (!drawer || !hamburgerBtn) return;
    drawer.classList.add("open");
    if (drawerBackdrop) drawerBackdrop.classList.add("open");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    if (!drawer || !hamburgerBtn) return;
    drawer.classList.remove("open");
    if (drawerBackdrop) drawerBackdrop.classList.remove("open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  const toggleDrawer = () => {
    const isOpen = drawer?.classList.contains("open");
    if (isOpen) closeDrawer();
    else openDrawer();
  };

if (hamburgerBtn && drawer) {
    hamburgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDrawer();
    });

    // Close drawer if user taps hamburger again while open (handled in toggleDrawer)
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", () => closeDrawer());
  }

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // Close on nav link click
  navLinkEls.forEach((link) => {
    link.addEventListener("click", () => closeDrawer());
  });

  // ===== Active nav link (auto from pathname) =====
const setActiveFromPathname = () => {
    const path = window.location.pathname.split("/").pop() || "index.html";

    const normalize = (href) => {
      if (!href) return "";
      if (href.startsWith("#")) return "#";
      // Convert relative to final segment
      if (href.includes("/")) return href.split("/").pop();
      return href;
    };

    navLinkEls.forEach((a) => {
      const href = normalize(getActiveHref(a));
      const isActive = href && href === path;
      a.classList.toggle("active", isActive);
    });
  };
  setActiveFromPathname();

  // ===== Smooth fade-in animation (existing) =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  document
    .querySelectorAll(".card, .sport-card, .stat-card")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      el.style.transition = ".7s";
      observer.observe(el);
    });

  // ===== Smooth scrolling for anchor links =====
document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#']");
    if (!a) return;

    const id = a.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // ===== Turfs sport filter highlight (supports ?sport=football etc) =====
  const turfsPage = document.querySelector(".filters");
  if (turfsPage) {
    const params = new URLSearchParams(window.location.search);
    const sport = (params.get("sport") || "").toLowerCase();

    const buttons = turfsPage.querySelectorAll("button");
    const sportToLabel = {
      football: "Football",
      cricket: "Cricket",
      badminton: "Badminton",
      pickleball: "Pickleball",
    };

    const label = sportToLabel[sport] || null;

    buttons.forEach((btn) => {
      const text = (btn.textContent || "").trim();
      const isMatch = label && text.toLowerCase() === label.toLowerCase();
      btn.classList.toggle("active", isMatch);

      if (!label && text === "All") {
        btn.classList.add("active");
      }
    });

    if (label) {
      // optional: scroll cards into view on mobile
      const cards = document.querySelector(".cards");
      if (cards) cards.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // If resized above breakpoint, ensure drawer is closed
  window.addEventListener("resize", () => {
    if (window.innerWidth > NAV_BREAKPOINT) closeDrawer();
  });
})();

console.log("TurfHub Loaded Successfully 🚀");
