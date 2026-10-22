/**
 * ZG Group - Base de alimentos y bebidas por grupo (v0.4.0)
 * Formato por fila: [nombre, porción, gramos_o_ml, kcal, proteína_g, grasa_g, carbohidratos_g]
 * El rango min/max se calcula con la variabilidad típica de cada grupo (var).
 * Filas con "S" al final: valores tomados del SMAE 4.ª ed. (Pérez Lizaur et al.) y escalados a la porción.
 * Resto: estimaciones propias, NO oficiales. Pendiente revisión por nutriólogo certificado.
 * En bebidas alcohólicas la kcal incluye el alcohol (7 kcal/g), por eso no cuadra con los macros.
 */
export const GRUPOS = {
  platillos:   { label: "Platillos y antojitos", var: 0.22 },
  sopas:       { label: "Sopas y caldos", var: 0.2 },
  frutas:      { label: "Frutas", var: 0.1 },
  verduras:    { label: "Verduras", var: 0.15 },
  cereales:    { label: "Tortilla, pan y cereales", var: 0.1 },
  pastas:      { label: "Pastas, arroz y papa", var: 0.15 },
  leguminosas: { label: "Leguminosas", var: 0.12 },
  lacteos:     { label: "Lácteos y huevo", var: 0.12 },
  proteinas:   { label: "Carnes, pescado y pollo", var: 0.18 },
  postres:     { label: "Postres y pan dulce", var: 0.2 },
  desayunos:   { label: "Desayunos (cafetería y restaurante)", var: 0.2 },
  comida_corrida: { label: "Comida corrida y cocina económica", var: 0.22 },
  tacos:       { label: "Tacos y antojitos de calle", var: 0.2 },
  restaurante: { label: "Menús de cadenas (Vips, Sanborns, Toks)", var: 0.25 },
  snacks:      { label: "Botanas y snacks", var: 0.12 },
  bebidas:     { label: "Bebidas (agua, café, jugos, refrescos)", var: 0.1 },
  licuados:    { label: "Licuados y malteadas", var: 0.2 },
  alcohol:     { label: "Alcohol y cocteles", var: 0.15 }
};

const DATOS = {
  frutas: [
    ["Manzana", "1 pieza mediana", 142, 84, 0.3, 0.5, 21.7, "S"], ["Plátano", "1 pieza mediana", 108, 96, 1.2, 0.4, 24.8, "S"],
    ["Naranja", "1 pieza", 155, 72, 1.1, 0.6, 18.3, "S"], ["Mango picado", "1 taza", 165, 58, 1.3, 0, 14.9, "S"],
    ["Papaya picada", "1 taza", 140, 55, 0.8, 0.1, 13.7, "S"], ["Sandía", "1 taza", 160, 48, 1, 0.2, 12.1, "S"],
    ["Fresas", "1 taza rebanadas", 166, 53, 1.1, 0.5, 12.7, "S"], ["Piña picada", "1 taza", 165, 83, 0.9, 0.1, 21.6, "S"],
    ["Aguacate", "⅓ de pieza", 31, 54, 0.7, 5.3, 2.1, "S"]
  ],
  verduras: [
    ["Ensalada mixta con aceite", "1 plato", 150, 90, 2, 7, 6], ["Nopales cocidos", "1 taza", 149, 22, 2, 0.1, 4.9, "S"],
    ["Brócoli cocido", "1 taza", 184, 52, 5.4, 0.8, 9.2, "S"], ["Calabacitas guisadas", "1 taza", 150, 60, 2, 3, 8],
    ["Jitomate", "1 pieza", 108, 19, 1, 0.2, 4.2, "S"], ["Zanahoria", "½ taza picada", 64, 26, 0.6, 0.2, 4.3, "S"],
    ["Esquites con mayonesa y queso", "1 vaso", 200, 230, 6, 11, 28], ["Elote con mayonesa y queso", "1 pieza", 250, 300, 8, 12, 40]
  ],
  cereales: [
    ["Tortilla de maíz", "1 pieza", 30, 64, 1.4, 0.5, 13.6, "S"], ["Tortilla de harina", "1 pieza chica", 28, 80, 1.9, 1.9, 13.4, "S"],
    ["Bolillo", "1 pieza", 60, 183, 5.7, 0.1, 38.4, "S"], ["Pan de caja", "1 rebanada", 27, 71, 2.2, 0.8, 13.6, "S"],
    ["Avena cocida con agua", "1 taza", 219, 88, 6.9, 1.8, 25.1, "S"], ["Hot cakes con miel", "2 piezas", 150, 330, 6, 8, 58]
  ],
  pastas: [
    ["Arroz blanco cocido", "1 taza", 188, 240, 4.4, 0.4, 53, "S"], ["Arroz rojo mexicano", "1 taza", 180, 260, 5, 8, 42],
    ["Espagueti cocido", "1 taza", 138, 171, 7.5, 0.6, 37, "S"], ["Sopa de fideo seca", "1 plato", 200, 230, 6, 8, 34],
    ["Papa cocida", "1 pieza", 136, 118, 2.6, 0.2, 27.4, "S"], ["Papas fritas", "1 porción", 100, 312, 3, 15, 41]
  ],
  leguminosas: [
    ["Frijoles de la olla", "½ taza", 86, 114, 7.6, 0.5, 20.4, "S"], ["Frijoles refritos", "½ taza", 130, 150, 7, 6, 19],
    ["Lentejas cocidas", "1 taza", 198, 230, 18, 0.8, 40, "S"], ["Garbanzos cocidos", "½ taza", 82, 135, 7.3, 2.1, 22.5, "S"]
  ],
  lacteos: [
    ["Leche entera", "1 taza (240 ml)", 240, 148, 7.9, 8, 11.2, "S"], ["Leche descremada", "1 taza (245 ml)", 245, 86, 8.4, 0.4, 11.9, "S"],
    ["Yogur natural", "1 taza", 200, 120, 7, 6, 9], ["Queso fresco", "40 g", 40, 58, 6.1, 2.8, 2, "S"],
    ["Queso Oaxaca", "30 g", 30, 95, 7.7, 6.6, 0.9, "S"], ["Huevo cocido", "1 pieza", 44, 68, 5.5, 4.7, 0.5, "S"],
    ["Huevos revueltos", "2 piezas", 120, 200, 13.4, 14.6, 2.6, "S"], ["Huevos a la mexicana", "2 piezas", 180, 230, 14, 17, 6]
  ],
  proteinas: [
    ["Pechuga de pollo a la plancha", "120 g", 120, 200, 37, 5, 0], ["Bistec de res", "120 g", 120, 250, 30, 14, 0],
    ["Carne asada", "150 g", 150, 330, 38, 19, 0], ["Filete de pescado", "150 g", 150, 190, 32, 6, 0],
    ["Atún en agua", "1 lata (drenada)", 99, 117, 25.5, 0.9, 0, "S"], ["Carnitas", "100 g", 100, 270, 22, 20, 0],
    ["Milanesa de pollo empanizada", "1 pieza", 150, 330, 28, 16, 18]
  ],
  sopas: [
    ["Sopa de verduras", "1 plato", 300, 120, 4, 3, 20], ["Caldo de pollo con verduras", "1 plato", 350, 150, 14, 5, 12],
    ["Crema de verduras", "1 plato", 300, 180, 5, 9, 20]
  ],
  postres: [
    ["Flan", "1 rebanada", 120, 175, 5.5, 4.9, 27.3, "S"], ["Pastel de chocolate", "1 rebanada", 100, 371, 5.4, 15, 53, "S"],
    ["Helado de vainilla", "1 bola", 70, 141, 2.5, 7.7, 16.5, "S"], ["Gelatina", "1 vaso", 120, 75, 1.5, 0, 17, "S"],
    ["Arroz con leche", "1 taza", 200, 280, 6, 7, 48], ["Churro", "1 pieza", 50, 200, 2, 11, 23],
    ["Galletas Marías", "4 piezas", 28, 102, 1.9, 1.9, 20.1, "S"], ["Paleta de hielo de agua", "1 pieza", 60, 60, 0, 0, 15]
  ],
  snacks: [
    ["Papitas fritas de bolsa", "1 bolsa chica", 45, 240, 3, 15, 24], ["Cacahuates", "30 g", 30, 183, 7.3, 15.5, 6.8, "S"],
    ["Palomitas naturales", "3 tazas", 22, 84, 4.2, 0, 16.8, "S"], ["Barra de granola", "1 pieza", 30, 130, 2, 5, 20]
  ],
  bebidas: [
    ["Agua natural", "1 vaso (350 ml)", 350, 0, 0, 0, 0], ["Café negro sin azúcar", "1 taza", 240, 5, 0.3, 0, 0.9, "S"],
    ["Café con leche y 1 cdta de azúcar", "1 taza", 240, 90, 4, 4, 9], ["Té sin azúcar", "1 taza", 240, 0, 0, 0, 0],
    ["Agua de jamaica sin azúcar", "1 vaso (350 ml)", 350, 5, 0, 0, 1], ["Agua de jamaica con azúcar", "1 vaso (350 ml)", 350, 110, 0, 0, 28],
    ["Agua de limón con azúcar", "1 vaso (350 ml)", 350, 100, 0, 0, 26], ["Jugo de naranja natural", "1 vaso (240 ml)", 240, 110, 2, 0.5, 26],
    ["Agua de coco", "1 envase (330 ml)", 330, 60, 1, 0.6, 15.5, "S"], ["Refresco de cola", "1 lata (355 ml)", 355, 147, 0, 0, 37.4, "S"],
    ["Refresco de cola sin azúcar", "1 lata (355 ml)", 355, 1, 0, 0, 0.1, "S"], ["Jugo o néctar envasado", "1 caja (250 ml)", 250, 120, 0, 0, 30],
    ["Bebida deportiva", "1 botella (500 ml)", 500, 120, 0, 0, 30], ["Champurrado", "1 taza", 250, 190, 5, 5, 32],
    ["Chocolate caliente con leche", "1 taza", 250, 230, 8, 9, 30]
  ],
  licuados: [
    ["Licuado de plátano con leche", "1 vaso (400 ml)", 400, 280, 10, 6, 48], ["Licuado de avena", "1 vaso (400 ml)", 400, 300, 11, 7, 48],
    ["Malteada de chocolate", "1 vaso (400 ml)", 400, 450, 10, 16, 65], ["Smoothie de fresa con yogur", "1 vaso (350 ml)", 350, 220, 7, 3, 43]
  ],
  alcohol: [
    ["Cerveza clara", "1 lata (355 ml)", 356, 153, 1.5, 0, 13, "S"], ["Vino tinto", "1 copa (150 ml)", 150, 128, 0, 0, 4, "S"],
    ["Tequila o mezcal", "1 caballito (45 ml)", 45, 119, 0, 0, 0, "S"], ["Michelada", "1 vaso (500 ml)", 500, 200, 1, 0, 15],
    ["Margarita", "1 copa (240 ml)", 240, 280, 0, 0, 30], ["Piña colada", "1 vaso (240 ml)", 240, 380, 1, 9, 50],
    ["Cuba libre", "1 vaso (300 ml)", 300, 190, 0, 0, 20]
  ]
};

const slug = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const construir = datos => Object.entries(datos).flatMap(([grupo, filas]) =>
  filas.map(([nombre, porcion, gramos, kcal, prot, grasa, carb, src]) => {
    const v = GRUPOS[grupo].var;
    return { id: `mx-${grupo}-${slug(nombre)}`, nombre, pais: "MX", grupo, desc: "", porcion, gramos,
      fuente: src === "S" ? "SMAE 4a ed." : "estimado", kcal, kcalMin: Math.round(kcal * (1 - v)), kcalMax: Math.round(kcal * (1 + v)), prot, grasa, carb };
  })
);

export const alimentosBase = construir(DATOS);
