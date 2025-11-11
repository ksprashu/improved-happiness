import { knowledgeBase, plannerTips, focusOptions } from "../data/knowledgeBase.js";
import { dayPicker, weeklyFlow } from "../data/samplePlan.js";

export function renderKnowledge() {
  const fragment = document.createDocumentFragment();

  fragment.appendChild(renderOverview());
  fragment.appendChild(renderFocusThemes());
  fragment.appendChild(renderEquipment());
  fragment.appendChild(renderMovementLibrary());
  fragment.appendChild(renderBreathwork());
  fragment.appendChild(renderDayPicker());

  return fragment;
}

function renderOverview() {
  const section = document.createElement("section");
  section.className = "section highlight";
  section.innerHTML = `<h2>ShaktiFlow playbook</h2><p>Core principles, cues, and plans that shape every session.</p>`;

  const cues = document.createElement("div");
  cues.className = "chip-group";
  plannerTips.forEach((tip) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = tip;
    cues.appendChild(chip);
  });
  section.appendChild(cues);

  return section;
}

function renderFocusThemes() {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Focus themes</h2>`;

  const list = document.createElement("ul");
  list.className = "list";
  focusOptions.forEach((focus) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${focus.label}</strong><br/><span>${focus.description}</span>`;
    list.appendChild(li);
  });
  section.appendChild(list);

  return section;
}

function renderEquipment() {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Equipment ecosystem</h2>`;

  const list = document.createElement("ul");
  list.className = "list";

  const entries = [
    { label: "Gada", description: `Start ${knowledgeBase.equipment.gada.startKg.join("-")} kg · Progress ${knowledgeBase.equipment.gada.progression.join("-")} kg` },
    { label: "Mudgar", description: `Single adjustable ${knowledgeBase.equipment.mudgar.singleAdjustable.join("-")} kg · optional pair ${knowledgeBase.equipment.mudgar.pairOptional.join("-")} kg` },
    { label: "Kettlebell", description: `${knowledgeBase.equipment.kettlebell.min}-${knowledgeBase.equipment.kettlebell.max} kg adjustable` },
    { label: "Dumbbells", description: `Plates ${Object.keys(knowledgeBase.equipment.dumbbell.platesKg).join(", ")} kg` },
    { label: "Bands", description: `${knowledgeBase.equipment.bands.types.join(" + ")} tensions` },
    { label: "Ankle weights", description: `${knowledgeBase.equipment.ankleWeights.kgEach} kg each` },
    { label: "Yoga / breath", description: "Mat, bench, and pranayama blocks" }
  ];

  entries.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.label}</strong><br/><span>${item.description}</span>`;
    list.appendChild(li);
  });

  section.appendChild(list);
  return section;
}

function renderMovementLibrary() {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Movement library</h2>`;

  const filters = document.createElement("div");
  filters.className = "chip-group";

  const patterns = ["all", ...new Set(knowledgeBase.exercises.map((exercise) => exercise.pattern))];
  let active = "all";

  const list = document.createElement("ul");
  list.className = "list";
  list.style.maxHeight = "320px";
  list.style.overflowY = "auto";

  function renderList(pattern) {
    list.innerHTML = "";
    const filtered = knowledgeBase.exercises.filter((exercise) => pattern === "all" || exercise.pattern === pattern);
    filtered.forEach((exercise) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${exercise.name}</strong><br/><span>${exercise.description}</span><br/><span class="text-muted small">Pattern: ${exercise.pattern} · Tool: ${exercise.tool}</span>`;
      list.appendChild(li);
    });
  }

  patterns.forEach((pattern) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip toggle";
    chip.textContent = pattern === "all" ? "All" : pattern;
    chip.setAttribute("aria-pressed", pattern === active);
    chip.classList.toggle("active", pattern === active);
    chip.addEventListener("click", () => {
      active = pattern;
      renderList(active);
      Array.from(filters.children).forEach((child) => {
        child.setAttribute("aria-pressed", "false");
        child.classList.remove("active");
      });
      chip.setAttribute("aria-pressed", "true");
      chip.classList.add("active");
    });
    filters.appendChild(chip);
  });

  section.appendChild(filters);
  renderList(active);
  section.appendChild(list);

  return section;
}

function renderBreathwork() {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Breath & recovery</h2>`;

  const list = document.createElement("ul");
  list.className = "list";
  knowledgeBase.breathwork.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.label}</strong> — ${item.how || item.effect}`;
    list.appendChild(li);
  });
  section.appendChild(list);
  return section;
}

function renderDayPicker() {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<h2>Dynamic day picker</h2>`;

  const cards = document.createElement("div");
  cards.style.display = "flex";
  cards.style.flexDirection = "column";
  cards.style.gap = "0.8rem";

  dayPicker.forEach((block) => {
    const card = document.createElement("div");
    card.className = "metric-card";
    card.innerHTML = `<h4>${block.name}</h4><strong>${block.duration}</strong><p>${block.sequence}</p>`;
    const focus = document.createElement("div");
    focus.className = "tag-list";
    block.focus.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      focus.appendChild(span);
    });
    card.appendChild(focus);
    cards.appendChild(card);
  });

  const week = document.createElement("table");
  week.className = "table";
  week.innerHTML = `<thead><tr><th>Day</th><th>Suggestion</th></tr></thead>`;
  const body = document.createElement("tbody");
  weeklyFlow.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row.day}</td><td>${row.suggestion}</td>`;
    body.appendChild(tr);
  });
  week.appendChild(body);

  section.appendChild(cards);
  section.appendChild(week);
  return section;
}
