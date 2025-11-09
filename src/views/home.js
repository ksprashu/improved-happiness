import { computeStreak } from "../state.js";
import { plannerTips, knowledgeBase } from "../data/knowledgeBase.js";
import { formatDateTime } from "../utils/date.js";
import { setView } from "../state.js";

export function renderHome(state) {
  const container = document.createElement("div");

  container.appendChild(renderHeader());

  const content = document.createElement("div");
  content.className = "main-content";

  content.appendChild(renderTodayCard(state));
  content.appendChild(renderStreak(state));
  content.appendChild(renderEthos());
  content.appendChild(renderTips());

  container.appendChild(content);

  return container;
}

function renderHeader() {
  const header = document.createElement("header");
  header.className = "app-header";
  const title = document.createElement("h1");
  title.textContent = "AI Club Coach";
  const subtitle = document.createElement("p");
  subtitle.textContent = "Strength + Flow + Breath";
  header.appendChild(title);
  header.appendChild(subtitle);
  return header;
}

function renderTodayCard(state) {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Today\'s focus</h2>`;

  const upcoming = state.generatedSession;
  if (upcoming) {
    const title = document.createElement("p");
    title.innerHTML = `<strong>${upcoming.title}</strong>`;
    section.appendChild(title);

    const list = document.createElement("ul");
    list.className = "list";
    upcoming.exercises.slice(0, 4).forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.exercise.name}</strong><br/><span>${item.reps}</span><br/><span>${item.cues}</span>`;
      list.appendChild(li);
    });
    section.appendChild(list);

    const meta = document.createElement("p");
    meta.textContent = `Breathwork ${upcoming.breathMinutes} min • Patterns: ${upcoming.planPatterns.join(", ")}`;
    section.appendChild(meta);

    const lastGenerated = document.createElement("p");
    lastGenerated.className = "text-muted";
    if (state.lastGeneratedAt) {
      lastGenerated.textContent = `Updated ${formatDateTime(state.lastGeneratedAt)}`;
      section.appendChild(lastGenerated);
    }
  } else {
    const empty = document.createElement("p");
    empty.textContent = "No session generated yet. Let\'s build one.";
    section.appendChild(empty);
  }

  const actions = document.createElement("div");
  actions.style.display = "grid";
  actions.style.gap = "0.6rem";
  actions.style.marginTop = "0.8rem";

  const planButton = document.createElement("button");
  planButton.textContent = "Plan my session";
  planButton.addEventListener("click", () => setView("planner"));

  const logButton = document.createElement("button");
  logButton.textContent = "Log a workout";
  logButton.className = "secondary";
  logButton.addEventListener("click", () => setView("log"));

  actions.appendChild(planButton);
  actions.appendChild(logButton);

  section.appendChild(actions);

  return section;
}

function renderStreak(state) {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Momentum</h2>`;

  const streak = computeStreak(state.logs);
  const cardGrid = document.createElement("div");
  cardGrid.className = "metric-grid";

  cardGrid.appendChild(createMetric("Streak", `${streak} day${streak === 1 ? "" : "s"}`));
  cardGrid.appendChild(createMetric("Sessions this week", `${countSessionsThisWeek(state.logs)}`));
  cardGrid.appendChild(createMetric("Avg RPE", formatRPE(state.logs)));

  section.appendChild(cardGrid);

  if (state.logs.length) {
    const latest = state.logs[0];
    const recent = document.createElement("div");
    recent.style.marginTop = "0.8rem";
    recent.innerHTML = `<strong>Last session:</strong> ${latest.title || latest.blueprint || "Custom"} · ${formatDateTime(latest.date || latest.createdAt)}`;
    section.appendChild(recent);
  }

  return section;
}

function renderEthos() {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Ethos reminders</h2>`;

  const list = document.createElement("ul");
  knowledgeBase.ethos.pillars.forEach((pillar) => {
    const li = document.createElement("li");
    li.textContent = pillar;
    list.appendChild(li);
  });

  section.appendChild(list);
  return section;
}

function renderTips() {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Focus cues</h2>`;

  const list = document.createElement("ul");
  plannerTips.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    list.appendChild(li);
  });
  section.appendChild(list);
  return section;
}

function createMetric(label, value) {
  const card = document.createElement("div");
  card.className = "metric-card";
  const title = document.createElement("h4");
  title.textContent = label;
  const strong = document.createElement("strong");
  strong.textContent = value;
  card.appendChild(title);
  card.appendChild(strong);
  return card;
}

function countSessionsThisWeek(logs) {
  const now = new Date();
  const start = new Date();
  start.setDate(now.getDate() - 6);
  start.setHours(0, 0, 0, 0);
  return logs.filter((log) => new Date(log.date || log.createdAt) >= start).length;
}

function formatRPE(logs) {
  const entries = logs.filter((log) => typeof log.rpe === "number");
  if (!entries.length) return "—";
  const value = entries.reduce((sum, log) => sum + log.rpe, 0) / entries.length;
  return value.toFixed(1);
}
