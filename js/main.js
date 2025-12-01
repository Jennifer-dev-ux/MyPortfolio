// main.js
import { projects } from "./projects.js";
import { renderProjects, renderFilters } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    const projectsGrid = document.getElementById("projects-grid");
    const filtersContainer = document.getElementById("project-filters");
    const themeToggleBtn = document.getElementById("theme-toggle");

    // 1. Render initial projects
    renderProjects(projects, projectsGrid);

    // 2. Filters
    renderFilters(projects, filtersContainer, (category) => {
        const filtered =
            category === "All"
                ? projects
                : projects.filter((p) => p.category === category);
        renderProjects(filtered, projectsGrid);

        // highlight active button
        document.querySelectorAll(".filter-btn").forEach((btn) => {
            btn.classList.toggle("active", btn.textContent === category);
        });
    });

    // 3. Dark mode with localStorage
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    const root = document.documentElement;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        root.classList.add("dark");
    }

    themeToggleBtn.addEventListener("click", () => {
        root.classList.toggle("dark");
        const isDark = root.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // 4. Dynamic year in footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // 5. Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});

