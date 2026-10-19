// ============================================================
//  AQUÍ EDITES TOT EL CONTINGUT DEL CALENDARI
// ============================================================

const CONFIG = {
  nombre: "Judith",                 // apareix al títol
  anio: 2026,                       // any del calendari (s'obre al desembre d'aquell any)
  mensajeFinal: "Has arribat al final del calendari. Gràcies per obrir cada dia. Bon Nadal 🎄"
};

// tipus: "frase" | "acertijo" | "reto" | "sorpresa"
// Si és "acertijo", afegeix-hi el camp "respuesta" (es mostra en prémer un botó).
// Aquests 24 textos són exemples: canvieu-los pels vostres.
const DIAS = [
  { tipo: "frase",    titulo: "Comencem",               texto: "Cada dia compta, fins i tot els més petits. Avui toca començar amb calma." },
  { tipo: "acertijo", titulo: "Primer enigma",          texto: "Tinc ciutats però no cases, muntanyes però no arbres, aigua però no peixos. Què soc?", respuesta: "Un mapa." },
  { tipo: "reto",     titulo: "Petit repte",             texto: "Avui, envia un missatge a algú amb qui fa temps que no parles." },
  { tipo: "acertijo", titulo: "Enigma",                  texto: "Com més eixuga, més es mulla. Què és?", respuesta: "Una tovallola." },
  { tipo: "frase",    titulo: "Per recordar",            texto: "No cal tenir-ho tot clar per fer el pas següent." },
  { tipo: "sorpresa", titulo: "Sorpresa",                texto: "Avui et toca una abraçada ben llarga. La porto a domicili quan vulguis." },
  { tipo: "acertijo", titulo: "Enigma",                  texto: "Té dents però no mossega. Què és?", respuesta: "Una pinta." },
  { tipo: "reto",     titulo: "Petit repte",             texto: "Avui, posa la teva cançó preferida i escolta-la sencera, sense fer res més." },
  { tipo: "frase",    titulo: "Per recordar",            texto: "Ets més forta del que et dius a tu mateixa els dies dolents." },
  { tipo: "acertijo", titulo: "Enigma",                  texto: "Té agulles però no punxa, té números però no calcula. Què és?", respuesta: "Un rellotge." },
  { tipo: "sorpresa", titulo: "Sorpresa",                texto: "Val per una tassa de xocolata calenta que et convido jo." },
  { tipo: "frase",    titulo: "Per recordar",            texto: "Descansar també és avançar." },
  { tipo: "acertijo", titulo: "Enigma",                  texto: "Com més gran és, menys es veu. Què és?", respuesta: "La foscor." },
  { tipo: "reto",     titulo: "Petit repte",             texto: "Surt a caminar 15 minuts sense mòbil. Mira al teu voltant com si fos la primera vegada." },
  { tipo: "frase",    titulo: "Per recordar",            texto: "El que sents importa. Pren-te seriosament les emocions, sense dramatitzar-les." },
  { tipo: "acertijo", titulo: "Enigma",                  texto: "Si em dius, desaparec. Què soc?", respuesta: "El silenci." },
  { tipo: "sorpresa", titulo: "Sorpresa",                texto: "Val per una tarda de plans que triïs tu, sense discutir-ho." },
  { tipo: "reto",     titulo: "Petit repte",             texto: "Escriu tres coses bones que t'hagin passat aquesta setmana." },
  { tipo: "frase",    titulo: "Per recordar",            texto: "Les millors històries comencen amb «no sabia què passaria»." },
  { tipo: "acertijo", titulo: "Enigma",                  texto: "Volo sense ales, ploro sense ulls. Què soc?", respuesta: "Un núvol." },
  { tipo: "sorpresa", titulo: "Sorpresa",                texto: "Val per un sopar fet per mi. Tu tries el menú." },
  { tipo: "frase",    titulo: "Per recordar",            texto: "Quina sort tenir algú que et cuida, encara que no us ho digueu tota l'estona." },
  { tipo: "reto",     titulo: "Petit repte",             texto: "Explica a algú què és el que més li agraeixes. En persona o per missatge." },
  { tipo: "frase",    titulo: "Nit de Nadal",             texto: "Gràcies per ser-hi. Avui, a gaudir de la taula i de la companyia. 🎄" }
];
