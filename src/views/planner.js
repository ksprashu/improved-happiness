import {
  timeOfDayOptions,
  equipmentOptions,
  goals,
  readinessLevels,
  sorenessMap
} from "../data/knowledgeBase.js";
import { updatePlanner, setGeneratedSession, addLog, getState } from "../state.js";
import { generateSession } from "../utils/planner.js";
import { formatDateTime } from "../utils/date.js";

export function renderPlanner(state) {
  const container = document.createElement("div");
  container.appendChild(createHeader());

  const main = document.createElement("div");
  main.className = "main-content";

  const form = createPlannerForm(state);
  main.appendChild(form);

  const output = document.createElement("div");
  output.id = "planner-output";
  if (state.generatedSession) {
    output.appendChild(renderSession(state.generatedSession));
  }
  main.appendChild(output);

  container.appendChild(main);
  return container;
}

function createHeader() {
  const header = document.createElement("header");
  header.className = "app-header";
  header.innerHTML = `<h1>Dynamic planner</h1><p>Balance strength, flow, and recovery in minutes.</p>`;
  return header;
}

function createPlannerForm(state) {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Session inputs</h2>`;

  const form = document.createElement("form");
  form.autocomplete = "off";
  form.noValidate = true;

  // Time of day
  form.appendChild(createSelectField("timeOfDay", "Time of day", timeOfDayOptions, state.planner.timeOfDay));

  // Duration slider or number input
  const durationField = document.createElement("div");
  durationField.className = "form-field";
  durationField.innerHTML = `<label for="planner-duration">Duration (minutes)</label>`;
  const durationInput = document.createElement("input");
  durationInput.type = "range";
  durationInput.min = "10";
  durationInput.max = "60";
  durationInput.step = "5";
  durationInput.id = "planner-duration";
  durationInput.value = state.planner.duration;
  const durationValue = document.createElement("p");
  durationValue.textContent = `${state.planner.duration} minutes`;
  durationValue.style.marginTop = "0.4rem";
  durationValue.style.color = "var(--text-muted)";

  durationInput.addEventListener("input", (event) => {
    durationValue.textContent = `${event.target.value} minutes`;
    updatePlanner({ duration: Number(event.target.value) });
  });

  durationField.appendChild(durationInput);
  durationField.appendChild(durationValue);
  form.appendChild(durationField);

  // Goals
  form.appendChild(createCheckboxGroup("goals", "Goal emphasis", goals, state.planner.goals));

  // Readiness
  form.appendChild(createSelectField("readiness", "Readiness / energy", readinessLevels, state.planner.readiness));

  // Equipment
  form.appendChild(createCheckboxGroup("equipment", "Equipment available", equipmentOptions, state.planner.equipment));

  // Soreness map
  form.appendChild(createCheckboxGroup("soreness", "Areas that feel worked", sorenessMap.map((id) => ({ id, label: id })), state.planner.soreness));

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = "Generate session";

  form.appendChild(submit);

  form.addEventListener("change", (event) => handleFormChange(event, state));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const planner = getState().planner;
    const session = generateSession(planner);
    setGeneratedSession({ ...session, generatedAt: new Date().toISOString(), inputs: planner });
    const output = document.getElementById("planner-output");
    output.innerHTML = "";
    output.appendChild(renderSession(getState().generatedSession));
  });

  section.appendChild(form);
  return section;
}

function createSelectField(name, label, options, value) {
  const wrapper = document.createElement("div");
  wrapper.className = "form-field";
  const fieldLabel = document.createElement("label");
  fieldLabel.htmlFor = name;
  fieldLabel.textContent = label;
  const select = document.createElement("select");
  select.name = name;
  select.id = name;
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.id;
    opt.textContent = option.label || option.id;
    if (option.id === value) opt.selected = true;
    select.appendChild(opt);
  });
  wrapper.appendChild(fieldLabel);
  wrapper.appendChild(select);
  return wrapper;
}

function createCheckboxGroup(name, label, options, values) {
  const wrapper = document.createElement("div");
  wrapper.className = "form-field";
  const fieldLabel = document.createElement("label");
  fieldLabel.textContent = label;
  wrapper.appendChild(fieldLabel);

  const grid = document.createElement("div");
  grid.className = "checkbox-grid";

  options.forEach((option) => {
    const tile = document.createElement("label");
    tile.className = "checkbox-tile";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = name;
    input.value = option.id || option;
    if (values.includes(option.id || option)) {
      input.checked = true;
    }
    const span = document.createElement("span");
    span.textContent = option.label || option.id || option;

    tile.appendChild(input);
    tile.appendChild(span);
    grid.appendChild(tile);
  });

  wrapper.appendChild(grid);
  return wrapper;
}

function handleFormChange(event, state) {
  const target = event.target;
  if (!target.name) return;

  if (target.type === "checkbox") {
    const name = target.name;
    const existing = new Set(state.planner[name] || []);
    if (target.checked) existing.add(target.value);
    else existing.delete(target.value);
    updatePlanner({ [name]: Array.from(existing) });
  } else if (target.tagName === "SELECT") {
    updatePlanner({ [target.name]: target.value });
  }
}

function renderSession(session) {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Suggested session</h2>`;

  const title = document.createElement("p");
  title.innerHTML = `<strong>${session.title}</strong>`;
  section.appendChild(title);

  const patterns = document.createElement("div");
  patterns.className = "tag-list";
  session.planPatterns.forEach((pattern) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = pattern;
    patterns.appendChild(tag);
  });
  section.appendChild(patterns);

  if (session.warnings.length) {
    session.warnings.forEach((warning) => {
      const alert = document.createElement("div");
      alert.className = "inline-alert";
      alert.textContent = warning;
      section.appendChild(alert);
    });
  }

  const list = document.createElement("ul");
  list.className = "list";
  session.exercises.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${labelForBlock(item.block)}</strong><br/>${item.exercise.name}<br/><em>${item.reps}</em><br/><span>${item.cues}</span>`;
    list.appendChild(li);
  });
  section.appendChild(list);

  const breath = document.createElement("div");
  breath.style.marginTop = "0.8rem";
  breath.innerHTML = `<h3>Breathwork ${session.breathMinutes} min</h3>`;
  const breathList = document.createElement("ul");
  breathList.className = "list";
  session.breath.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.label}</strong> — ${item.effect}`;
    breathList.appendChild(li);
  });
  breath.appendChild(breathList);
  section.appendChild(breath);

  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.textContent = "Save to log";
  saveButton.addEventListener("click", () => {
    const sessionState = getState().generatedSession || session;
    const entry = {
      title: sessionState.title,
      blueprint: sessionState.blueprint,
      date: new Date().toISOString(),
      duration: getState().planner.duration,
      patterns: sessionState.planPatterns,
      exercises: sessionState.exercises.map((item) => ({
        name: item.exercise.name,
        reps: item.reps
      })),
      breath: sessionState.breath.map((item) => item.label),
      rpe: null,
      notes: "Generated session",
      breathMinutes: sessionState.breathMinutes
    };
    addLog(entry);
    const confirmation = document.createElement("p");
    confirmation.textContent = `Saved! Logged on ${formatDateTime(entry.date)}.`;
    confirmation.style.marginTop = "0.6rem";
    confirmation.style.color = "var(--accent)";
    section.appendChild(confirmation);
    saveButton.disabled = true;
  });
  section.appendChild(saveButton);

  const metadata = document.createElement("p");
  metadata.style.marginTop = "0.6rem";
  metadata.style.fontSize = "0.8rem";
  metadata.style.color = "var(--text-muted)";
  metadata.textContent = `Generated ${formatDateTime(session.generatedAt || new Date())}`;
  section.appendChild(metadata);

  return section;
}

function labelForBlock(block) {
  const labels = {
    mobility: "Mobility warm-up",
    compound_flow: "Compound flow",
    squat_or_hinge: "Primary strength",
    push: "Pressing strength",
    pull: "Row / pull",
    rotate: "Rotational torque",
    core: "Core stability",
    supplemental: "Supplemental coverage",
    skill_blocks: "Skill block",
    metabolic_circuit: "Metabolic driver"
  };
  return labels[block] || block;
}
