// ============================================================
//  AQUÍ EDITAS TODO EL CONTENIDO DEL CALENDARIO
// ============================================================

const CONFIG = {
  nombre: "Judith",                 // aparece en el título
  anio: 2026,                       // año del calendario (se abre en diciembre de ese año)
  mensajeFinal: "Has llegado al final del calendario. Gracias por abrir cada día. Feliz Navidad 🎄"
};

// tipo: "frase" | "acertijo" | "reto" | "sorpresa"
// Si es "acertijo", añade el campo "respuesta" (se muestra al pulsar un botón).
// Estos 24 textos son de ejemplo: cámbialos por los vuestros.
const DIAS = [
  { tipo: "frase",    titulo: "Empezamos",          texto: "Cada día cuenta, incluso los pequeños. Hoy toca empezar con calma." },
  { tipo: "acertijo", titulo: "Primer acertijo",    texto: "Tengo ciudades pero no casas, montañas pero no árboles, agua pero no peces. ¿Qué soy?", respuesta: "Un mapa." },
  { tipo: "reto",     titulo: "Mini reto",          texto: "Hoy, manda un mensaje a alguien con quien hace tiempo que no hablas." },
  { tipo: "acertijo", titulo: "Acertijo",           texto: "Cuanto más seca, más moja. ¿Qué es?", respuesta: "Una toalla." },
  { tipo: "frase",    titulo: "Para recordar",      texto: "No hace falta tenerlo todo claro para dar el siguiente paso." },
  { tipo: "sorpresa", titulo: "Sorpresa",           texto: "Hoy te toca un abrazo largo. Cobro a domicilio cuando quieras." },
  { tipo: "acertijo", titulo: "Acertijo",           texto: "Tiene dientes pero no muerde. ¿Qué es?", respuesta: "Un peine." },
  { tipo: "reto",     titulo: "Mini reto",          texto: "Hoy, pon tu canción favorita y escúchala entera, sin hacer nada más." },
  { tipo: "frase",    titulo: "Para recordar",      texto: "Eres más fuerte de lo que te dices a ti misma en los días malos." },
  { tipo: "acertijo", titulo: "Acertijo",           texto: "Tiene agujas pero no pincha, tiene números pero no calcula. ¿Qué es?", respuesta: "Un reloj." },
  { tipo: "sorpresa", titulo: "Sorpresa",           texto: "Cupón válido por un chocolate caliente invitado por mí." },
  { tipo: "frase",    titulo: "Para recordar",      texto: "Descansar también es avanzar." },
  { tipo: "acertijo", titulo: "Acertijo",           texto: "Cuanto más grande es, menos se ve. ¿Qué es?", respuesta: "La oscuridad." },
  { tipo: "reto",     titulo: "Mini reto",          texto: "Sal a caminar 15 minutos sin móvil. Mira alrededor como si fuera la primera vez." },
  { tipo: "frase",    titulo: "Para recordar",      texto: "Lo que sientes importa. Tómate en serio tus emociones, sin dramatizarlas." },
  { tipo: "acertijo", titulo: "Acertijo",           texto: "Si me nombras, desaparezco. ¿Qué soy?", respuesta: "El silencio." },
  { tipo: "sorpresa", titulo: "Sorpresa",           texto: "Cupón válido por una tarde de plan que elijas tú, sin discusión." },
  { tipo: "reto",     titulo: "Mini reto",          texto: "Escribe tres cosas buenas que te hayan pasado esta semana." },
  { tipo: "frase",    titulo: "Para recordar",      texto: "Las mejores historias empiezan con \"no sabía qué iba a pasar\"." },
  { tipo: "acertijo", titulo: "Acertijo",           texto: "Vuelo sin alas, lloro sin ojos. ¿Qué soy?", respuesta: "Una nube." },
  { tipo: "sorpresa", titulo: "Sorpresa",           texto: "Cupón válido por una cena hecha por mí. Tú eliges el menú." },
  { tipo: "frase",    titulo: "Para recordar",      texto: "Qué suerte tener a quien te cuida aunque no lo digáis todo el rato." },
  { tipo: "reto",     titulo: "Mini reto",          texto: "Cuéntale a alguien lo que más agradeces de él o ella. En persona o por mensaje." },
  { tipo: "frase",    titulo: "Nochebuena",         texto: "Gracias por estar. Hoy, a disfrutar de la mesa y de la gente. 🎄" }
];
