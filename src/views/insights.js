import { knowledgeBase } from "../data/knowledgeBase.js";
import { getVolumeByPattern, getAverageRPE, computeStreak } from "../state.js";
import { formatDate, formatDateTime } from "../utils/date.js";
import { generateSession } from "../utils/planner.js";

export function renderInsights(state) {
  const fragment = document.createDocumentFragment();

  fragment.appendChild(renderSummary(state));
  fragment.appendChild(renderWeeklyBalance(state));
  fragment.appendChild(renderRecovery(state));
  fragment.appendChild(renderNextSuggestion(state));

  return fragment;
}

function renderSummary(state) {
  const section = document.createElement("section");
  section.className = "section highlight";
  section.innerHTML = `<h2>Your training compass</h2><p>See how your flow, strength, and breath work are trending.</p>`;

  const grid = document.createElement("div");
  grid.className = "metric-grid";
  grid.appendChild(createMetric("Logged sessions", `${state.logs.length}`));
  grid.appendChild(createMetric("Current streak", `${computeStreak(state.logs)} days`));
  grid.appendChild(createMetric("Avg RPE", formatAverageRPE(state)));
  section.appendChild(grid);

  return section;
}

function renderWeeklyBalance(state) {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Weekly pattern balance</h2>`;

  const summary = getVolumeByPattern(state.logs);
  const weekStart = getWeekStart();
  const description = document.createElement("p");
  description.textContent = `Tracking since ${formatDate(weekStart)}.`;
  section.appendChild(description);

  const table = document.createElement("table");
  table.className = "table";
  const thead = document.createElement("thead");
  thead.innerHTML = `<tr><th>Pattern</th><th>Sessions</th><th>Status</th></tr>`;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  knowledgeBase.patterns.forEach((pattern) => {
    const count = summary[pattern] || 0;
    const required = pattern === "mobility" ? 1 : 2;
    const tr = document.createElement("tr");
    const status = count >= required ? "On track" : "Needs attention";
    tr.innerHTML = `<td>${pattern}</td><td>${count}</td><td>${status}</td>`;
    if (count < required) {
      tr.style.color = "var(--warning)";
    }
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  section.appendChild(table);

  return section;
}

function renderRecovery(state) {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Recovery lens</h2>`;

  const avgRPE = getAverageRPE(state.logs);
  const streak = computeStreak(state.logs);
  const lastSession = state.logs[0];

  const grid = document.createElement("div");
  grid.className = "metric-grid";
  grid.appendChild(createMetric("Avg RPE", avgRPE ? avgRPE.toFixed(1) : "—"));
  grid.appendChild(createMetric("Current streak", `${streak} days`));
  grid.appendChild(createMetric("Last session", lastSession ? formatDateTime(lastSession.date || lastSession.createdAt) : "—"));
  section.appendChild(grid);

  const advisories = document.createElement("ul");
  advisories.style.marginTop = "0.8rem";

  if (avgRPE && avgRPE >= 8) {
    advisories.appendChild(createListItem("RPE trending high. Prioritise breathwork, halos, and mobility today."));
  }
  if (!state.logs.length) {
    advisories.appendChild(createListItem("No history yet — start logging to unlock personalised guidance."));
  } else {
    const heavyPattern = findOverusedPattern(state);
    if (heavyPattern) {
      advisories.appendChild(createListItem(`Plenty of ${heavyPattern} work logged. Consider anti-rotation and yoga focus next.`));
    }
    const missing = knowledgeBase.patterns.filter((pattern) => (getVolumeByPattern(state.logs)[pattern] || 0) === 0).slice(0, 2);
    if (missing.length) {
      advisories.appendChild(createListItem(`Haven't hit ${missing.join(", ")} yet — weave them into the next plan.`));
    }
  }

  if (!advisories.children.length) {
    advisories.appendChild(createListItem("Balance looks strong. Keep alternating strength and flow days."));
  }

  section.appendChild(advisories);
  return section;
}

function renderNextSuggestion(state) {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Next session cue</h2>`;

  const preview = generateSession(state.planner);
  const title = document.createElement("p");
  title.innerHTML = `<strong>${preview.title}</strong>`;
  section.appendChild(title);

  const list = document.createElement("ul");
  list.className = "list";
  preview.exercises.slice(0, 3).forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.exercise.name} — <em>${item.reps}</em>`;
    list.appendChild(li);
  });
  section.appendChild(list);

  const tip = document.createElement("p");
  tip.style.marginTop = "0.6rem";
  tip.textContent = preview.warnings.length ? preview.warnings[0] : "Looks balanced. Keep nasal breathing during transitions.";
  section.appendChild(tip);

  return section;
}

function createMetric(label, value) {
  const card = document.createElement("div");
  card.className = "metric-card";
  const h4 = document.createElement("h4");
  h4.textContent = label;
  const strong = document.createElement("strong");
  strong.textContent = value;
  card.appendChild(h4);
  card.appendChild(strong);
  return card;
}

function createListItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  return li;
}

function getWeekStart() {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const weekStart = new Date(date.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

function findOverusedPattern(state) {
  const recent = state.logs.slice(0, 5);
  const counts = {};
  recent.forEach((log) => {
    (log.patterns || []).forEach((pattern) => {
      counts[pattern] = (counts[pattern] || 0) + 1;
    });
  });
  const overused = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (!overused) return null;
  return overused[1] >= 3 ? overused[0] : null;
}

function formatAverageRPE(state) {
  const avg = getAverageRPE(state.logs);
  return avg ? avg.toFixed(1) : "—";
}
