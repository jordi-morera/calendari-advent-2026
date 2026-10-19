(function () {
  "use strict";

  const TOTAL = 24;

  // Orden de las casillas: mezclado pero fijo (siempre el mismo para el mismo año),
  // así hay que buscar cada número, pero no cambia de sitio al recargar.
  // Para volver al orden normal: ordenAleatorio: false en contenido.js.
  function crearOrden() {
    const orden = Array.from({ length: TOTAL }, (_, i) => i + 1);
    if (CONFIG.ordenAleatorio === false) return orden;
    let semilla = (CONFIG.anio * 2654435761) >>> 0;
    const azar = () => {                       // mulberry32: generador con semilla
      semilla = (semilla + 0x6D2B79F5) >>> 0;
      let t = semilla;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    for (let i = orden.length - 1; i > 0; i--) {
      const j = Math.floor(azar() * (i + 1));
      [orden[i], orden[j]] = [orden[j], orden[i]];
    }
    return orden;
  }
  const ORDEN = crearOrden();
  const ICONOS = { frase: "💬", acertijo: "🧩", reto: "⭐", sorpresa: "🎁" };

  // Mode de prova: afegeix ?dia=10 a l'URL per simular que avui és 10 de desembre.
  // En mode de prova s'utilitza un emmagatzematge separat per no alterar el calendari real.
  const params = new URLSearchParams(location.search);
  const diaForzado = params.get("dia");
  const modoPrueba = diaForzado !== null && /^\d+$/.test(diaForzado);
  const CLAVE = "adviento-" + CONFIG.anio + (modoPrueba ? "-prueba" : "");

  const $ = (id) => document.getElementById(id);
  const calendario = $("calendario");
  const modal = $("modal");
  const aviso = $("aviso");

  // ---------- Estat ----------
  function leerAbiertos() {
    try {
      const datos = JSON.parse(localStorage.getItem(CLAVE) || "[]");
      return Array.isArray(datos) ? datos : [];
    } catch (e) { return []; }
  }
  function guardarAbiertos(lista) {
    try { localStorage.setItem(CLAVE, JSON.stringify(lista)); } catch (e) { /* sin almacenamiento */ }
  }
  let abiertos = leerAbiertos();

  // ---------- Data ----------
  // Retorna fins a quin dia de desembre està desbloquejat (0 = encara no ha començat).
  function diaDesbloqueado() {
    if (modoPrueba) return Math.min(parseInt(diaForzado, 10), TOTAL);
    const hoy = new Date();
    const y = hoy.getFullYear(), m = hoy.getMonth(), d = hoy.getDate();
    if (y < CONFIG.anio || (y === CONFIG.anio && m < 11)) return 0;
    if (y === CONFIG.anio && m === 11) return Math.min(d, TOTAL);
    return TOTAL;
  }

  function diasHastaInicio() {
    const hoy = new Date();
    const inicio = new Date(CONFIG.anio, 11, 1);
    const hoy0 = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    return Math.round((inicio - hoy0) / 86400000);
  }

  // ---------- Renderització ----------
  function pintarCabecera(limite) {
    $("titulo").textContent = "Calendari d'Advent de " + CONFIG.nombre;
    document.title = "Advent de " + CONFIG.nombre;
    let texto;
    if (limite === 0) {
      const n = diasHastaInicio();
      texto = n === 1 ? "Comença demà. Paciència 😉" : "Comença l'1 de desembre. Falten " + n + " dies.";
    } else if (limite >= TOTAL && !modoPrueba && new Date().getMonth() !== 11) {
      texto = "El calendari ja està complet.";
    } else {
      texto = "Avui és " + limite + " de desembre. Ja pots obrir fins a aquesta casella.";
    }
    if (modoPrueba) texto += " (mode de prova)";
    $("estado").textContent = texto;
  }

  function claseCasilla(n, limite) {
    if (abiertos.includes(n)) return "abierta";
    if (n > limite) return "futura";
    if (n === limite) return "hoy";
    return "disponible";
  }

  function pintar() {
    const limite = diaDesbloqueado();
    pintarCabecera(limite);
    calendario.innerHTML = "";

    for (const n of ORDEN) {
      const dia = DIAS[n - 1];
      const estado = claseCasilla(n, limite);
      const b = document.createElement("button");
      b.type = "button";
      b.className = "casilla " + estado;
      b.dataset.dia = n;

      const num = document.createElement("span");
      num.className = "numero";
      num.textContent = n;
      b.appendChild(num);

      if (estado === "abierta") {
        const ico = document.createElement("span");
        ico.className = "icono";
        ico.textContent = ICONOS[dia.tipo] || "🎄";
        b.appendChild(ico);
        b.setAttribute("aria-label", "Dia " + n + ", obert. Torna'l a veure.");
      } else if (estado === "futura") {
        const ico = document.createElement("span");
        ico.className = "icono";
        ico.textContent = "🔒";
        b.appendChild(ico);
        b.setAttribute("aria-label", "Dia " + n + ", encara bloquejat");
      } else {
        b.setAttribute("aria-label", "Dia " + n + ", prem per obrir");
      }

      b.addEventListener("click", () => alPulsar(n, b));
      calendario.appendChild(b);
    }

    const final = $("final");
    if (abiertos.length >= TOTAL) {
      final.textContent = CONFIG.mensajeFinal;
      final.hidden = false;
    } else {
      final.hidden = true;
    }
  }

  // ---------- Interacció ----------
  let avisoTimer;
  function mostrarAviso(texto) {
    aviso.textContent = texto;
    aviso.classList.add("visible");
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(() => aviso.classList.remove("visible"), 2600);
  }

  function alPulsar(n, boton) {
    const limite = diaDesbloqueado();
    if (n > limite) {
      boton.classList.remove("temblor");
      void boton.offsetWidth; // reinicia la animación
      boton.classList.add("temblor");
      mostrarAviso("Aquesta casella s'obre el " + n + " de desembre. Paciència! 🎅");
      return;
    }
    if (!abiertos.includes(n)) {
      abiertos.push(n);
      guardarAbiertos(abiertos);
    }
    abrirModal(n);
    pintar();
  }

  function abrirModal(n) {
    const dia = DIAS[n - 1];
    $("modal-dia").textContent = (ICONOS[dia.tipo] || "🎄") + "  " + n + " de desembre";
    $("modal-titulo").textContent = dia.titulo || "";
    $("modal-texto").textContent = dia.texto || "";

    const btn = $("modal-respuesta-btn");
    const resp = $("modal-respuesta");
    resp.hidden = true;
    if (dia.respuesta) {
      resp.textContent = "Resposta: " + dia.respuesta;
      btn.hidden = false;
      btn.onclick = () => { resp.hidden = false; btn.hidden = true; };
    } else {
      btn.hidden = true;
    }

    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  }

  function cerrarModal() {
    if (typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
  }

  $("modal-cerrar").addEventListener("click", cerrarModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) cerrarModal(); });

  // ---------- Neu (decorativa, es desactiva amb «reduir el moviment») ----------
  function nieve() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cont = document.querySelector(".nieve");
    for (let i = 0; i < 28; i++) {
      const c = document.createElement("span");
      c.textContent = "❄";
      c.style.left = Math.random() * 100 + "vw";
      c.style.fontSize = 10 + Math.random() * 14 + "px";
      c.style.animationDuration = 9 + Math.random() * 12 + "s";
      c.style.animationDelay = -Math.random() * 20 + "s";
      c.style.opacity = 0.25 + Math.random() * 0.5;
      cont.appendChild(c);
    }
  }

  pintar();
  nieve();
})();
