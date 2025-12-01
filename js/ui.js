// ui.js
export function renderProjects(projects, container) {
    container.innerHTML = "";

    projects.forEach((project) => {
        const card = document.createElement("article");
        card.className = "project-card";
        card.innerHTML = `
      <h3>${project.name}</h3>
      <p class="project-desc">${project.description}</p>
      <p class="project-tech">${project.tech.join(" · ")}</p>
      <a href="${project.link}" target="_blank" class="btn-secondary">View on GitHub</a>
    `;
        container.appendChild(card);
    });
}

export function renderFilters(projects, filterContainer, onFilterChange) {
    const categories = ["All", ...new Set(projects.map((p) => p.category))];

    filterContainer.innerHTML = "";
    categories.forEach((cat) => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.className = "filter-btn";
        btn.dataset.category = cat;
        btn.addEventListener("click", () => onFilterChange(cat));
        filterContainer.appendChild(btn);
    });
}

