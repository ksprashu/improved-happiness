import { setView } from "../state.js";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "⚡" },
  { id: "log", label: "Log", icon: "✍️" },
  { id: "insights", label: "Insights", icon: "📈" },
  { id: "knowledge", label: "Library", icon: "📚" }
];

export function renderNavigation(active) {
  const nav = document.createElement("nav");
  nav.className = "bottom-nav";

  NAV_ITEMS.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.view = item.id;
    if (item.id === active) button.classList.add("active");

    const icon = document.createElement("span");
    icon.className = "icon";
    icon.textContent = item.icon;

    const label = document.createElement("span");
    label.textContent = item.label;

    button.appendChild(icon);
    button.appendChild(label);

    button.addEventListener("click", () => setView(item.id));

    nav.appendChild(button);
  });

  return nav;
}
