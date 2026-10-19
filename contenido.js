// ============================================================
//  AQUÍ EDITES TOT EL CONTINGUT DEL CALENDARI
// ============================================================

const CONFIG = {
  nombre: "la\u00a0Jud",                 // apareix al títol
  anio: 2026,                       // any del calendari (s'obre al desembre d'aquell any)
  ordenAleatorio: true,           // true = casillas mezcladas (fijo); false = del 1 al 24
  mensajeFinal: "Has arribat al final, cuqui. El calendari només era una excusa per dir-te que t'estimo amb tota l'ànima. Gràcies per ser com ets. Bon dia normal! 🎄"
};

// tipus: "frase" | "acertijo" | "reto" | "sorpresa"
// Si és "acertijo", afegeix-hi el camp "respuesta" (es mostra en prémer un botó).
// Aquests 24 textos són exemples: canvieu-los pels vostres.
const DIAS = [
  { tipo: "frase",    titulo: "Que comenci el Nadal!",   texto: "Avui s'obre oficialment el Nadal! Sé que tu hi portes dies, però ara ja és de debò. Una casella cada dia, sense fer trampes (ja et conec). Que comenci la màgia! ✨" },
  { tipo: "acertijo", titulo: "Enigma de cinema",       texto: "Va caure del trineu de Santa Claus i només el senten els qui creuen de debò. Els adults que deixen de creure, ja no el senten. Què és?", respuesta: "El cascavell de Polar Express." },
  { tipo: "reto",     titulo: "Petit repte",             texto: "Avui, envia un missatge a algú amb qui fa temps que no parles." },
  { tipo: "acertijo", titulo: "Enigma Disney",           texto: "Estic fet de neu, m'encanten les abraçades càlides i, per estrany que sembli, somio amb l'estiu. Qui sóc?", respuesta: "L'Olaf, de Frozen." },
  { tipo: "frase",    titulo: "Per recordar",            texto: "Els petits gestos que fas cada dia, un somriure, molta paciència, una paraula a temps, són enormes per a qui els rep. Mai no ho dubtis." },
  { tipo: "sorpresa", titulo: "Sorpresa",                texto: "Avui et toca una abraçada ben llarga. La porto a domicili quan vulguis." },
  { tipo: "acertijo", titulo: "Enigma màgic",            texto: "Per anar cap a Hogwarts has de córrer decidida cap a una paret de maons, entre dues andanes. Quin número té aquesta andana?", respuesta: "L'andana 9¾." },
  { tipo: "reto",     titulo: "Petit repte",             texto: "Avui, posa la teva cançó preferida i escolta-la sencera, sense fer res més." },
  { tipo: "frase",    titulo: "Per recordar",            texto: "Ets més forta del que et dius a tu mateixa els dies dolents." },
  { tipo: "acertijo", titulo: "Enigma brillant",          texto: "Tinc agulles però no cuso. Em vesteixes de llums i boles i em planten al menjador. Què sóc?", respuesta: "L'arbre de Nadal." },
  { tipo: "sorpresa", titulo: "Sorpresa",                texto: "Val per una xocolata calenta estil Polar Express, servida amb tota la cerimònia. I sense cobrar-te el bitllet." },
  { tipo: "frase",    titulo: "Per recordar",            texto: "Tu que cuides tant la gent, deixa que aquest Nadal et cuidin una mica a tu, per variar." },
  { tipo: "acertijo", titulo: "Enigma de Nadal",         texto: "Té el cor dues talles massa petit i vol robar-te el Nadal, però acaba rient a taula amb tothom. Qui és?", respuesta: "El Grinch." },
  { tipo: "reto",     titulo: "Petit repte",             texto: "Surt a caminar 15 minuts sense mòbil. Mira al teu voltant com si fos la primera vegada." },
  { tipo: "frase",    titulo: "Per recordar",            texto: "Hi ha qui espera el Nadal i hi ha qui el porta a dins tot l'any. Tu ets d'aquestes, i es nota." },
  { tipo: "acertijo", titulo: "Enigma de Hogwarts",      texto: "Cada Nadal et teixeix un jersei de llana amb la teva inicial, i no hi ha qui li digui que no. Qui és?", respuesta: "La Molly Weasley." },
  { tipo: "sorpresa", titulo: "Sorpresa",                texto: "Val per una tarda de pel·li de Nadal amb manta i crispetes, a casa teva o a la meva. Tria tu: Polar Express, La gran família o la que vulguis." },
  { tipo: "reto",     titulo: "Petit repte",             texto: "Escriu tres coses bones que t'hagin passat aquesta setmana." },
  { tipo: "frase",    titulo: "Per recordar",            texto: "Tu veus la persona abans que res més. No tothom sap fer-ho, i tu ho fas sense ni adonar-te'n." },
  { tipo: "acertijo", titulo: "Enigma de cuina",         texto: "El dia de Sant Esteve ens trobaràs a taula: som pasta enrotllada, farcida amb la carn de l'escudella, banyada amb beixamel i gratinada. Què som?", respuesta: "Els canelons de Sant Esteve." },
  { tipo: "sorpresa", titulo: "Sorpresa",                texto: "Val per ser el teu pinxe de cuina el dia de fer l'escudella: jo pelo, tallo i rento els plats, i tu manes." },
  { tipo: "frase",    titulo: "Per recordar",            texto: "Quina sort tenir algú que et cuida, encara que no us ho digueu tota l'estona." },
  { tipo: "reto",     titulo: "Petit repte",             texto: "Avui, digues a la mare una cosa que li agraeixes de debò. Si pot ser en persona, millor." },
  { tipo: "sorpresa", titulo: "Nit de Nadal",            texto: "Gràcies per ser-hi. Avui, a gaudir de la taula i de la companyia. I aquesta nit tinc una última sorpresa per a tu: una carta escrita a mà. 🎄" }
];
