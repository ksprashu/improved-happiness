import { computeStreak } from "../state.js";
import { focusOptions } from "../data/knowledgeBase.js";
import { formatDateTime } from "../utils/date.js";

function inferTimeWindow() {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Midday";
  return "Evening";
}

function formatRelative(dateString) {
  if (!dateString) return "";
  const value = new Date(dateString);
  if (Number.isNaN(value.getTime())) return formatDateTime(dateString);
  const diff = Date.now() - value.getTime();
  if (diff < 1000 * 60) return "just now";
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDateTime(dateString);
}

function createStatusPill(label, value) {
  const pill = document.createElement("span");
  pill.className = "status-pill";

  const strong = document.createElement("strong");
  strong.textContent = label;
  pill.appendChild(strong);

  if (value) {
    const span = document.createElement("span");
    span.textContent = value;
    pill.appendChild(span);
  }

  return pill;
}

export function renderTopBar(state) {
  const header = document.createElement("header");
  header.className = "app-topbar";

  const heading = document.createElement("div");
  heading.className = "topbar-heading";

  const title = document.createElement("h1");
  title.textContent = "ShaktiFlow";
  const subtitle = document.createElement("p");
  subtitle.textContent = "Strength • Flow • Breath";

  heading.appendChild(title);
  heading.appendChild(subtitle);
  header.appendChild(heading);

  const statusRow = document.createElement("div");
  statusRow.className = "topbar-status";

  statusRow.appendChild(createStatusPill("Now", inferTimeWindow()));

  const streak = computeStreak(state.logs);
  statusRow.appendChild(createStatusPill("Streak", `${streak}d`));

  if (state.planner?.focus?.length) {
    const focusLabels = state.planner.focus
      .map((id) => focusOptions.find((opt) => opt.id === id)?.label || id.replace(/_/g, " "))
      .join(" · ");
    statusRow.appendChild(createStatusPill("Focus", focusLabels));
  }

  if (state.generatedSession) {
    statusRow.appendChild(
      createStatusPill(
        "Plan",
        state.generatedSession.title.replace(/\s+—.+$/, "").trim() || state.generatedSession.title
      )
    );
  } else {
    statusRow.appendChild(createStatusPill("Plan", "Ready"));
  }

  if (state.logs.length) {
    const last = state.logs[0];
    statusRow.appendChild(createStatusPill("Last log", formatRelative(last.date || last.createdAt)));
  }

  header.appendChild(statusRow);
  return header;
}
