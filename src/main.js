import { subscribe, getState, setView } from "./state.js";
import { renderNavigation } from "./components/navigation.js";
import { renderTopBar } from "./components/topbar.js";
import { renderHome } from "./views/home.js";
import { renderLog } from "./views/log.js";
import { renderInsights } from "./views/insights.js";
import { renderKnowledge } from "./views/knowledge.js";

const root = document.getElementById("app");

function render(state) {
  root.innerHTML = "";

  let view;
  switch (state.view) {
    case "log":
      view = renderLog(state);
      break;
    case "insights":
      view = renderInsights(state);
      break;
    case "knowledge":
      view = renderKnowledge(state);
      break;
    case "home":
    default:
      view = renderHome(state);
  }

  const shell = document.createElement("div");
  shell.className = "app-shell";

  shell.appendChild(renderTopBar(state));

  const main = document.createElement("main");
  main.className = "main-content";
  main.appendChild(view);

  shell.appendChild(main);
  shell.appendChild(renderNavigation(state.view));

  root.appendChild(shell);
}

subscribe(render);

window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").catch((err) => {
      console.warn("Service worker registration failed", err);
    });
  }
});

window.addEventListener("keydown", (event) => {
  if (event.altKey && event.key === "ArrowLeft") {
    event.preventDefault();
    const order = ["home", "log", "insights", "knowledge"];
    const state = getState();
    const idx = order.indexOf(state.view);
    const next = order[(idx - 1 + order.length) % order.length];
    setView(next);
  }
  if (event.altKey && event.key === "ArrowRight") {
    event.preventDefault();
    const order = ["home", "log", "insights", "knowledge"];
    const state = getState();
    const idx = order.indexOf(state.view);
    const next = order[(idx + 1) % order.length];
    setView(next);
  }
});
