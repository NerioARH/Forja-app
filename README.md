# ⚔️ FORJA — Minimalist Fitness, Daily Tracker & Muscle Map

**FORJA** es una aplicación de entrenamiento fitness con estética minimalista monocromática (obsidiana, grises y blanco), diseñada para dos tipos de público: el que ya tiene su rutina y el que empieza desde cero.

---

## 🚀 Cómo abrir la aplicación

El servidor local está activo:
👉 **Abre en tu navegador:** [http://localhost:3000](http://localhost:3000)

*(O haz doble clic en `index.html` en Chrome, Edge o Safari en tu teléfono).*

---

## 💎 Novedades de esta Versión

### 1. 📐 Iconografía Vectorial Propia (Cero Emojis del Sistema)
* Eliminados **100% de los emojis del sistema** (Windows/iOS/Android).
* Sistema unificado de **28 iconos SVG vectoriales minimalistas** geométricos (trazo uniforme de 1.8px, diseño técnico y limpio en la barra inferior, encabezado, selector de rutinas y tarjetas de rendimiento).
* **Checklist interactivo con tachado:**
  * Al tocar la casilla, el ejercicio se tacha suavemente con animación.
  * Suena un chime táctil y vibra el teléfono (`navigator.vibrate`).
  * Suma **+50 XP** y añade las series automáticamente al mapa muscular.
* **Bono de Día Completo:** Al tachar el 100% de los ejercicios del día, se activa un banner de celebración con **+150 XP de bono diario** y el día se marca con punto blanco en la barra.
* **Añadir ejercicios al día:** Botón `+ Añadir Ejercicio` para agregar movimientos personalizados con sus series y repeticiones.

### 2. 📊 Resumen Semanal & Comparador Histórico de Semanas
* **Pestaña Semanas:**
  * Resumen de la semana actual: Series totales, días cumplidos (ej. `4/4`), tasa de adherencia y nivel de rendimiento (**MÁXIMO**, **BUENO**, **MODERADO**).
* **Gráfico comparativo de barras:**
  * Compara el volumen de series entre semanas pasadas y la semana actual para ver de un vistazo en cuáles has rendido más.
* **Historial de semanas:**
  * Muestra cada semana archivada con su insignia de rendimiento (🏆 Máximo, ⚡ Bueno, ⚠️ Bajo).
  * Botón para **archivar la semana actual** e iniciar una nueva con +1 a la racha.
  * Botón para **cargar 4 semanas de ejemplo** y probar el comparador inmediatamente.

### 3. 🗺️ Silueta Muscular Monocromática
* Mapa anatómico de frente y espalda en escala de calor minimalista:
  * De grafito mate (0 series) pasando por gris tenue hasta **blanco puro luminoso** (12-18 series óptimas).

### 4. 🧭 Asistente de Inicio (2 Públicos)
* **Público con rutina:** Elige *"Ya tengo mi rutina"* $\to$ modo Seguimiento Libre para tachar ejercicios y compartir.
* **Público sin rutina:** Elige *"Quiero que me armen una rutina"* $\to$ responde 4 preguntas (objetivo, zonas a mejorar como glúteos/pecho/espalda, días disponibles) y recibe su rutina diaria completa.

### 5. 📸 Tarjeta Editorial para Redes (9:16 Stories)
* Generador de imagen en alta resolución con estilo suizo minimalista listo para historias de Instagram y WhatsApp.
