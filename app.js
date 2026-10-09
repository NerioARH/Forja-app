/**
 * FORJA - Minimalist Fitness Engine
 * Daily Routine Checklist, Muscle Map & Weekly Historical Comparison
 * 100% Offline-first, Zero-dependency vanilla JavaScript
 */

// --- 1. MUSCLE DICTIONARY & DEFAULT EXERCISES ---
const MUSCLE_DEFINITIONS = {
  chest: {
    name: 'Pecho',
    fullTitle: 'Pectoral Mayor y Menor',
    optimalMin: 12,
    optimalMax: 18,
    exercises: ['Press de Banca Plano', 'Press Inclinado Mancuernas', 'Aperturas en Polea', 'Fondos en Paralelas', 'Flexiones']
  },
  back: {
    name: 'Espalda',
    fullTitle: 'Dorsales y Trapecios',
    optimalMin: 14,
    optimalMax: 20,
    exercises: ['Dominadas', 'Jalón al Pecho', 'Remo con Barra', 'Remo Unilateral Mancuerna', 'Remo Gironda']
  },
  shoulders: {
    name: 'Hombros',
    fullTitle: 'Deltoides (Frontal, Lateral, Posterior)',
    optimalMin: 12,
    optimalMax: 18,
    exercises: ['Press Militar con Barra', 'Elevaciones Laterales', 'Pájaros con Mancuerna', 'Press Arnold', 'Face Pulls']
  },
  biceps: {
    name: 'Bíceps',
    fullTitle: 'Bíceps Braquial y Antebrazos',
    optimalMin: 10,
    optimalMax: 16,
    exercises: ['Curl con Barra Z', 'Curl Martillo', 'Curl en Banco Inclinado', 'Curl Concentrado']
  },
  triceps: {
    name: 'Tríceps',
    fullTitle: 'Tríceps (Cabeza Larga, Lateral y Medial)',
    optimalMin: 10,
    optimalMax: 16,
    exercises: ['Extensión en Polea Alta', 'Press Francés', 'Fondos de Tríceps', 'Copa con Mancuerna']
  },
  core: {
    name: 'Core',
    fullTitle: 'Recto Abdominal y Oblicuos',
    optimalMin: 8,
    optimalMax: 14,
    exercises: ['Elevación de Piernas', 'Crunch en Polea', 'Plancha Abdominal', 'Rueda Abdominal']
  },
  quads: {
    name: 'Cuádriceps',
    fullTitle: 'Cuádriceps Femoral',
    optimalMin: 12,
    optimalMax: 18,
    exercises: ['Sentadilla con Barra', 'Prensa de Piernas', 'Extensiones de Cuádriceps', 'Sentadilla Búlgara', 'Zancadas']
  },
  hamstrings: {
    name: 'Femorales',
    fullTitle: 'Isquiosurales / Femorales',
    optimalMin: 10,
    optimalMax: 16,
    exercises: ['Peso Muerto Rumano (RDL)', 'Curl Femoral Tumbado', 'Curl Femoral Sentado', 'Buenos Días']
  },
  glutes: {
    name: 'Glúteos',
    fullTitle: 'Glúteo Mayor y Medio',
    optimalMin: 10,
    optimalMax: 16,
    exercises: ['Hip Thrust con Barra', 'Patada en Polea', 'Peso Muerto Sumo', 'Abducción en Máquina']
  },
  calves: {
    name: 'Pantorrillas',
    fullTitle: 'Gemelos y Sóleo',
    optimalMin: 10,
    optimalMax: 16,
    exercises: ['Elevación de Talones de Pie', 'Elevación de Talones Sentado', 'Gemelos en Prensa']
  }
};

const RANKS = [
  { level: 1, title: 'Novato' },
  { level: 3, title: 'Iniciado' },
  { level: 5, title: 'Constante' },
  { level: 8, title: 'Gladiador' },
  { level: 12, title: 'Titán' },
  { level: 16, title: 'Maestro' },
  { level: 20, title: 'Élite' }
];

const DAYS_OF_WEEK = [
  { id: 1, key: 'mon', short: 'LUN', name: 'Lunes' },
  { id: 2, key: 'tue', short: 'MAR', name: 'Martes' },
  { id: 3, key: 'wed', short: 'MIÉ', name: 'Miércoles' },
  { id: 4, key: 'thu', short: 'JUE', name: 'Jueves' },
  { id: 5, key: 'fri', short: 'VIE', name: 'Viernes' },
  { id: 6, key: 'sat', short: 'SÁB', name: 'Sábado' },
  { id: 0, key: 'sun', short: 'DOM', name: 'Domingo' }
];

// --- 2. ROUTINE GENERATION TEMPLATES ---
function generateWeeklySchedule(focus = 'glutes_legs', daysCount = 4, hasRoutine = false) {
  const schedule = {
    mon: { title: 'Día 1', isRest: false, exercises: [] },
    tue: { title: 'Día 2', isRest: false, exercises: [] },
    wed: { title: 'Descanso Activo', isRest: true, exercises: [] },
    thu: { title: 'Día 3', isRest: false, exercises: [] },
    fri: { title: 'Día 4', isRest: false, exercises: [] },
    sat: { title: 'Descanso', isRest: true, exercises: [] },
    sun: { title: 'Descanso', isRest: true, exercises: [] }
  };

  if (hasRoutine) {
    // Flexible user template
    schedule.mon = {
      title: 'Entrenamiento Libre A',
      isRest: false,
      exercises: [
        { id: 'usr_1', name: 'Primer Ejercicio Principal', muscle: 'chest', sets: 4, reps: 10, completed: false },
        { id: 'usr_2', name: 'Segundo Ejercicio', muscle: 'back', sets: 3, reps: 12, completed: false }
      ]
    };
    schedule.tue = { title: 'Entrenamiento Libre B', isRest: false, exercises: [] };
    schedule.thu = { title: 'Entrenamiento Libre C', isRest: false, exercises: [] };
    schedule.fri = { title: 'Entrenamiento Libre D', isRest: false, exercises: [] };
    return schedule;
  }

  // Curated Routine Templates based on Goal / Focus
  if (focus === 'glutes_legs') {
    schedule.mon = {
      title: 'Glúteos & Femorales (Enfoque)',
      isRest: false,
      exercises: [
        { id: 'g_1', name: 'Hip Thrust con Barra', muscle: 'glutes', sets: 4, reps: 10, completed: false },
        { id: 'g_2', name: 'Peso Muerto Rumano (RDL)', muscle: 'hamstrings', sets: 3, reps: 10, completed: false },
        { id: 'g_3', name: 'Patada de Glúteo en Polea', muscle: 'glutes', sets: 3, reps: 12, completed: false },
        { id: 'g_4', name: 'Curl Femoral Tumbado', muscle: 'hamstrings', sets: 3, reps: 12, completed: false }
      ]
    };
    schedule.tue = {
      title: 'Torso & Abdomen',
      isRest: false,
      exercises: [
        { id: 'g_5', name: 'Press Banca con Mancuernas', muscle: 'chest', sets: 3, reps: 10, completed: false },
        { id: 'g_6', name: 'Jalón al Pecho', muscle: 'back', sets: 3, reps: 10, completed: false },
        { id: 'g_7', name: 'Elevaciones Laterales', muscle: 'shoulders', sets: 3, reps: 15, completed: false },
        { id: 'g_8', name: 'Elevación de Piernas', muscle: 'core', sets: 3, reps: 15, completed: false }
      ]
    };
    schedule.wed = { title: 'Recuperación / Caminata', isRest: true, exercises: [] };
    schedule.thu = {
      title: 'Cuádriceps & Glúteos',
      isRest: false,
      exercises: [
        { id: 'g_9', name: 'Sentadilla con Barra', muscle: 'quads', sets: 4, reps: 8, completed: false },
        { id: 'g_10', name: 'Prensa de Piernas', muscle: 'quads', sets: 3, reps: 10, completed: false },
        { id: 'g_11', name: 'Sentadilla Búlgara', muscle: 'glutes', sets: 3, reps: 10, completed: false },
        { id: 'g_12', name: 'Gemelos en Prensa', muscle: 'calves', sets: 3, reps: 15, completed: false }
      ]
    };
    schedule.fri = {
      title: 'Espalda & Brazos',
      isRest: false,
      exercises: [
        { id: 'g_13', name: 'Remo con Barra', muscle: 'back', sets: 3, reps: 10, completed: false },
        { id: 'g_14', name: 'Press Militar', muscle: 'shoulders', sets: 3, reps: 10, completed: false },
        { id: 'g_15', name: 'Curl con Barra Z', muscle: 'biceps', sets: 3, reps: 12, completed: false },
        { id: 'g_16', name: 'Extensión en Polea', muscle: 'triceps', sets: 3, reps: 12, completed: false }
      ]
    };
  } else if (focus === 'chest_arms') {
    schedule.mon = {
      title: 'Pecho & Tríceps (Potencia)',
      isRest: false,
      exercises: [
        { id: 'c_1', name: 'Press de Banca Plano', muscle: 'chest', sets: 4, reps: 8, completed: false },
        { id: 'c_2', name: 'Press Inclinado con Mancuernas', muscle: 'chest', sets: 3, reps: 10, completed: false },
        { id: 'c_3', name: 'Fondos en Paralelas', muscle: 'chest', sets: 3, reps: 10, completed: false },
        { id: 'c_4', name: 'Extensión en Polea Alta', muscle: 'triceps', sets: 3, reps: 12, completed: false }
      ]
    };
    schedule.tue = {
      title: 'Espalda & Bíceps',
      isRest: false,
      exercises: [
        { id: 'c_5', name: 'Dominadas', muscle: 'back', sets: 4, reps: 8, completed: false },
        { id: 'c_6', name: 'Remo con Barra', muscle: 'back', sets: 3, reps: 10, completed: false },
        { id: 'c_7', name: 'Jalón al Pecho', muscle: 'back', sets: 3, reps: 10, completed: false },
        { id: 'c_8', name: 'Curl con Barra Z', muscle: 'biceps', sets: 3, reps: 10, completed: false }
      ]
    };
    schedule.thu = {
      title: 'Pecho & Hombros Hipertrofia',
      isRest: false,
      exercises: [
        { id: 'c_9', name: 'Aperturas en Polea', muscle: 'chest', sets: 3, reps: 12, completed: false },
        { id: 'c_10', name: 'Press Militar con Barra', muscle: 'shoulders', sets: 4, reps: 8, completed: false },
        { id: 'c_11', name: 'Elevaciones Laterales', muscle: 'shoulders', sets: 4, reps: 15, completed: false },
        { id: 'c_12', name: 'Press Francés', muscle: 'triceps', sets: 3, reps: 10, completed: false }
      ]
    };
    schedule.fri = {
      title: 'Piernas & Brazos Aislamiento',
      isRest: false,
      exercises: [
        { id: 'c_13', name: 'Prensa de Piernas', muscle: 'quads', sets: 4, reps: 10, completed: false },
        { id: 'c_14', name: 'Peso Muerto Rumano', muscle: 'hamstrings', sets: 3, reps: 10, completed: false },
        { id: 'c_15', name: 'Curl Martillo', muscle: 'biceps', sets: 3, reps: 10, completed: false },
        { id: 'c_16', name: 'Gemelos de Pie', muscle: 'calves', sets: 3, reps: 15, completed: false }
      ]
    };
  } else if (focus === 'back_shoulders') {
    schedule.mon = {
      title: 'Espalda V-Taper & Trapecio',
      isRest: false,
      exercises: [
        { id: 'b_1', name: 'Dominadas Pronas', muscle: 'back', sets: 4, reps: 8, completed: false },
        { id: 'b_2', name: 'Remo con Barra', muscle: 'back', sets: 3, reps: 8, completed: false },
        { id: 'b_3', name: 'Jalón al Pecho Neutro', muscle: 'back', sets: 3, reps: 10, completed: false },
        { id: 'b_4', name: 'Face Pulls', muscle: 'shoulders', sets: 3, reps: 15, completed: false }
      ]
    };
    schedule.tue = {
      title: 'Hombros 3D & Pecho',
      isRest: false,
      exercises: [
        { id: 'b_5', name: 'Press Militar', muscle: 'shoulders', sets: 4, reps: 8, completed: false },
        { id: 'b_6', name: 'Elevaciones Laterales', muscle: 'shoulders', sets: 4, reps: 12, completed: false },
        { id: 'b_7', name: 'Press de Banca Plano', muscle: 'chest', sets: 3, reps: 8, completed: false },
        { id: 'b_8', name: 'Pájaros con Mancuerna', muscle: 'shoulders', sets: 3, reps: 15, completed: false }
      ]
    };
    schedule.thu = {
      title: 'Espalda Densidad & Brazos',
      isRest: false,
      exercises: [
        { id: 'b_9', name: 'Remo Unilateral Mancuerna', muscle: 'back', sets: 3, reps: 10, completed: false },
        { id: 'b_10', name: 'Remo Gironda en Polea', muscle: 'back', sets: 3, reps: 10, completed: false },
        { id: 'b_11', name: 'Curl Inclinado', muscle: 'biceps', sets: 3, reps: 10, completed: false },
        { id: 'b_12', name: 'Fondos de Tríceps', muscle: 'triceps', sets: 3, reps: 10, completed: false }
      ]
    };
    schedule.fri = {
      title: 'Piernas & Core',
      isRest: false,
      exercises: [
        { id: 'b_13', name: 'Sentadilla con Barra', muscle: 'quads', sets: 4, reps: 8, completed: false },
        { id: 'b_14', name: 'Peso Muerto Rumano', muscle: 'hamstrings', sets: 3, reps: 10, completed: false },
        { id: 'b_15', name: 'Elevación de Piernas', muscle: 'core', sets: 3, reps: 12, completed: false },
        { id: 'b_16', name: 'Plancha Abdominal', muscle: 'core', sets: 3, reps: 45, completed: false }
      ]
    };
  } else {
    // Full Body
    schedule.mon = {
      title: 'Cuerpo Completo A',
      isRest: false,
      exercises: [
        { id: 'fb_1', name: 'Sentadilla con Barra', muscle: 'quads', sets: 4, reps: 8, completed: false },
        { id: 'fb_2', name: 'Press de Banca Plano', muscle: 'chest', sets: 3, reps: 8, completed: false },
        { id: 'fb_3', name: 'Remo con Barra', muscle: 'back', sets: 3, reps: 10, completed: false },
        { id: 'fb_4', name: 'Elevaciones Laterales', muscle: 'shoulders', sets: 3, reps: 12, completed: false }
      ]
    };
    schedule.wed = {
      title: 'Cuerpo Completo B',
      isRest: false,
      exercises: [
        { id: 'fb_5', name: 'Peso Muerto Rumano', muscle: 'hamstrings', sets: 4, reps: 8, completed: false },
        { id: 'fb_6', name: 'Press Militar', muscle: 'shoulders', sets: 3, reps: 8, completed: false },
        { id: 'fb_7', name: 'Dominadas o Jalón', muscle: 'back', sets: 3, reps: 10, completed: false },
        { id: 'fb_8', name: 'Curl con Mancuernas', muscle: 'biceps', sets: 3, reps: 12, completed: false }
      ]
    };
    schedule.fri = {
      title: 'Cuerpo Completo C',
      isRest: false,
      exercises: [
        { id: 'fb_9', name: 'Prensa de Piernas', muscle: 'quads', sets: 4, reps: 10, completed: false },
        { id: 'fb_10', name: 'Hip Thrust con Barra', muscle: 'glutes', sets: 3, reps: 10, completed: false },
        { id: 'fb_11', name: 'Fondos en Paralelas', muscle: 'chest', sets: 3, reps: 10, completed: false },
        { id: 'fb_12', name: 'Elevación de Piernas', muscle: 'core', sets: 3, reps: 15, completed: false }
      ]
    };
  }

  return schedule;
}

// --- 3. AUDIO & HAPTIC SYSTEM ---
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playTone(freq, type = 'sine', duration = 0.12, gainVal = 0.15) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playCheck() {
    if (!this.enabled) return;
    this.init();
    this.playTone(320, 'sine', 0.08, 0.2);
    setTimeout(() => this.playTone(640, 'sine', 0.12, 0.18), 40);
  }

  playLevelUp() {
    if (!this.enabled) return;
    [261.6, 329.6, 392.0, 523.2].forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.2, 0.18), idx * 80);
    });
  }
}

const audio = new SoundEngine();

function triggerHaptic(pattern = 15) {
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {}
  }
}

// --- 4. PERSISTENT APPLICATION STATE ---
const STORAGE_KEY = 'FORJA_DAILY_STATE_V2';

const defaultState = {
  userProfile: {
    completed: false,
    hasRoutine: false,
    goal: 'hypertrophy',
    focus: 'glutes_legs',
    days: 4,
    planName: 'Escultor: Glúteos & Piernas'
  },
  dailySchedule: null,
  activeDayKey: getCurrentDayKey(),
  xp: 100,
  level: 1,
  streakWeeks: 1,
  soundOn: true,
  currentWeekSets: {},
  history: [], // { id, timestamp, dayKey, muscle, exercise, weight, reps, rir }
  weeklyHistory: [] // Historical archived weeks
};

function getCurrentDayKey() {
  const dayIndex = new Date().getDay(); // 0 = sun, 1 = mon...
  const match = DAYS_OF_WEEK.find(d => d.id === dayIndex);
  return match ? match.key : 'mon';
}

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultState, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return JSON.parse(JSON.stringify(defaultState));
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

// Ensure daily schedule exists
if (!state.dailySchedule) {
  state.dailySchedule = generateWeeklySchedule(
    state.userProfile?.focus || 'glutes_legs',
    state.userProfile?.days || 4,
    state.userProfile?.hasRoutine || false
  );
  saveState();
}

// --- 5. GAME & SCORE CALCULATIONS ---
function getVolumeLevel(sets) {
  if (!sets || sets <= 0) return 0;
  if (sets < 6) return 1;
  if (sets < 12) return 2;
  if (sets <= 18) return 3;
  if (sets <= 24) return 4;
  return 5;
}

function getVolumeLabel(lvl) {
  switch (lvl) {
    case 0: return { label: '0 series (Frío)', class: 'vol-0' };
    case 1: return { label: '1-5s (Activación)', class: 'vol-1' };
    case 2: return { label: '6-11s (Moderado)', class: 'vol-2' };
    case 3: return { label: '12-18s (Óptimo)', class: 'vol-3' };
    case 4: return { label: '19-24s (Máximo)', class: 'vol-4' };
    default: return { label: '25s+ (Exceso)', class: 'vol-5' };
  }
}

function getXpForNextLevel(lvl) {
  return lvl * 300;
}

function getRankTitle(lvl) {
  let title = RANKS[0].title;
  for (const r of RANKS) {
    if (lvl >= r.level) title = r.title;
  }
  return title;
}

function addExperience(amount, reason = '') {
  state.xp += amount;
  showFloatingXp(`+${amount} XP ${reason}`);

  let needed = getXpForNextLevel(state.level);
  let leveledUp = false;

  while (state.xp >= needed) {
    state.xp -= needed;
    state.level += 1;
    needed = getXpForNextLevel(state.level);
    leveledUp = true;
  }

  if (leveledUp) {
    audio.playLevelUp();
    triggerHaptic([40, 60, 40, 60]);
    showFloatingXp(`Nivel ${state.level} • ${getRankTitle(state.level)}`);
  }

  saveState();
  updateHud();
}

function showFloatingXp(text) {
  const toast = document.createElement('div');
  toast.className = 'xp-toast';
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1400);
}

// --- 6. DAILY CHECKLIST & WORKOUT MECHANICS ---
function renderDailyView() {
  renderWeekStrip();
  renderDayOverview();
  renderDayChecklist();
  renderTodayWorkoutFeed();
}

function renderWeekStrip() {
  const strip = document.getElementById('dailyWeekStrip');
  if (!strip) return;
  strip.innerHTML = '';

  const activeKey = state.activeDayKey || 'mon';

  DAYS_OF_WEEK.forEach(day => {
    const dayData = state.dailySchedule ? state.dailySchedule[day.key] : null;
    const hasWorkout = dayData && !dayData.isRest && dayData.exercises && dayData.exercises.length > 0;
    
    // Check if all exercises are done
    let isCompleted = false;
    if (hasWorkout) {
      isCompleted = dayData.exercises.every(ex => ex.completed);
    }

    const pill = document.createElement('div');
    pill.className = `day-pill ${day.key === activeKey ? 'active' : ''} ${hasWorkout ? 'has-workout' : ''} ${isCompleted ? 'completed' : ''}`;
    pill.innerHTML = `
      <span class="day-pill-name">${day.short}</span>
      <span class="day-pill-status-dot"></span>
    `;

    pill.addEventListener('click', () => {
      triggerHaptic(10);
      state.activeDayKey = day.key;
      saveState();
      renderDailyView();
    });

    strip.appendChild(pill);
  });
}

function renderDayOverview() {
  const activeKey = state.activeDayKey || 'mon';
  const dayMeta = DAYS_OF_WEEK.find(d => d.key === activeKey) || DAYS_OF_WEEK[0];
  const dayData = state.dailySchedule ? state.dailySchedule[activeKey] : { title: 'Descanso', isRest: true, exercises: [] };

  const dayTagEl = document.getElementById('docDayTag');
  const titleEl = document.getElementById('docDayTitle');
  const scoreValEl = document.getElementById('docScoreVal');
  const fillEl = document.getElementById('docProgressFill');
  const statusTextEl = document.getElementById('docStatusText');
  const xpTagEl = document.getElementById('docXpTag');
  const bannerEl = document.getElementById('dayCompletedBanner');

  dayTagEl.textContent = `${dayMeta.name.toUpperCase()} • ${dayData.isRest ? 'RECUPERACIÓN' : 'ENTRENAMIENTO'}`;
  titleEl.textContent = dayData.title;

  if (dayData.isRest || !dayData.exercises || dayData.exercises.length === 0) {
    scoreValEl.textContent = '100%';
    fillEl.style.width = '100%';
    statusTextEl.textContent = 'Día de descanso programado';
    xpTagEl.textContent = 'Recuperación';
    bannerEl.style.display = 'none';
    return;
  }

  const total = dayData.exercises.length;
  const completed = dayData.exercises.filter(ex => ex.completed).length;
  const pct = Math.round((completed / total) * 100);

  scoreValEl.textContent = `${pct}%`;
  fillEl.style.width = `${pct}%`;
  statusTextEl.textContent = `${completed} de ${total} ejercicios completados`;
  xpTagEl.textContent = `+${completed * 50} XP ganada`;

  // Celebration banner if 100%
  if (completed === total && total > 0) {
    bannerEl.style.display = 'block';
  } else {
    bannerEl.style.display = 'none';
  }
}

function renderDayChecklist() {
  const container = document.getElementById('checklistContainer');
  if (!container) return;
  container.innerHTML = '';

  const activeKey = state.activeDayKey || 'mon';
  const dayData = state.dailySchedule ? state.dailySchedule[activeKey] : null;

  if (!dayData || dayData.isRest || !dayData.exercises || dayData.exercises.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 24px 10px;">
        Hoy es día de recuperación y descanso muscular.<br>
        Tus fibras crecen cuando descansas y duermes bien.
      </div>
    `;
    return;
  }

  dayData.exercises.forEach((ex, idx) => {
    const card = document.createElement('div');
    card.className = `check-item-card ${ex.completed ? 'completed' : ''}`;
    const muscleName = MUSCLE_DEFINITIONS[ex.muscle]?.name || ex.muscle;

    card.innerHTML = `
      <button class="custom-checkbox" aria-label="Tachar ejercicio">
        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </button>

      <div class="check-item-details">
        <span class="check-item-title">${ex.name}</span>
        <div class="check-item-meta">
          <span class="check-muscle-tag">${muscleName}</span>
          <span>${ex.sets} series × ${ex.reps} reps</span>
        </div>
      </div>

      <div class="check-item-actions">
        <button class="quick-weight-btn" title="Registrar peso">${ex.weightLogged ? ex.weightLogged + ' kg' : '+ Peso'}</button>
      </div>
    `;

    // Toggle Check / Tachar
    const checkbox = card.querySelector('.custom-checkbox');
    checkbox.addEventListener('click', () => {
      toggleExerciseCompletion(activeKey, idx);
    });

    // Quick weight button
    const weightBtn = card.querySelector('.quick-weight-btn');
    weightBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      promptExerciseWeight(activeKey, idx);
    });

    container.appendChild(card);
  });
}

function toggleExerciseCompletion(dayKey, exerciseIndex) {
  const dayData = state.dailySchedule[dayKey];
  if (!dayData || !dayData.exercises[exerciseIndex]) return;

  const ex = dayData.exercises[exerciseIndex];
  ex.completed = !ex.completed;

  if (ex.completed) {
    audio.playCheck();
    triggerHaptic([20, 35]);
    
    // Add sets to weekly muscle map
    state.currentWeekSets[ex.muscle] = (state.currentWeekSets[ex.muscle] || 0) + ex.sets;
    
    // Add to history feed
    state.history.push({
      id: Date.now() + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      dayKey,
      muscle: ex.muscle,
      exercise: ex.name,
      weight: ex.weightLogged || 0,
      reps: ex.reps,
      rir: '1'
    });

    addExperience(50, `• ${ex.name} completado`);

    // Check if entire day is complete for bonus
    const allDone = dayData.exercises.every(e => e.completed);
    if (allDone) {
      setTimeout(() => {
        audio.playLevelUp();
        triggerHaptic([40, 60, 40]);
        addExperience(150, '🎉 ¡Día completado al 100%!');
      }, 400);
    }
  } else {
    // Revert
    triggerHaptic(15);
    state.currentWeekSets[ex.muscle] = Math.max(0, (state.currentWeekSets[ex.muscle] || 0) - ex.sets);
    state.history = state.history.filter(h => h.exercise !== ex.name || h.dayKey !== dayKey);
    state.xp = Math.max(0, state.xp - 50);
  }

  saveState();
  renderAll();
}

function promptExerciseWeight(dayKey, exerciseIndex) {
  const ex = state.dailySchedule[dayKey].exercises[exerciseIndex];
  const current = ex.weightLogged || 50;
  const val = prompt(`Peso levantado en ${ex.name} (kg):`, current);
  if (val !== null) {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      ex.weightLogged = num;
      saveState();
      renderDayChecklist();
      showFloatingXp(`${num} kg guardados`);
    }
  }
}

function renderTodayWorkoutFeed() {
  const feed = document.getElementById('todayWorkoutFeed');
  const countEl = document.getElementById('todaySetsCountText');
  if (!feed) return;

  const activeKey = state.activeDayKey || 'mon';
  const todayHistory = (state.history || []).filter(h => h.dayKey === activeKey);

  countEl.textContent = `${todayHistory.length} series registradas`;

  if (todayHistory.length === 0) {
    feed.innerHTML = `<div class="empty-state">No hay series registradas en este día.<br>Tacha un ejercicio arriba o pulsa (+) para registrar.</div>`;
    return;
  }

  feed.innerHTML = '';
  [...todayHistory].reverse().forEach(item => {
    const el = document.createElement('div');
    el.className = 'workout-item';
    const muscleName = MUSCLE_DEFINITIONS[item.muscle]?.name || item.muscle;

    el.innerHTML = `
      <div class="wi-info">
        <strong>${item.exercise}</strong>
        <span>${muscleName}</span>
      </div>
      <div class="wi-metrics">
        <div>
          <span class="wi-tag">${item.weight > 0 ? item.weight + ' kg' : 'Completado'}</span>
        </div>
      </div>
    `;
    feed.appendChild(el);
  });
}

// --- 7. WEEKLY COMPARISON & HISTORICAL ARCHIVE ---
function renderWeeklyComparison() {
  const totalSetsEl = document.getElementById('wscTotalSets');
  const daysCompletedEl = document.getElementById('wscDaysCompleted');
  const complianceEl = document.getElementById('wscComplianceRate');
  const scoreTagEl = document.getElementById('wscScoreTag');

  let currentSets = 0;
  Object.values(state.currentWeekSets || {}).forEach(s => currentSets += s);
  totalSetsEl.textContent = currentSets;

  // Calculate completed days this week
  let completedDaysCount = 0;
  let plannedWorkoutDays = 0;

  if (state.dailySchedule) {
    Object.values(state.dailySchedule).forEach(day => {
      if (!day.isRest && day.exercises && day.exercises.length > 0) {
        plannedWorkoutDays++;
        if (day.exercises.every(ex => ex.completed)) {
          completedDaysCount++;
        }
      }
    });
  }

  const planned = plannedWorkoutDays || 4;
  daysCompletedEl.textContent = `${completedDaysCount}/${planned}`;

  const rate = Math.round((completedDaysCount / planned) * 100);
  complianceEl.textContent = `${rate}%`;

  if (rate >= 90) scoreTagEl.textContent = 'MÁXIMO';
  else if (rate >= 60) scoreTagEl.textContent = 'BUENO';
  else scoreTagEl.textContent = 'MODERADO';

  renderHistoryBarChart(currentSets);
  renderHistoryWeeksList();
}

function renderHistoryBarChart(currentSets) {
  const container = document.getElementById('historyBarsContainer');
  if (!container) return;
  container.innerHTML = '';

  const history = state.weeklyHistory || [];
  // Build a list of the last 4 data points (Past weeks + Current week)
  const chartData = [];
  
  if (history.length > 0) {
    history.slice(-3).forEach(w => {
      chartData.push({ label: `Sem ${w.weekNumber}`, sets: w.totalSets, isCurrent: false });
    });
  } else {
    chartData.push({ label: 'Sem 1', sets: 22, isCurrent: false });
    chartData.push({ label: 'Sem 2', sets: 38, isCurrent: false });
  }

  chartData.push({ label: 'Actual', sets: currentSets, isCurrent: true });

  const maxVal = Math.max(...chartData.map(d => d.sets), 40);

  chartData.forEach(d => {
    const col = document.createElement('div');
    col.className = `hcc-col ${d.isCurrent ? 'current' : ''}`;
    const hPct = Math.max(12, Math.round((d.sets / maxVal) * 100));

    col.innerHTML = `
      <span class="hcc-bar-val">${d.sets}</span>
      <div class="hcc-bar-stick" style="height: ${hPct}%;"></div>
      <span class="hcc-bar-label">${d.label}</span>
    `;
    container.appendChild(col);
  });
}

function renderHistoryWeeksList() {
  const list = document.getElementById('historyWeeksList');
  if (!list) return;

  const history = state.weeklyHistory || [];
  if (history.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        Aún no has archivado semanas anteriores.<br>
        Usa el botón de abajo para cargar ejemplos y ver la comparativa.
      </div>
    `;
    return;
  }

  list.innerHTML = '';
  [...history].reverse().forEach(w => {
    const card = document.createElement('div');
    card.className = 'hw-card';

    let badgeClass = 'mid';
    let badgeLabel = '⚡ Rendimiento Bueno';
    if (w.totalSets >= 40) {
      badgeClass = 'max';
      badgeLabel = '🏆 Rendimiento Máximo';
    } else if (w.totalSets < 25) {
      badgeLabel = '⚠️ Rendimiento Bajo';
    }

    card.innerHTML = `
      <div class="hw-top">
        <span class="hw-title">Semana ${w.weekNumber} (${w.dateRange})</span>
        <span class="hw-badge ${badgeClass}">${badgeLabel}</span>
      </div>
      <div class="hw-metrics">
        <span><strong>${w.totalSets}</strong> series totales</span>
        <span><strong>${w.daysCompleted}</strong> días cumplidos</span>
        <span><strong>${w.complianceRate}%</strong> adherencia</span>
      </div>
    `;
    list.appendChild(card);
  });
}

function archiveCurrentWeek() {
  if (!confirm('¿Deseas archivar esta semana en tu historial y comenzar una nueva?')) return;

  let totalSets = 0;
  Object.values(state.currentWeekSets || {}).forEach(s => totalSets += s);

  let completedDaysCount = 0;
  let planned = 0;
  if (state.dailySchedule) {
    Object.values(state.dailySchedule).forEach(d => {
      if (!d.isRest && d.exercises && d.exercises.length > 0) {
        planned++;
        if (d.exercises.every(e => e.completed)) completedDaysCount++;
      }
    });
  }

  const weekNum = (state.weeklyHistory ? state.weeklyHistory.length : 0) + 1;
  const now = new Date();
  const dateStr = `${now.getDate()} ${now.toLocaleDateString('es-ES', { month: 'short' })}`;

  const archiveItem = {
    weekNumber: weekNum,
    dateRange: dateStr,
    totalSets: totalSets,
    daysCompleted: `${completedDaysCount}/${planned || 4}`,
    complianceRate: Math.round((completedDaysCount / (planned || 4)) * 100),
    xp: state.xp
  };

  if (!state.weeklyHistory) state.weeklyHistory = [];
  state.weeklyHistory.push(archiveItem);

  // Reset weekly trackers for fresh week
  state.streakWeeks += 1;
  state.currentWeekSets = {};
  state.history = [];
  
  // Uncheck all exercises for the new week
  if (state.dailySchedule) {
    Object.values(state.dailySchedule).forEach(day => {
      if (day.exercises) {
        day.exercises.forEach(e => e.completed = false);
      }
    });
  }

  saveState();
  audio.playLevelUp();
  showFloatingXp('Semana archivada con éxito');
  renderAll();
}

function loadHistoryDemoData() {
  state.weeklyHistory = [
    { weekNumber: 1, dateRange: '15 Sep - 21 Sep', totalSets: 22, daysCompleted: '2/4', complianceRate: 50 },
    { weekNumber: 2, dateRange: '22 Sep - 28 Sep', totalSets: 34, daysCompleted: '3/4', complianceRate: 75 },
    { weekNumber: 3, dateRange: '29 Sep - 05 Oct', totalSets: 48, daysCompleted: '4/4', complianceRate: 100 },
    { weekNumber: 4, dateRange: '06 Oct - 12 Oct', totalSets: 42, daysCompleted: '4/4', complianceRate: 100 }
  ];
  saveState();
  triggerHaptic([30, 40]);
  showFloatingXp('Semanas históricas cargadas');
  renderWeeklyComparison();
}

// --- 8. ONBOARDING & SETUP ---
let tempOnboardingData = {
  hasRoutine: false,
  goal: 'hypertrophy',
  focus: 'glutes_legs',
  days: 4
};

function setupOnboarding() {
  const modal = document.getElementById('modalOnboarding');
  if (!state.userProfile || !state.userProfile.completed) {
    startOnboarding();
  }

  document.getElementById('btnRestartOnboarding').addEventListener('click', () => {
    closeBottomSheet(document.getElementById('modalSettings'));
    startOnboarding();
  });

  document.getElementById('hudPlanBadge').addEventListener('click', () => {
    startOnboarding();
  });
}

function startOnboarding() {
  const modal = document.getElementById('modalOnboarding');
  modal.style.display = 'flex';
  showObStep('obStep1', 20);

  document.querySelectorAll('#obStep1 .ob-choice-card').forEach(card => {
    card.onclick = () => {
      triggerHaptic(15);
      const choice = card.getAttribute('data-choice');
      if (choice === 'have_routine') {
        tempOnboardingData.hasRoutine = true;
        tempOnboardingData.planName = 'Seguimiento Libre';
        showSummaryStep();
      } else {
        tempOnboardingData.hasRoutine = false;
        showObStep('obStep2', 40);
      }
    };
  });

  document.querySelectorAll('#obStep2 .ob-chip-card').forEach(card => {
    card.onclick = () => {
      triggerHaptic(15);
      tempOnboardingData.goal = card.getAttribute('data-goal');
      showObStep('obStep3', 65);
    };
  });

  document.querySelectorAll('#obStep3 .ob-chip-card').forEach(card => {
    card.onclick = () => {
      triggerHaptic(15);
      tempOnboardingData.focus = card.getAttribute('data-focus');
      showObStep('obStep4', 85);
    };
  });

  document.querySelectorAll('#obStep4 .ob-choice-card').forEach(card => {
    card.onclick = () => {
      triggerHaptic(15);
      tempOnboardingData.days = parseInt(card.getAttribute('data-days'), 10) || 4;
      showSummaryStep();
    };
  });

  document.getElementById('btnFinishOnboarding').onclick = () => {
    triggerHaptic([30, 40]);
    state.userProfile = {
      completed: true,
      hasRoutine: tempOnboardingData.hasRoutine,
      goal: tempOnboardingData.goal,
      focus: tempOnboardingData.focus,
      days: tempOnboardingData.days,
      planName: tempOnboardingData.planName
    };

    // Regenerate daily schedule
    state.dailySchedule = generateWeeklySchedule(
      tempOnboardingData.focus,
      tempOnboardingData.days,
      tempOnboardingData.hasRoutine
    );

    saveState();
    modal.style.display = 'none';
    audio.playLevelUp();
    showFloatingXp('Rutina diaria configurada');
    renderAll();
  };
}

function showObStep(stepId, progressPct) {
  document.querySelectorAll('.ob-step').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(stepId);
  if (target) target.classList.add('active');
  const bar = document.getElementById('obProgressBar');
  if (bar) bar.style.width = `${progressPct}%`;
}

function showSummaryStep() {
  showObStep('obStepSummary', 100);

  const goalLabels = {
    hypertrophy: 'Ganar masa muscular',
    fat_loss: 'Rebajar / Perder grasa',
    weight_gain: 'Subir de peso',
    strength: 'Fuerza y rendimiento'
  };

  const focusLabels = {
    glutes_legs: 'Glúteos y Piernas',
    chest_arms: 'Pecho y Brazos',
    back_shoulders: 'Espalda y Hombros',
    full_body: 'Cuerpo Completo'
  };

  let planName = 'Seguimiento Libre';
  if (!tempOnboardingData.hasRoutine) {
    if (tempOnboardingData.focus === 'glutes_legs') planName = 'Escultor: Glúteos & Piernas';
    else if (tempOnboardingData.focus === 'chest_arms') planName = 'Titán: Pecho & Brazos';
    else if (tempOnboardingData.focus === 'back_shoulders') planName = 'Atlético: Espalda & V-Taper';
    else planName = 'Simetría: Cuerpo Completo';
  }
  tempOnboardingData.planName = planName;

  document.getElementById('obSummaryPlanName').textContent = planName;
  document.getElementById('obSumGoal').textContent = tempOnboardingData.hasRoutine ? 'Seguimiento libre' : goalLabels[tempOnboardingData.goal];
  document.getElementById('obSumFocus').textContent = tempOnboardingData.hasRoutine ? 'Todos los grupos' : focusLabels[tempOnboardingData.focus];
  document.getElementById('obSumDays').textContent = tempOnboardingData.hasRoutine ? 'A tu ritmo' : `${tempOnboardingData.days} días por semana`;
}

// --- 9. DOM INITIALIZATION & TAB SWITCHER ---
let activeSelectedMuscle = 'chest';

function initDom() {
  setupSvgInteractions();
  setupSegmentedToggle();
  setupBottomNav();
  setupModalHandlers();
  setupSettingsHandlers();
  setupShareStory();
  setupOnboarding();
  setupCustomExerciseModal();

  document.getElementById('btnArchiveCurrentWeek').addEventListener('click', archiveCurrentWeek);
  document.getElementById('btnLoadHistoryDemo').addEventListener('click', loadHistoryDemoData);

  renderAll();
}

function renderAll() {
  updateHud();
  renderDailyView();
  updateSvgBodyMap();
  updateThumbCarousel();
  updateMuscleInspector(activeSelectedMuscle);
  renderWeeklyComparison();
}

function updateHud() {
  const titleEl = document.getElementById('hudRankTitle');
  const streakEl = document.getElementById('hudStreak');
  const planText = document.getElementById('hudPlanText');
  const focusTag = document.getElementById('hudFocusTag');
  const questEl = document.getElementById('questProgress');

  const rank = getRankTitle(state.level);
  titleEl.textContent = `Nivel ${state.level} • ${rank}`;
  streakEl.textContent = `${state.streakWeeks} Sem 🔥`;

  const profile = state.userProfile || {};
  planText.textContent = profile.planName || 'Seguimiento';

  let optimalCount = 0;
  Object.keys(MUSCLE_DEFINITIONS).forEach(m => {
    const s = state.currentWeekSets[m] || 0;
    if (s >= 12) optimalCount++;
  });

  if (profile.hasRoutine) {
    focusTag.textContent = 'LIBRE';
    questEl.textContent = `Registradas ${optimalCount}/10 zonas óptimas en tu mapa`;
  } else {
    focusTag.textContent = profile.focus === 'glutes_legs' ? 'GLÚTEOS' : (profile.focus === 'chest_arms' ? 'PECHO' : 'ENFOQUE');
    questEl.textContent = `Meta: Tacha tus ejercicios diarios y llena el mapa (${optimalCount}/4 óptimos)`;
  }
}

function updateSvgBodyMap() {
  document.querySelectorAll('.muscle-part').forEach(el => {
    const muscle = el.getAttribute('data-muscle');
    if (!muscle) return;

    const sets = state.currentWeekSets[muscle] || 0;
    const volLvl = getVolumeLevel(sets);

    el.classList.remove('vol-0', 'vol-1', 'vol-2', 'vol-3', 'vol-4', 'vol-5');
    el.classList.add(`vol-${volLvl}`);

    if (muscle === activeSelectedMuscle) {
      el.classList.add('active-selection');
    } else {
      el.classList.remove('active-selection');
    }
  });
}

function updateThumbCarousel() {
  const container = document.getElementById('thumbMuscleScroller');
  if (!container) return;
  container.innerHTML = '';

  Object.entries(MUSCLE_DEFINITIONS).forEach(([k, def]) => {
    const sets = state.currentWeekSets[k] || 0;
    const volLvl = getVolumeLevel(sets);
    const color = getHexColorForLevel(volLvl);

    const chip = document.createElement('div');
    chip.className = `thumb-chip ${k === activeSelectedMuscle ? 'active' : ''}`;
    chip.innerHTML = `
      <span class="thumb-chip-dot" style="background: ${color};"></span>
      <span>${def.name}</span>
      <strong>${sets}s</strong>
    `;

    chip.addEventListener('click', () => {
      selectMuscle(k);
      chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });

    container.appendChild(chip);
  });
}

function selectMuscle(muscleKey) {
  if (!MUSCLE_DEFINITIONS[muscleKey]) return;
  activeSelectedMuscle = muscleKey;
  audio.playTone(360, 'sine', 0.05, 0.1);
  triggerHaptic(12);
  updateSvgBodyMap();
  updateThumbCarousel();
  updateMuscleInspector(muscleKey);
}

function updateMuscleInspector(muscleKey) {
  const def = MUSCLE_DEFINITIONS[muscleKey];
  if (!def) return;

  const sets = state.currentWeekSets[muscleKey] || 0;
  const volLvl = getVolumeLevel(sets);
  const tagInfo = getVolumeLabel(volLvl);

  document.getElementById('inspectorName').textContent = `${def.name} (${def.fullTitle})`;
  document.getElementById('inspectorVolumeText').textContent = `${sets} de 12-18 series semanales`;

  const statusTag = document.getElementById('inspectorStatusTag');
  statusTag.textContent = tagInfo.label;
  statusTag.className = `am-badge ${tagInfo.class}`;

  const adviceEl = document.getElementById('inspectorAdvice');
  if (sets === 0) {
    adviceEl.innerHTML = `Músculo en frío. Toca Registrar para iniciar.`;
  } else if (sets < 12) {
    const diff = 12 - sets;
    adviceEl.innerHTML = `Faltan <strong>${diff} series</strong> para el estímulo óptimo.`;
  } else if (sets <= 18) {
    adviceEl.innerHTML = `<strong>Estímulo óptimo alcanzado</strong> para esta semana.`;
  } else {
    adviceEl.innerHTML = `Volumen elevado. Considera priorizar otros grupos.`;
  }
}

function getHexColorForLevel(lvl) {
  switch (lvl) {
    case 0: return '#141417';
    case 1: return '#27272A';
    case 2: return '#52525B';
    case 3: return '#FFFFFF';
    case 4: return '#E4E4E7';
    default: return '#71717A';
  }
}

// --- 10. NAVIGATION, MODALS & CUSTOM EXERCISES ---
function setupBottomNav() {
  document.querySelectorAll('.mobile-bottom-nav .nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      if (tabId) {
        switchTab(tabId);
        triggerHaptic(10);
      }
    });
  });

  document.getElementById('btnFabLog').addEventListener('click', () => {
    triggerHaptic(15);
    openLogModal(activeSelectedMuscle);
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.mobile-tab-view').forEach(tab => {
    tab.classList.remove('active');
  });

  document.querySelectorAll('.mobile-bottom-nav .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  const targetTab = document.getElementById(tabId);
  if (targetTab) {
    targetTab.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (tabId === 'tabViewShare') {
      const canvas = document.getElementById('shareCanvas');
      if (canvas) generateStoryCanvas(canvas);
    } else if (tabId === 'tabViewWeeklyHistory') {
      renderWeeklyComparison();
    }
  }
}

function setupSegmentedToggle() {
  const frontBtn = document.getElementById('btnViewFront');
  const backBtn = document.getElementById('btnViewBack');
  const frontSvg = document.getElementById('svgBodyFront');
  const backSvg = document.getElementById('svgBodyBack');

  frontBtn.addEventListener('click', () => {
    frontBtn.classList.add('active');
    backBtn.classList.remove('active');
    frontSvg.style.display = 'block';
    backSvg.style.display = 'none';
    audio.playTone(380, 'sine', 0.04, 0.1);
    triggerHaptic(10);
  });

  backBtn.addEventListener('click', () => {
    backBtn.classList.add('active');
    frontBtn.classList.remove('active');
    frontSvg.style.display = 'none';
    backSvg.style.display = 'block';
    audio.playTone(380, 'sine', 0.04, 0.1);
    triggerHaptic(10);
  });
}

function setupSvgInteractions() {
  document.querySelectorAll('.muscle-part').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const muscle = el.getAttribute('data-muscle');
      if (muscle) selectMuscle(muscle);
    });
  });

  document.getElementById('btnInspectLog').addEventListener('click', () => {
    triggerHaptic(15);
    openLogModal(activeSelectedMuscle);
  });
}

function setupCustomExerciseModal() {
  const modal = document.getElementById('modalAddCustomEx');
  const openBtn = document.getElementById('btnAddCustomExercise');
  const closeBtn = document.getElementById('btnCloseAddCustomEx');
  const form = document.getElementById('formAddCustomEx');

  openBtn.addEventListener('click', () => {
    triggerHaptic(10);
    modal.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => closeBottomSheet(modal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeBottomSheet(modal);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const muscle = document.getElementById('customExMuscle').value;
    const name = document.getElementById('customExName').value.trim();
    const sets = parseInt(document.getElementById('customExSets').value, 10) || 3;
    const reps = parseInt(document.getElementById('customExReps').value, 10) || 10;

    const activeKey = state.activeDayKey || 'mon';
    if (!state.dailySchedule[activeKey]) {
      state.dailySchedule[activeKey] = { title: 'Día de Entrenamiento', isRest: false, exercises: [] };
    }
    state.dailySchedule[activeKey].isRest = false;

    state.dailySchedule[activeKey].exercises.push({
      id: 'custom_' + Date.now(),
      name,
      muscle,
      sets,
      reps,
      completed: false
    });

    saveState();
    closeBottomSheet(modal);
    form.reset();
    showFloatingXp('Ejercicio añadido al día');
    renderDailyView();
  });
}

function setupModalHandlers() {
  const modalLog = document.getElementById('modalLog');
  const closeBtn = document.getElementById('btnCloseLogModal');
  const selectMuscle = document.getElementById('selectMuscle');
  const inputExercise = document.getElementById('inputExercise');
  const form = document.getElementById('formLogSet');

  closeBtn.addEventListener('click', () => closeBottomSheet(modalLog));
  modalLog.addEventListener('click', (e) => {
    if (e.target === modalLog) closeBottomSheet(modalLog);
  });

  selectMuscle.addEventListener('change', () => {
    updateExercisePills(selectMuscle.value);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const muscle = selectMuscle.value;
    const exercise = inputExercise.value.trim() || 'Ejercicio';
    const weight = parseFloat(document.getElementById('inputWeight').value) || 0;
    const reps = parseInt(document.getElementById('inputReps').value, 10) || 10;
    const rir = document.getElementById('selectRir').value;

    recordSingleSet(muscle, exercise, weight, reps, rir);
    closeBottomSheet(modalLog);
  });
}

function openLogModal(muscleKey = 'chest') {
  const modalLog = document.getElementById('modalLog');
  const selectMuscle = document.getElementById('selectMuscle');
  selectMuscle.value = muscleKey;
  updateExercisePills(muscleKey);
  modalLog.style.display = 'flex';
}

function closeBottomSheet(sheetEl) {
  if (sheetEl) sheetEl.style.display = 'none';
}

function updateExercisePills(muscleKey) {
  const pillsContainer = document.getElementById('exerciseQuickPills');
  const inputExercise = document.getElementById('inputExercise');
  pillsContainer.innerHTML = '';

  const def = MUSCLE_DEFINITIONS[muscleKey];
  if (!def) return;

  inputExercise.value = def.exercises[0] || '';

  def.exercises.forEach((ex, idx) => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `ex-pill ${idx === 0 ? 'active' : ''}`;
    pill.textContent = ex;
    pill.addEventListener('click', () => {
      document.querySelectorAll('.ex-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      inputExercise.value = ex;
      triggerHaptic(10);
      audio.playTone(420, 'sine', 0.04, 0.1);
    });
    pillsContainer.appendChild(pill);
  });
}

function recordSingleSet(muscle, exercise, weight, reps, rir) {
  state.currentWeekSets[muscle] = (state.currentWeekSets[muscle] || 0) + 1;

  state.history.push({
    id: Date.now() + Math.random().toString(36).substr(2, 4),
    timestamp: new Date().toISOString(),
    dayKey: state.activeDayKey || 'mon',
    muscle,
    exercise,
    weight,
    reps,
    rir
  });

  audio.playCheck();
  triggerHaptic([20, 35]);
  addExperience(50, `• Serie de ${MUSCLE_DEFINITIONS[muscle]?.name}`);

  saveState();
  renderAll();
}

function setupSettingsHandlers() {
  const modalSettings = document.getElementById('modalSettings');
  const openBtn = document.getElementById('btnSettingsModal');
  const closeBtn = document.getElementById('btnCloseSettingsModal');

  openBtn.addEventListener('click', () => {
    triggerHaptic(10);
    modalSettings.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => closeBottomSheet(modalSettings));
  modalSettings.addEventListener('click', (e) => {
    if (e.target === modalSettings) closeBottomSheet(modalSettings);
  });

  const soundBtn = document.getElementById('btnSoundToggle');
  const soundIcon = document.getElementById('soundIcon');
  soundBtn.addEventListener('click', () => {
    audio.enabled = !audio.enabled;
    soundIcon.textContent = audio.enabled ? '🔊' : '🔇';
    triggerHaptic(12);
    showFloatingXp(audio.enabled ? 'Sonido activado' : 'Sonido silenciado');
  });

  document.getElementById('btnLoadDemo').addEventListener('click', () => {
    triggerHaptic([30, 40]);
    state.xp = 1450;
    state.level = 5;
    state.streakWeeks = 3;
    state.currentWeekSets = {
      chest: 14,
      back: 16,
      shoulders: 12,
      biceps: 10,
      triceps: 12,
      core: 8,
      quads: 14,
      hamstrings: 10,
      glutes: 14,
      calves: 6
    };
    saveState();
    closeBottomSheet(modalSettings);
    audio.playLevelUp();
    showFloatingXp('Datos demo cargados');
    renderAll();
  });

  document.getElementById('btnResetWeek').addEventListener('click', () => {
    archiveCurrentWeek();
  });

  document.getElementById('btnExportJson').addEventListener('click', () => {
    triggerHaptic(12);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `FORJA_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
  });

  document.getElementById('btnResetAll').addEventListener('click', () => {
    if (confirm('¿Restablecer todo el progreso?')) {
      triggerHaptic([40, 40]);
      localStorage.removeItem(STORAGE_KEY);
      state = JSON.parse(JSON.stringify(defaultState));
      saveState();
      closeBottomSheet(modalSettings);
      startOnboarding();
    }
  });
}

// --- 11. EDITORIAL STORY CANVAS EXPORTER ---
function setupShareStory() {
  const downloadBtn = document.getElementById('btnDownloadStory');
  const canvas = document.getElementById('shareCanvas');

  downloadBtn.addEventListener('click', () => {
    triggerHaptic(20);
    const imageUri = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = imageUri;
    a.download = `FORJA_Reporte_${new Date().toISOString().slice(0, 10)}.png`;
    a.click();
    showFloatingXp('Imagen descargada');
  });
}

function generateStoryCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  ctx.fillStyle = '#09090B';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.strokeRect(30, 30, W - 60, H - 60);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 20px -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('FORJA // REPORTE SEMANAL', 60, 85);

  const profile = state.userProfile || {};
  ctx.fillStyle = '#A1A1AA';
  ctx.font = '500 14px -apple-system, sans-serif';
  ctx.fillText((profile.planName || 'SEGUIMIENTO LIBRE').toUpperCase(), 60, 110);

  let totalSets = 0;
  let optimalCount = 0;
  Object.keys(MUSCLE_DEFINITIONS).forEach(k => {
    const s = state.currentWeekSets[k] || 0;
    totalSets += s;
    if (s >= 12) optimalCount++;
  });

  drawMinimalBox(ctx, 60, 145, 195, 80, 'TOTAL SERIES', `${totalSets}`);
  drawMinimalBox(ctx, 285, 145, 195, 80, 'ZONAS ÓPTIMAS', `${optimalCount}/10`);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.moveTo(60, 260);
  ctx.lineTo(W - 60, 260);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, sans-serif';
  ctx.fillText('BALANCE MUSCULAR', 60, 295);

  let curY = 330;
  const list = Object.entries(MUSCLE_DEFINITIONS);
  list.forEach(([k, def]) => {
    const s = state.currentWeekSets[k] || 0;

    ctx.fillStyle = s >= 12 ? '#FFFFFF' : '#A1A1AA';
    ctx.font = '500 15px -apple-system, sans-serif';
    ctx.fillText(def.name, 60, curY);

    ctx.textAlign = 'right';
    ctx.font = s >= 12 ? '700 15px -apple-system, sans-serif' : '500 15px -apple-system, sans-serif';
    ctx.fillText(`${s} series`, W - 60, curY);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#18181B';
    ctx.fillRect(60, curY + 8, W - 120, 6);

    const fillW = Math.min(W - 120, Math.round(((W - 120) * s) / 16));
    if (fillW > 0) {
      ctx.fillStyle = s >= 12 ? '#FFFFFF' : '#52525B';
      ctx.fillRect(60, curY + 8, fillW, 6);
    }

    curY += 46;
  });

  ctx.textAlign = 'center';
  ctx.fillStyle = '#71717A';
  ctx.font = '500 13px -apple-system, sans-serif';
  ctx.fillText(`DISCIPLINA & VOLUMEN • ${new Date().toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }).toUpperCase()}`, W / 2, 905);
}

function drawMinimalBox(ctx, x, y, w, h, label, val) {
  ctx.fillStyle = '#141417';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.fillRect(x, y, w, h);
  ctx.strokeRect(x, y, w, h);

  ctx.fillStyle = '#71717A';
  ctx.font = '600 12px -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(label, x + 16, y + 28);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 28px -apple-system, sans-serif';
  ctx.fillText(val, x + 16, y + 64);
}

// Service Worker (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('FORJA SW registrado:', reg.scope))
      .catch(err => console.log('FORJA SW error:', err));
  });
}

document.addEventListener('DOMContentLoaded', initDom);
