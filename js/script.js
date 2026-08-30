document.addEventListener("DOMContentLoaded", () => {
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Portfolio category filter
  const filterButtons = document.querySelectorAll(".category-list [data-filter]");
  const projectItems = document.querySelectorAll(".project-item");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      projectItems.forEach(item => {
        const show = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("d-none", !show);
      });
    });
  });

  // Contact form confirmation popup
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      showMessage("Message sent", "Thank you! Your message has been received. Our team will get back to you soon.");
      contactForm.reset();
    });
  }

  // Career apply buttons
  document.querySelectorAll(".apply-btn").forEach(button => {
    button.addEventListener("click", () => {
      showMessage("Application started", `Thanks for your interest in the ${button.dataset.role} role. Please send your CV to hello@rejoansoftware.com.`);
    });
  });

  // Project details
  if (document.getElementById("projectTitle")) {
    initProjectDetails();
  }

  // Zoomable project image
  const mainImage = document.getElementById("mainProjectImage");
  if (mainImage) {
    mainImage.addEventListener("click", () => {
      const zoom = document.getElementById("zoomImage");
      if (zoom) zoom.src = mainImage.src;
      const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("imageModal"));
      modal.show();
    });
  }
});

function updateDateTime() {
  document.querySelectorAll("#dateTime").forEach(el => {
    const now = new Date();
    el.textContent = now.toLocaleString("en-BD", {
      weekday: "short", year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
  });
}

function showMessage(title, text) {
  const titleEl = document.getElementById("messageTitle");
  const textEl = document.getElementById("messageText");
  const modalEl = document.getElementById("messageModal");
  if (titleEl) titleEl.textContent = title;
  if (textEl) textEl.textContent = text;
  if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function fakeAuth(event, type) {
  event.preventDefault();
  const modalEl = event.target.closest(".modal");
  if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
  setTimeout(() => showMessage(type, `${type} demo submitted successfully. Connect this form to your backend/authentication system for real account functionality.`), 250);
  event.target.reset();
  return false;
}

function subscribeNewsletter(event) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  showMessage("Subscribed", `Thanks! ${input.value} has been added to the demo newsletter list.`);
  input.value = "";
  return false;
}

const projectData = {
  finora: {
    title: "Finora Finance",
    category: "Web App",
    client: "Finora",
    description: "A clean financial intelligence dashboard that turns complex numbers into clear decisions for growing teams.",
    tech: "React, Node.js, PostgreSQL, AWS",
    images: ["assets/images/project-finora.svg","assets/images/project-finora-2.svg","assets/images/project-finora-3.svg"]
  },
  medigo: {
    title: "MediGo",
    category: "Mobile App",
    client: "MediGo Health",
    description: "A patient-friendly appointment and care management app designed around simple scheduling and clear communication.",
    tech: "Flutter, Firebase, Node.js",
    images: ["assets/images/project-medigo.svg","assets/images/project-medigo-2.svg","assets/images/project-medigo-3.svg"]
  },
  orbit: {
    title: "Orbit Workspace",
    category: "UI/UX",
    client: "Orbit Labs",
    description: "A focused productivity workspace concept with a calm visual system and collaboration flows for distributed teams.",
    tech: "Figma, Design System, Prototyping",
    images: ["assets/images/project-orbit.svg","assets/images/project-orbit-2.svg","assets/images/project-orbit-3.svg"]
  },
  shoply: {
    title: "Shoply Commerce",
    category: "Web App",
    client: "Shoply",
    description: "A conversion-focused commerce platform combining a modern storefront with a practical admin experience.",
    tech: "Laravel, Bootstrap, MySQL",
    images: ["assets/images/project-shoply.svg","assets/images/project-shoply-2.svg","assets/images/project-shoply-3.svg"]
  },
  route: {
    title: "RouteGo",
    category: "Mobile App",
    client: "RouteGo Logistics",
    description: "A field operations companion that helps teams plan routes, track jobs and keep updates organized.",
    tech: "Flutter, REST API, Maps",
    images: ["assets/images/project-route.svg","assets/images/project-route-2.svg","assets/images/project-route-3.svg"]
  },
  learnly: {
    title: "Learnly",
    category: "UI/UX",
    client: "Learnly Education",
    description: "A friendly learning platform design system focused on discoverability, progress and accessible interaction.",
    tech: "Figma, UX Research, Design System",
    images: ["assets/images/project-learnly.svg","assets/images/project-learnly-2.svg","assets/images/project-learnly-3.svg"]
  }
};

function initProjectDetails() {
  const id = new URLSearchParams(window.location.search).get("id") || "finora";
  const project = projectData[id] || projectData.finora;
  document.title = `${project.title} | Rejoan Software`;
  document.getElementById("projectTitle").textContent = project.title;
  document.getElementById("crumbTitle").textContent = project.title;
  document.getElementById("detailTitle").textContent = project.title;
  document.getElementById("projectCategory").textContent = project.category;
  document.getElementById("projectClient").textContent = project.client;
  document.getElementById("projectTech").textContent = project.tech;
  document.getElementById("detailDescription").textContent = project.description;

  const main = document.getElementById("mainProjectImage");
  main.src = project.images[0];
  main.alt = project.title;

  const thumbs = document.getElementById("galleryThumbs");
  thumbs.innerHTML = project.images.map((src, index) => `
    <div class="col-4"><div class="thumb ${index === 0 ? "active" : ""}" data-src="${src}">
      <img src="${src}" alt="${project.title} gallery image ${index + 1}">
    </div></div>`).join("");

  thumbs.querySelectorAll(".thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      thumbs.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      main.src = thumb.dataset.src;
    });
  });

  const related = Object.entries(projectData)
    .filter(([key]) => key !== id)
    .slice(0, 3)
    .map(([key, p]) => `<div class="col-md-4"><a href="project-details.html?id=${key}" class="portfolio-card"><img src="${p.images[0]}" alt="${p.title}"><div class="p-4"><span class="project-tag">${p.category}</span><h4>${p.title}</h4><span class="read-more">View details <i class="bi bi-arrow-up-right"></i></span></div></a></div>`)
    .join("");
  document.getElementById("relatedProjects").innerHTML = related;
}
