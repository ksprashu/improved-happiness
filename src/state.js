import { loadState, saveState } from "./utils/storage.js";
import { timeOfDayOptions, equipmentOptions, goals, readinessLevels } from "./data/knowledgeBase.js";

const defaultPlanner = {
  timeOfDay: timeOfDayOptions[0].id,
  duration: 30,
  equipment: equipmentOptions.map((opt) => (opt.id === "bodyweight" || opt.id === "yoga" ? opt.id : null)).filter(Boolean),
  goals: [goals[0].id, goals[1].id],
  readiness: readinessLevels[1].id,
  soreness: []
};

let state = null;
const listeners = new Set();

function createInitialState() {
  return {
    view: "home",
    planner: { ...defaultPlanner },
    generatedSession: null,
    logs: [],
    preferences: {
      installPromptDismissed: false
    },
    lastGeneratedAt: null
  };
}

function ensureStateLoaded() {
  if (!state) {
    const saved = loadState();
    state = saved ? { ...createInitialState(), ...saved } : createInitialState();
    if (!state.planner) state.planner = { ...defaultPlanner };
  }
}

function notify() {
  saveState(state);
  listeners.forEach((fn) => fn(state));
}

export function getState() {
  ensureStateLoaded();
  return state;
}

export function subscribe(listener) {
  ensureStateLoaded();
  listeners.add(listener);
  listener(state);
  return () => listeners.delete(listener);
}

export function setView(view) {
  ensureStateLoaded();
  state.view = view;
  notify();
}

export function updatePlanner(partial) {
  ensureStateLoaded();
  state.planner = { ...state.planner, ...partial };
  notify();
}

export function setGeneratedSession(session) {
  ensureStateLoaded();
  state.generatedSession = session;
  state.lastGeneratedAt = new Date().toISOString();
  notify();
}

export function addLog(entry) {
  ensureStateLoaded();
  const log = {
    id: crypto.randomUUID ? crypto.randomUUID() : `log-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...entry
  };
  state.logs = [log, ...state.logs];
  notify();
  return log;
}

export function updateLog(id, updates) {
  ensureStateLoaded();
  state.logs = state.logs.map((log) => (log.id === id ? { ...log, ...updates } : log));
  notify();
}

export function deleteLog(id) {
  ensureStateLoaded();
  state.logs = state.logs.filter((log) => log.id !== id);
  notify();
}

export function clearAll() {
  state = createInitialState();
  notify();
}

export function computeStreak(logs = null) {
  const entries = (logs || getState().logs).map((log) => new Date(log.date || log.createdAt));
  if (!entries.length) return 0;
  entries.sort((a, b) => b - a);
  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (const date of entries) {
    const diff = Math.floor((cursor - new Date(date.setHours(0, 0, 0, 0))) / (1000 * 60 * 60 * 24));
    if (diff === 0) {
      streak += 1;
    } else if (diff === 1) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function getRecentLogs(hours = 48) {
  const threshold = Date.now() - hours * 60 * 60 * 1000;
  return getState().logs.filter((log) => new Date(log.date || log.createdAt).getTime() >= threshold);
}

export function getVolumeByPattern(logs = null) {
  const summary = {};
  const entries = logs || getState().logs;
  for (const log of entries) {
    for (const pattern of log.patterns || []) {
      summary[pattern] = (summary[pattern] || 0) + 1;
    }
  }
  return summary;
}

export function getAverageRPE(logs = null) {
  const entries = (logs || getState().logs).filter((log) => typeof log.rpe === "number");
  if (!entries.length) return null;
  const total = entries.reduce((sum, log) => sum + log.rpe, 0);
  return Math.round((total / entries.length) * 10) / 10;
}
