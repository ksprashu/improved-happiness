import { subscribe, getState, setView } from "./state.js";
import { renderNavigation } from "./components/navigation.js";
import { renderHome } from "./views/home.js";
import { renderPlanner } from "./views/planner.js";
import { renderLog } from "./views/log.js";
import { renderInsights } from "./views/insights.js";
import { renderKnowledge } from "./views/knowledge.js";

const root = document.getElementById("app");

function render(state) {
  root.innerHTML = "";

  let view;
  switch (state.view) {
    case "planner":
      view = renderPlanner(state);
      break;
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

  root.appendChild(view);
  root.appendChild(renderNavigation(state.view));
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
    const order = ["home", "planner", "log", "insights", "knowledge"];
    const state = getState();
    const idx = order.indexOf(state.view);
    const next = order[(idx - 1 + order.length) % order.length];
    setView(next);
  }
  if (event.altKey && event.key === "ArrowRight") {
    event.preventDefault();
    const order = ["home", "planner", "log", "insights", "knowledge"];
    const state = getState();
    const idx = order.indexOf(state.view);
    const next = order[(idx + 1) % order.length];
    setView(next);
  }
});
