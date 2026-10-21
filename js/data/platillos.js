/**
 * ZG Group - Calculadora Nutricional / Calórica
 * Base de Datos de Platillos Regionales (v0.3.0)
 */

export const basePlatillos = [
  // --- MÉXICO (MX) ---
  {
    id: "mx-taco-al-pastor",
    nombre: "Taco al pastor",
    nombres_alternos: [{ texto: "taco de trompo", pais: "MX" }],
    pais: "MX",
    region: "Ciudad de México",
    categoria: "antojito",
    descripcion: "Taco de cerdo marinado con achiote, tortilla de maíz, piña, cebolla y cilantro.",
    porcion: { descripcion: "1 taco estándar con tortilla de maíz", gramos: 100 },
    nutricion: {
      kcal: { min: 130, tipico: 160, max: 200 },
      proteina_g: { min: 7, tipico: 9, max: 12 },
      grasa_g: { min: 5, tipico: 7, max: 11 },
      carbohidratos_g: { min: 14, tipico: 16, max: 20 }
    }
  },
  {
    id: "mx-pozole-rojo",
    nombre: "Pozole rojo con cerdo",
    nombres_alternos: [{ texto: "pozole", pais: "MX" }],
    pais: "MX",
    region: "Jalisco / Centro",
    categoria: "sopa_caldo",
    descripcion: "Caldo tradicional con maíz pozolero cacahuazintle y carne de cerdo deshebrada.",
    porcion: { descripcion: "1 plato hondo estándar", gramos: 350 },
    nutricion: {
      kcal: { min: 280, tipico: 350, max: 440 },
      proteina_g: { min: 18, tipico: 22, max: 28 },
      grasa_g: { min: 10, tipico: 14, max: 20 },
      carbohidratos_g: { min: 30, tipico: 36, max: 45 }
    }
  },
  {
    id: "mx-chilaquiles-verdes",
    nombre: "Chilaquiles verdes con pollo",
    nombres_alternos: [{ texto: "chilaquiles", pais: "MX" }],
    pais: "MX",
    categoria: "desayuno",
    descripcion: "Totopos de tortilla fritos en salsa verde, crema, queso fresco y pollo.",
    porcion: { descripcion: "1 porción regular en plato", gramos: 250 },
    nutricion: {
      kcal: { min: 380, tipico: 460, max: 560 },
      proteina_g: { min: 20, tipico: 25, max: 32 },
      grasa_g: { min: 18, tipico: 24, max: 32 },
      carbohidratos_g: { min: 35, tipico: 42, max: 50 }
    }
  },
  {
    id: "mx-tamal-verde",
    nombre: "Tamal verde con pollo",
    nombres_alternos: [{ texto: "tamal de pollo", pais: "MX" }],
    pais: "MX",
    categoria: "desayuno",
    descripcion: "Masa de maíz rellena de pollo con salsa verde, cocida en hoja de maíz.",
    porcion: { descripcion: "1 pieza mediana", gramos: 150 },
    nutricion: {
      kcal: { min: 280, tipico: 340, max: 410 },
      proteina_g: { min: 8, tipico: 11, max: 15 },
      grasa_g: { min: 12, tipico: 16, max: 22 },
      carbohidratos_g: { min: 35, tipico: 40, max: 48 }
    }
  },
  {
    id: "mx-enchiladas-rojas",
    nombre: "Enchiladas rojas de pollo",
    nombres_alternos: [{ texto: "enchiladas", pais: "MX" }],
    pais: "MX",
    categoria: "plato_fuerte",
    descripcion: "Tortillas pasadas por aceite y salsa roja de chile guajillo, rellenas de pollo con crema y queso.",
    porcion: { descripcion: "3 piezas (orden estándar)", gramos: 300 },
    nutricion: {
      kcal: { min: 420, tipico: 510, max: 620 },
      proteina_g: { min: 22, tipico: 28, max: 35 },
      grasa_g: { min: 18, tipico: 23, max: 30 },
      carbohidratos_g: { min: 40, tipico: 48, max: 58 }
    }
  },
  {
    id: "mx-quesadilla-chicharron",
    nombre: "Quesadilla de chicharrón prensado",
    nombres_alternos: [{ texto: "quesadilla frita", pais: "MX" }],
    pais: "MX",
    categoria: "antojito",
    descripcion: "Empanada de masa de maíz frita rellena de chicharrón prensado.",
    porcion: { descripcion: "1 pieza frita mediana", gramos: 120 },
    nutricion: {
      kcal: { min: 290, tipico: 360, max: 430 },
      proteina_g: { min: 9, tipico: 12, max: 16 },
      grasa_g: { min: 16, tipico: 22, max: 28 },
      carbohidratos_g: { min: 24, tipico: 28, max: 34 }
    }
  },
  {
    id: "mx-sopa-de-tortilla",
    nombre: "Sopa de tortilla (Aztlan)",
    nombres_alternos: [{ texto: "sopa azteca", pais: "MX" }],
    pais: "MX",
    categoria: "sopa_caldo",
    descripcion: "Caldo de jitomate con tiras de tortilla frita, aguacate, queso, crema y chile pasilla.",
    porcion: { descripcion: "1 plato hondo", gramos: 300 },
    nutricion: {
      kcal: { min: 250, tipico: 320, max: 400 },
      proteina_g: { min: 8, tipico: 11, max: 15 },
      grasa_g: { min: 12, tipico: 17, max: 24 },
      carbohidratos_g: { min: 26, tipico: 31, max: 38 }
    }
  },
  {
    id: "mx-mole-poblano-pollo",
    nombre: "Mole poblano con pollo y arroz",
    nombres_alternos: [{ texto: "mole con pollo", pais: "MX" }],
    pais: "MX",
    region: "Puebla",
    categoria: "plato_fuerte",
    descripcion: "Pieza de pollo bañada en salsa artesanal a base de chiles, frutos secos y cacao, acompañada de arroz.",
    porcion: { descripcion: "1 pieza de pollo con mole y arroz", gramos: 350 },
    nutricion: {
      kcal: { min: 480, tipico: 590, max: 720 },
      proteina_g: { min: 28, tipico: 34, max: 42 },
      grasa_g: { min: 20, tipico: 27, max: 36 },
      carbohidratos_g: { min: 45, tipico: 52, max: 62 }
    }
  },
  {
    id: "mx-pan-dulce-concha",
    nombre: "Concha de vainilla / chocolate",
    nombres_alternos: [{ texto: "concha", pais: "MX" }],
    pais: "MX",
    categoria: "pan_dulce_panaderia",
    descripcion: "Pan dulce tradicional fermentado con cobertura azucarada a base de mantequilla o manteca.",
    porcion: { descripcion: "1 pieza grande", gramos: 90 },
    nutricion: {
      kcal: { min: 270, tipico: 330, max: 390 },
      proteina_g: { min: 5, tipico: 7, max: 9 },
      grasa_g: { min: 10, tipico: 13, max: 18 },
      carbohidratos_g: { min: 42, tipico: 48, max: 56 }
    }
  },
  {
    id: "mx-agua-de-horchata",
    nombre: "Agua de horchata tradicional",
    nombres_alternos: [{ texto: "horchata", pais: "MX" }],
    pais: "MX",
    categoria: "bebida",
    descripcion: "Bebida dulce a base de harina de arroz, leche, canela y azúcar.",
    porcion: { descripcion: "1 vaso estándar (350 ml)", gramos: 350 },
    nutricion: {
      kcal: { min: 160, tipico: 210, max: 270 },
      proteina_g: { min: 1, tipico: 2, max: 4 },
      grasa_g: { min: 2, tipico: 3, max: 5 },
      carbohidratos_g: { min: 36, tipico: 44, max: 54 }
    }
  },

  // --- COLOMBIA (CO) ---
  {
    id: "co-bandeja-paisa",
    nombre: "Bandeja paisa",
    nombres_alternos: [{ texto: "bandeja antioqueña", pais: "CO" }],
    pais: "CO",
    region: "Antioquia",
    categoria: "plato_fuerte",
    descripcion: "Plato con frijoles, arroz, carne molida, chicharrón, chorizo, huevo frito, plátano, arepa y aguacate.",
    porcion: { descripcion: "1 bandeja completa", gramos: 600 },
    nutricion: {
      kcal: { min: 950, tipico: 1150, max: 1400 },
      proteina_g: { min: 35, tipico: 45, max: 58 },
      grasa_g: { min: 45, tipico: 60, max: 78 },
      carbohidratos_g: { min: 90, tipico: 110, max: 135 }
    }
  },
  {
    id: "co-arepa-con-queso",
    nombre: "Arepa con queso",
    nombres_alternos: [{ texto: "arepa rellena", pais: "CO" }],
    pais: "CO",
    categoria: "desayuno",
    descripcion: "Arepa de maíz rellena de queso fresco, asada a la plancha.",
    porcion: { descripcion: "1 pieza mediana", gramos: 120 },
    nutricion: {
      kcal: { min: 230, tipico: 270, max: 330 },
      proteina_g: { min: 8, tipico: 9, max: 12 },
      grasa_g: { min: 8, tipico: 11, max: 15 },
      carbohidratos_g: { min: 28, tipico: 32, max: 38 }
    }
  },
  {
    id: "co-ajiaco-bogotano",
    nombre: "Ajiaco santafereño",
    nombres_alternos: [{ texto: "ajiaco", pais: "CO" }],
    pais: "CO",
    region: "Bogotá",
    categoria: "sopa_caldo",
    descripcion: "Sopa densa de tres tipos de papas, pollo, mazorca, guascas, alcaparras y crema de leche.",
    porcion: { descripcion: "1 plato hondo", gramos: 400 },
    nutricion: {
      kcal: { min: 380, tipico: 460, max: 550 },
      proteina_g: { min: 22, tipico: 28, max: 35 },
      grasa_g: { min: 12, tipico: 16, max: 22 },
      carbohidratos_g: { min: 46, tipico: 52, max: 60 }
    }
  },

  // --- ARGENTINA (AR) ---
  {
    id: "ar-empanada-de-carne-horno",
    nombre: "Empanada de carne al horno",
    nombres_alternos: [{ texto: "empanada criolla", pais: "AR" }],
    pais: "AR",
    categoria: "snack",
    descripcion: "Empanada rellena de carne vacuna picada, cebolla, huevo duro y especias, cocida al horno.",
    porcion: { descripcion: "1 pieza al horno", gramos: 90 },
    nutricion: {
      kcal: { min: 200, tipico: 230, max: 290 },
      proteina_g: { min: 6, tipico: 8, max: 10 },
      grasa_g: { min: 9, tipico: 12, max: 16 },
      carbohidratos_g: { min: 18, tipico: 22, max: 26 }
    }
  },
  {
    id: "ar-milanesa-napolitana",
    nombre: "Milanesa a la napolitana con papas",
    nombres_alternos: [{ texto: "milanesa napolitana", pais: "AR" }],
    pais: "AR",
    categoria: "plato_fuerte",
    descripcion: "Milanesa de carne empanada cubierta con salsa de tomate, jamón, queso derretido y papas fritas.",
    porcion: { descripcion: "1 porción individual completa", gramos: 400 },
    nutricion: {
      kcal: { min: 650, tipico: 780, max: 920 },
      proteina_g: { min: 36, tipico: 44, max: 52 },
      grasa_g: { min: 32, tipico: 40, max: 50 },
      carbohidratos_g: { min: 50, tipico: 60, max: 72 }
    }
  },

  // --- ESPAÑA (ES) ---
  {
    id: "es-tortilla-de-patatas",
    nombre: "Tortilla de patatas tradicional",
    nombres_alternos: [{ texto: "tortilla española", pais: "ES" }],
    pais: "ES",
    categoria: "plato_fuerte",
    descripcion: "Tortilla cuajada a base de huevos, patatas pochadas en aceite de oliva y cebolla.",
    porcion: { descripcion: "1 pincho / rebanada grande", gramos: 180 },
    nutricion: {
      kcal: { min: 260, tipico: 320, max: 390 },
      proteina_g: { min: 8, tipico: 10, max: 14 },
      grasa_g: { min: 16, tipico: 20, max: 26 },
      carbohidratos_g: { min: 20, tipico: 25, max: 32 }
    }
  },

  // --- PERÚ (PE) ---
  {
    id: "pe-lomo-saltado",
    nombre: "Lomo saltado criollo",
    nombres_alternos: [{ texto: "lomo saltado", pais: "PE" }],
    pais: "PE",
    categoria: "plato_fuerte",
    descripcion: "Trozos de lomo de res salteados al wok con cebolla, tomate, ají amarillo, servido con arroz y papas fritas.",
    porcion: { descripcion: "1 plato completo", gramos: 380 },
    nutricion: {
      kcal: { min: 520, tipico: 620, max: 730 },
      proteina_g: { min: 28, tipico: 35, max: 42 },
      grasa_g: { min: 22, tipico: 28, max: 35 },
      carbohidratos_g: { min: 50, tipico: 58, max: 68 }
    }
  },
  {
    id: "pe-ceviche-pescado",
    nombre: "Ceviche de pescado peruano",
    nombres_alternos: [{ texto: "cebiche", pais: "PE" }],
    pais: "PE",
    categoria: "plato_fuerte",
    descripcion: "Trozos de pescado fresco marinados en jugo de limón, ají limo, cebolla morada, camote y choclo.",
    porcion: { descripcion: "1 plato con guarnición", gramos: 280 },
    nutricion: {
      kcal: { min: 210, tipico: 260, max: 320 },
      proteina_g: { min: 26, tipico: 32, max: 38 },
      grasa_g: { min: 3, tipico: 5, max: 8 },
      carbohidratos_g: { min: 18, tipico: 22, max: 28 }
    }
  }
];