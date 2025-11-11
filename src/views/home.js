import {
  computeStreak,
  setView,
  updatePlanner,
  setGeneratedSession,
  getState,
  prepareLogDraft
} from "../state.js";
import { plannerTips, knowledgeBase, equipmentOptions, focusOptions } from "../data/knowledgeBase.js";
import { formatDateTime } from "../utils/date.js";
import { generateSession } from "../utils/planner.js";

const DURATION_OPTIONS = [15, 25, 35, 45];

export function renderHome(state) {
  const fragment = document.createDocumentFragment();

  fragment.appendChild(renderQuickSession(state));
  fragment.appendChild(renderMomentum(state));
  fragment.appendChild(renderEthos());
  fragment.appendChild(renderTips());

  return fragment;
}

function renderQuickSession(state) {
  const section = document.createElement("section");
  section.className = "section highlight";
  section.innerHTML = `<h2>Start a session</h2><p>Choose what you have today and let ShaktiFlow balance strength, flow, and breath.</p>`;

  section.appendChild(renderDurationSelector(state));
  section.appendChild(renderEquipmentSelector(state));
  section.appendChild(renderFocusSelector(state));

  const helper = document.createElement("p");
  helper.className = "text-muted";
  helper.textContent = "Time of day is detected automatically when you tap Get my workout.";
  section.appendChild(helper);

  const actions = document.createElement("div");
  actions.className = "action-row";

  const startButton = document.createElement("button");
  startButton.type = "button";
  startButton.textContent = state.generatedSession ? "Regenerate session" : "Get my workout";
  startButton.addEventListener("click", () => {
    const autoTimeOfDay = inferTimeOfDay();
    const planner = { ...getState().planner, timeOfDay: autoTimeOfDay };
    const session = generateSession(planner);
    setGeneratedSession({ ...session, generatedAt: new Date().toISOString(), inputs: planner });
    updatePlanner({ timeOfDay: autoTimeOfDay });
  });
  actions.appendChild(startButton);

  if (state.generatedSession) {
    const logButton = document.createElement("button");
    logButton.type = "button";
    logButton.className = "secondary";
    logButton.textContent = "Log this session";
    logButton.addEventListener("click", () => {
      const sessionState = getState().generatedSession || state.generatedSession;
      prepareLogDraft(sessionState);
      setView("log");
    });
    actions.appendChild(logButton);
  }

  section.appendChild(actions);

  section.appendChild(renderSessionPreview(state));

  return section;
}

function renderDurationSelector(state) {
  const field = document.createElement("div");
  field.className = "form-field";
  field.innerHTML = `<label>Time available</label>`;

  const group = document.createElement("div");
  group.className = "chip-group segmented";

  DURATION_OPTIONS.forEach((minutes) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip toggle";
    chip.textContent = `${minutes} min`;
    if (state.planner.duration === minutes) chip.classList.add("active");
    chip.addEventListener("click", () => updatePlanner({ duration: minutes }));
    group.appendChild(chip);
  });

  field.appendChild(group);
  return field;
}

function renderEquipmentSelector(state) {
  const field = document.createElement("div");
  field.className = "form-field";
  field.innerHTML = `<label>Equipment on hand</label>`;

  const chips = document.createElement("div");
  chips.className = "chip-group toggle-group";

  equipmentOptions.forEach((option) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip toggle";
    chip.textContent = option.label;
    chip.title = option.label;
    if ((state.planner.equipment || []).includes(option.id)) chip.classList.add("active");
    chip.addEventListener("click", () => toggleMultiSelect("equipment", option.id));
    chips.appendChild(chip);
  });

  field.appendChild(chips);

  const actions = document.createElement("div");
  actions.className = "inline-actions";

  const selectAll = document.createElement("button");
  selectAll.type = "button";
  selectAll.className = "ghost";
  selectAll.textContent = "Select all";
  selectAll.addEventListener("click", () => updatePlanner({ equipment: equipmentOptions.map((opt) => opt.id) }));

  const clear = document.createElement("button");
  clear.type = "button";
  clear.className = "ghost";
  clear.textContent = "Clear";
  clear.addEventListener("click", () => updatePlanner({ equipment: [] }));

  actions.appendChild(selectAll);
  actions.appendChild(clear);
  field.appendChild(actions);

  return field;
}

function renderFocusSelector(state) {
  const field = document.createElement("div");
  field.className = "form-field";
  field.innerHTML = `<label>Focus for today</label>`;

  const chips = document.createElement("div");
  chips.className = "chip-group toggle-group";

  focusOptions.forEach((option) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip toggle";
    chip.textContent = option.label;
    chip.title = option.description;
    if ((state.planner.focus || []).includes(option.id)) chip.classList.add("active");
    chip.addEventListener("click", () => toggleMultiSelect("focus", option.id));
    chips.appendChild(chip);
  });

  field.appendChild(chips);
  return field;
}

function toggleMultiSelect(key, value) {
  const current = getState();
  const existing = new Set(current.planner[key] || []);
  if (existing.has(value)) existing.delete(value);
  else existing.add(value);
  updatePlanner({ [key]: Array.from(existing) });
}

function renderSessionPreview(state) {
  const section = document.createElement("div");
  section.className = "session-preview";

  if (!state.generatedSession) {
    const placeholder = document.createElement("p");
    placeholder.className = "text-muted";
    placeholder.textContent = "No session generated yet. Choose your inputs and tap Get my workout.";
    section.appendChild(placeholder);
    return section;
  }

  const session = state.generatedSession;

  const title = document.createElement("p");
  title.innerHTML = `<strong>${session.title}</strong>`;
  section.appendChild(title);

  if (session.planPatterns?.length) {
    const tags = document.createElement("div");
    tags.className = "tag-list";
    session.planPatterns.forEach((pattern) => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = pattern;
      tags.appendChild(tag);
    });
    section.appendChild(tags);
  }

  if (session.warnings?.length) {
    session.warnings.forEach((warning) => {
      const alert = document.createElement("div");
      alert.className = "inline-alert";
      alert.textContent = warning;
      section.appendChild(alert);
    });
  }

  const list = document.createElement("ul");
  list.className = "list rich";

  session.exercises.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.exercise.name}</strong><br/><span>${item.exercise.description || ""}</span>`;

    const prescription = document.createElement("div");
    prescription.className = "prescription";
    prescription.textContent = item.reps;
    li.appendChild(prescription);

    if (item.cues) {
      const cues = document.createElement("span");
      cues.className = "text-muted small";
      cues.textContent = item.cues;
      li.appendChild(cues);
    }

    list.appendChild(li);
  });

  section.appendChild(list);

  if (session.breath?.length) {
    const breath = document.createElement("div");
    breath.className = "breath-list";
    const heading = document.createElement("h3");
    heading.textContent = `Breathwork ${session.breathMinutes} min`;
    breath.appendChild(heading);

    const breathUl = document.createElement("ul");
    breathUl.className = "list";
    session.breath.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.label}</strong> — ${item.how || item.effect}`;
      breathUl.appendChild(li);
    });
    breath.appendChild(breathUl);
    section.appendChild(breath);
  }

  if (state.lastGeneratedAt) {
    const meta = document.createElement("p");
    meta.className = "text-muted small";
    meta.textContent = `Updated ${formatDateTime(state.lastGeneratedAt)}`;
    section.appendChild(meta);
  }

  return section;
}

function renderMomentum(state) {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Momentum</h2>`;

  const streak = computeStreak(state.logs);
  const grid = document.createElement("div");
  grid.className = "metric-grid";
  grid.appendChild(createMetric("Streak", `${streak} day${streak === 1 ? "" : "s"}`));
  grid.appendChild(createMetric("Sessions this week", `${countSessionsThisWeek(state.logs)}`));
  grid.appendChild(createMetric("Avg RPE", formatRPE(state.logs)));
  section.appendChild(grid);

  if (state.logs.length) {
    const latest = state.logs[0];
    const recent = document.createElement("div");
    recent.className = "text-muted small";
    recent.textContent = `Last session: ${formatDateTime(latest.date || latest.createdAt)}`;
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

function inferTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "midday";
  return "evening";
}
