import { knowledgeBase } from "../data/knowledgeBase.js";
import { addLog, updateLog, deleteLog, prepareLogDraft } from "../state.js";
import { formatDateTime } from "../utils/date.js";

export function renderLog(state) {
  const fragment = document.createDocumentFragment();

  fragment.appendChild(createLogForm(state));
  fragment.appendChild(renderLogList(state));

  return fragment;
}

function createLogForm(state) {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Log a session</h2>`;

  if (state.logDraft) {
    const summary = document.createElement("div");
    summary.className = "log-draft";
    const title = document.createElement("div");
    title.className = "log-draft__title";
    const heading = document.createElement("strong");
    heading.textContent = state.logDraft.title || state.logDraft.blueprint || "Session";
    title.appendChild(heading);
    if (state.logDraft.patterns?.length) {
      const patterns = document.createElement("span");
      patterns.textContent = state.logDraft.patterns.join(" · ");
      title.appendChild(patterns);
    }
    summary.appendChild(title);

    const action = document.createElement("button");
    action.type = "button";
    action.className = "ghost";
    action.textContent = "Clear plan";
    action.addEventListener("click", () => prepareLogDraft(null));
    summary.appendChild(action);
    section.appendChild(summary);
  }

  const form = document.createElement("form");
  form.noValidate = true;

  const now = new Date().toISOString().slice(0, 16);

  form.appendChild(createInput("datetime-local", "date", "Session date/time", now));
  form.appendChild(
    createInput(
      "number",
      "duration",
      "Duration (minutes)",
      state.logDraft?.duration ?? 30,
      { min: 5, max: 150 }
    )
  );

  const patternField = document.createElement("div");
  patternField.className = "form-field";
  patternField.innerHTML = `<label>Movement patterns</label>`;
  const patternGrid = document.createElement("div");
  patternGrid.className = "checkbox-grid";
  knowledgeBase.patterns.forEach((pattern) => {
    const label = document.createElement("label");
    label.className = "checkbox-tile";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "patterns";
    input.value = pattern;
    if (state.logDraft?.patterns?.includes(pattern)) input.checked = true;
    const span = document.createElement("span");
    span.textContent = pattern;
    label.appendChild(input);
    label.appendChild(span);
    patternGrid.appendChild(label);
  });
  patternField.appendChild(patternGrid);
  form.appendChild(patternField);

  const exerciseField = document.createElement("div");
  exerciseField.className = "form-field";
  exerciseField.innerHTML = `<label>Exercises performed</label>`;
  const exerciseContainer = document.createElement("div");
  exerciseContainer.dataset.role = "exercise-container";
  exerciseContainer.className = "exercise-container";

  function addExerciseRow({ name = "", sets = "", reps = "", load = "", hint = "" } = {}) {
    const row = document.createElement("div");
    row.className = "exercise-row";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "exercise-name";
    nameInput.placeholder = "Exercise";
    nameInput.value = name;

    const setsInput = document.createElement("input");
    setsInput.type = "number";
    setsInput.name = "exercise-sets";
    setsInput.placeholder = "Sets";
    if (sets !== "") setsInput.value = sets;

    const repsInput = document.createElement("input");
    repsInput.type = "text";
    repsInput.name = "exercise-reps";
    repsInput.placeholder = hint || "Reps or time";
    repsInput.value = reps;

    const loadInput = document.createElement("input");
    loadInput.type = "text";
    loadInput.name = "exercise-load";
    loadInput.placeholder = "Load / weight";
    loadInput.value = load;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "✕";
    removeButton.className = "secondary";
    removeButton.setAttribute("aria-label", "Remove exercise");
    removeButton.addEventListener("click", () => row.remove());

    row.appendChild(nameInput);
    row.appendChild(setsInput);
    row.appendChild(repsInput);
    row.appendChild(loadInput);
    row.appendChild(removeButton);

    if (hint) {
      const hintText = document.createElement("span");
      hintText.className = "text-muted small";
      hintText.textContent = `Plan: ${hint}`;
      row.appendChild(hintText);
    }

    exerciseContainer.appendChild(row);
  }

  if (state.logDraft?.exercises?.length) {
    state.logDraft.exercises.forEach((exercise) => {
      const parsed = parsePrescription(exercise.prescription);
      addExerciseRow({
        name: exercise.name,
        sets: parsed.sets,
        reps: parsed.reps,
        load: "",
        hint: exercise.prescription
      });
    });
  } else {
    addExerciseRow();
  }

  const addExerciseButton = document.createElement("button");
  addExerciseButton.type = "button";
  addExerciseButton.textContent = "Add movement";
  addExerciseButton.className = "secondary";
  addExerciseButton.style.width = "auto";
  addExerciseButton.addEventListener("click", () => addExerciseRow());

  exerciseField.appendChild(exerciseContainer);
  exerciseField.appendChild(addExerciseButton);
  form.appendChild(exerciseField);

  form.appendChild(createInput("text", "loadSummary", "Load / density notes", state.logDraft ? state.logDraft.blueprint || "" : ""));

  const rpeField = document.createElement("div");
  rpeField.className = "form-field";
  rpeField.innerHTML = `<label for="rpe">RPE (1-10)</label>`;
  const rpeInput = document.createElement("input");
  rpeInput.type = "range";
  rpeInput.id = "rpe";
  rpeInput.name = "rpe";
  rpeInput.min = "1";
  rpeInput.max = "10";
  rpeInput.value = "7";
  const rpeValue = document.createElement("p");
  rpeValue.className = "text-muted";
  rpeValue.textContent = "7";
  rpeInput.addEventListener("input", (event) => {
    rpeValue.textContent = event.target.value;
  });
  rpeField.appendChild(rpeInput);
  rpeField.appendChild(rpeValue);
  form.appendChild(rpeField);

  form.appendChild(
    createInput(
      "number",
      "breathMinutes",
      "Breathwork completed (minutes)",
      state.logDraft?.breathMinutes ?? 3,
      { min: 0, max: 30 }
    )
  );

  const notesField = document.createElement("div");
  notesField.className = "form-field";
  notesField.innerHTML = `<label for="notes">Notes & reflections</label>`;
  const notesInput = document.createElement("textarea");
  notesInput.id = "notes";
  notesInput.name = "notes";
  notesInput.placeholder = "Energy, soreness, breath cues...";
  notesField.appendChild(notesInput);
  form.appendChild(notesField);

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = "Save session";
  form.appendChild(submit);

  const feedback = document.createElement("p");
  feedback.className = "text-muted";
  form.appendChild(feedback);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const patterns = Array.from(form.querySelectorAll('input[name="patterns"]:checked')).map((input) => input.value);
    const exercises = Array.from(exerciseContainer.querySelectorAll(".exercise-row")).map((row) => {
      const inputs = row.querySelectorAll("input");
      const name = inputs[0].value.trim();
      const sets = inputs[1].value.trim();
      const reps = inputs[2].value.trim();
      const load = inputs[3].value.trim();
      if (!name) return null;
      return {
        name,
        sets: sets ? Number(sets) : null,
        reps,
        load
      };
    }).filter(Boolean);

    const entry = {
      title: state.logDraft?.title || undefined,
      blueprint: state.logDraft?.blueprint || undefined,
      date: formData.get("date") ? new Date(formData.get("date")).toISOString() : new Date().toISOString(),
      duration: Number(formData.get("duration")) || 0,
      patterns,
      exercises,
      loadSummary: formData.get("loadSummary"),
      rpe: Number(formData.get("rpe")) || null,
      notes: notesInput.value.trim(),
      breathMinutes: Number(formData.get("breathMinutes")) || 0
    };

    addLog(entry);
    feedback.textContent = `Saved at ${formatDateTime(entry.date)}.`;
    setTimeout(() => {
      feedback.textContent = "";
    }, 3000);
    form.reset();
    const dateField = form.querySelector("#date");
    if (dateField) {
      const nextNow = new Date().toISOString().slice(0, 16);
      dateField.value = nextNow;
      dateField.defaultValue = nextNow;
    }
    rpeInput.value = "7";
    rpeValue.textContent = "7";
    exerciseContainer.innerHTML = "";
    addExerciseRow();
    prepareLogDraft(null);
  });

  section.appendChild(form);
  return section;
}

function createInput(type, name, label, value, attributes = {}) {
  const wrapper = document.createElement("div");
  wrapper.className = "form-field";
  const fieldLabel = document.createElement("label");
  fieldLabel.htmlFor = name;
  fieldLabel.textContent = label;
  const input = document.createElement("input");
  input.type = type;
  input.id = name;
  input.name = name;
  if (value !== undefined && value !== null) input.value = value;
  Object.entries(attributes).forEach(([key, val]) => input.setAttribute(key, val));
  wrapper.appendChild(fieldLabel);
  wrapper.appendChild(input);
  return wrapper;
}

function renderLogList(state) {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>History</h2>`;

  if (!state.logs.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No sessions yet. They will appear here once saved.";
    section.appendChild(empty);
    return section;
  }

  const list = document.createElement("div");
  list.style.display = "flex";
  list.style.flexDirection = "column";
  list.style.gap = "0.8rem";

  state.logs.forEach((log) => {
    const card = document.createElement("div");
    card.className = "log-entry";

    const header = document.createElement("header");
    const title = document.createElement("h4");
    title.textContent = log.title || log.blueprint || "Session";
    const time = document.createElement("span");
    time.textContent = formatDateTime(log.date || log.createdAt);
    header.appendChild(title);
    header.appendChild(time);
    card.appendChild(header);

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.innerHTML = `<span class="badge">${log.duration || 0} min</span>`;
    (log.patterns || []).forEach((pattern) => {
      const span = document.createElement("span");
      span.className = "badge";
      span.textContent = pattern;
      meta.appendChild(span);
    });
    card.appendChild(meta);

    if (log.exercises?.length) {
      const exerciseList = document.createElement("ul");
      exerciseList.className = "list";
      log.exercises.forEach((exercise) => {
        const li = document.createElement("li");
        const segments = [];
        if (exercise.sets) segments.push(`${exercise.sets} sets`);
        if (exercise.reps) segments.push(exercise.reps);
        if (exercise.load) segments.push(`@ ${exercise.load}`);
        if (segments.length) {
          li.innerHTML = `<strong>${exercise.name}</strong><br/><span class="text-muted small">${segments.join(" · ")}</span>`;
        } else {
          li.innerHTML = `<strong>${exercise.name}</strong>`;
        }
        exerciseList.appendChild(li);
      });
      card.appendChild(exerciseList);
    }

    const breath = document.createElement("p");
    breath.textContent = `Breathwork: ${log.breathMinutes || 0} min`;
    card.appendChild(breath);

    if (log.loadSummary) {
      const load = document.createElement("p");
      load.className = "text-muted";
      load.textContent = `Load notes: ${log.loadSummary}`;
      card.appendChild(load);
    }

    const notes = document.createElement("textarea");
    notes.value = log.notes || "";
    notes.placeholder = "Notes";
    notes.addEventListener("change", () => updateLog(log.id, { notes: notes.value }));
    card.appendChild(notes);

    const rpeRow = document.createElement("div");
    rpeRow.className = "log-actions";
    const rpeLabel = document.createElement("label");
    rpeLabel.textContent = "RPE";
    const rpeInput = document.createElement("input");
    rpeInput.type = "number";
    rpeInput.min = "1";
    rpeInput.max = "10";
    rpeInput.value = log.rpe ?? "";
    rpeInput.addEventListener("change", () => updateLog(log.id, { rpe: Number(rpeInput.value) || null }));
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.className = "secondary";
    deleteButton.addEventListener("click", () => deleteLog(log.id));
    rpeRow.appendChild(rpeLabel);
    rpeRow.appendChild(rpeInput);
    rpeRow.appendChild(deleteButton);
    card.appendChild(rpeRow);

    list.appendChild(card);
  });

  section.appendChild(list);
  return section;
}

function parsePrescription(prescription = "") {
  if (!prescription) return { sets: "", reps: "" };
  const cleaned = prescription.replace(/×/g, "x");
  const match = cleaned.match(/(\d+)\s*[xX]\s*(\d+)/);
  if (match) {
    return {
      sets: match[1],
      reps: cleaned.slice(match[0].length).trim() || match[2]
    };
  }
  return { sets: "", reps: cleaned };
}
