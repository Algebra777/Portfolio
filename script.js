const clock = document.getElementById("clock");
const dockLinks = document.querySelectorAll(".dock a");
const sections = [...document.querySelectorAll("main section, footer.section")];

function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  clock.textContent = `${hh}:${mm}:${ss}`;
}

function updateDockState() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const aboutPages = new Set([
    "about.html",
    "about-now.html",
    "about-engineering.html",
    "about-library.html",
    "about-faq.html",
  ]);
  const hasPageLinks = [...dockLinks].some((link) => !link.getAttribute("href").startsWith("#"));

  if (hasPageLinks) {
    dockLinks.forEach((link) => {
      const linkPath = (link.getAttribute("href") || "").split("/").pop();
      const isActive = linkPath === currentPath || (aboutPages.has(currentPath) && linkPath === "about.html");
      link.classList.toggle("active", isActive);
    });
    return;
  }

  if (!sections.length) {
    return;
  }

  const offset = window.scrollY + window.innerHeight * 0.45;

  let activeId = "home";
  for (const section of sections) {
    if (offset >= section.offsetTop) {
      activeId = section.id;
    }
  }

  dockLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
  });
}

if (clock) {
  updateClock();
  setInterval(updateClock, 1000);
}

window.addEventListener("scroll", updateDockState, { passive: true });
window.addEventListener("resize", updateDockState);
updateDockState();
