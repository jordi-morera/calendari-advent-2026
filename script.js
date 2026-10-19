(function () {
  "use strict";

  const TOTAL = 24;
  const ICONOS = { frase: "💬", acertijo: "🧩", reto: "⭐", sorpresa: "🎁" };

  // Modo prueba: añade ?dia=10 a la URL para simular que hoy es el día 10 de diciembre.
  // En modo prueba se usa un almacenamiento aparte, así no ensucias el calendario real.
  const params = new URLSearchParams(location.search);
  const diaForzado = params.get("dia");
  const modoPrueba = diaForzado !== null && /^\d+$/.test(diaForzado);
  const CLAVE = "adviento-" + CONFIG.anio + (modoPrueba ? "-prueba" : "");

  const $ = (id) => document.getElementById(id);
  const calendario = $("calendario");
  const modal = $("modal");
  const aviso = $("aviso");

  // ---------- Estado ----------
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

  // ---------- Fecha ----------
  // Devuelve hasta qué día de diciembre está desbloqueado (0 = aún no empieza).
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

  // ---------- Pintado ----------
  function pintarCabecera(limite) {
    $("titulo").textContent = "Calendario de Adviento de " + CONFIG.nombre;
    document.title = "Adviento de " + CONFIG.nombre;
    let texto;
    if (limite === 0) {
      const n = diasHastaInicio();
      texto = n === 1 ? "Empieza mañana. Paciencia 😉" : "Empieza el 1 de diciembre. Faltan " + n + " días.";
    } else if (limite >= TOTAL && !modoPrueba && new Date().getMonth() !== 11) {
      texto = "El calendario ya está completo.";
    } else {
      texto = "Hoy es " + limite + " de diciembre. Ya puedes abrir hasta esta casilla.";
    }
    if (modoPrueba) texto += " (modo prueba)";
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

    for (let n = 1; n <= TOTAL; n++) {
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
        b.setAttribute("aria-label", "Día " + n + ", abierto. Ver de nuevo.");
      } else if (estado === "futura") {
        const ico = document.createElement("span");
        ico.className = "icono";
        ico.textContent = "🔒";
        b.appendChild(ico);
        b.setAttribute("aria-label", "Día " + n + ", todavía bloqueado");
      } else {
        b.setAttribute("aria-label", "Día " + n + ", pulsa para abrir");
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

  // ---------- Interacción ----------
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
      mostrarAviso("Esta casilla se abre el " + n + " de diciembre. ¡Paciencia! 🎅");
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
    $("modal-dia").textContent = (ICONOS[dia.tipo] || "🎄") + "  " + n + " de diciembre";
    $("modal-titulo").textContent = dia.titulo || "";
    $("modal-texto").textContent = dia.texto || "";

    const btn = $("modal-respuesta-btn");
    const resp = $("modal-respuesta");
    resp.hidden = true;
    if (dia.respuesta) {
      resp.textContent = "Respuesta: " + dia.respuesta;
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

  // ---------- Nieve (decorativa, se desactiva con "reducir movimiento") ----------
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
