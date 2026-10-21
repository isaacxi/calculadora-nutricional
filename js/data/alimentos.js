/**
 * ZG Group - Base de alimentos y bebidas por grupo (v0.4.0)
 * Formato por fila: [nombre, porción, gramos_o_ml, kcal, proteína_g, grasa_g, carbohidratos_g]
 * El rango min/max se calcula con la variabilidad típica de cada grupo (var).
 * Valores aproximados (SMAE / USDA). Pendiente revisión por nutriólogo certificado.
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
    ["Manzana", "1 pieza mediana", 150, 80, 0.4, 0.2, 21], ["Plátano", "1 pieza mediana", 120, 105, 1.3, 0.4, 27],
    ["Naranja", "1 pieza", 130, 62, 1.2, 0.2, 15], ["Mango picado", "1 taza", 165, 100, 1.4, 0.6, 25],
    ["Papaya picada", "1 taza", 150, 60, 0.9, 0.3, 15], ["Sandía", "1 taza", 150, 46, 0.9, 0.2, 12],
    ["Fresas", "1 taza", 150, 48, 1, 0.5, 11], ["Piña picada", "1 taza", 165, 82, 0.9, 0.2, 22],
    ["Aguacate", "½ pieza", 100, 160, 2, 15, 9]
  ],
  verduras: [
    ["Ensalada mixta con aceite", "1 plato", 150, 90, 2, 7, 6], ["Nopales cocidos", "1 taza", 150, 25, 2, 0.1, 5],
    ["Brócoli cocido", "1 taza", 150, 52, 4, 0.6, 10], ["Calabacitas guisadas", "1 taza", 150, 60, 2, 3, 8],
    ["Jitomate", "1 pieza", 120, 22, 1, 0.2, 5], ["Zanahoria", "1 pieza", 80, 33, 0.8, 0.2, 8],
    ["Esquites con mayonesa y queso", "1 vaso", 200, 230, 6, 11, 28], ["Elote con mayonesa y queso", "1 pieza", 250, 300, 8, 12, 40]
  ],
  cereales: [
    ["Tortilla de maíz", "1 pieza", 30, 64, 1.5, 0.7, 13.5], ["Tortilla de harina", "1 pieza", 40, 130, 3, 3.5, 21],
    ["Bolillo", "1 pieza", 60, 170, 5, 1, 34], ["Pan de caja", "1 rebanada", 28, 75, 2.5, 1, 14],
    ["Avena cocida con agua", "1 taza", 240, 160, 6, 3, 28], ["Hot cakes con miel", "2 piezas", 150, 330, 6, 8, 58]
  ],
  pastas: [
    ["Arroz blanco cocido", "1 taza", 160, 205, 4, 0.4, 45], ["Arroz rojo mexicano", "1 taza", 180, 260, 5, 8, 42],
    ["Espagueti cocido", "1 taza", 140, 220, 8, 1, 43], ["Sopa de fideo seca", "1 plato", 200, 230, 6, 8, 34],
    ["Papa cocida", "1 pieza", 170, 150, 4, 0.2, 34], ["Papas fritas", "1 porción", 100, 312, 3, 15, 41]
  ],
  leguminosas: [
    ["Frijoles de la olla", "½ taza", 130, 115, 7, 0.5, 20], ["Frijoles refritos", "½ taza", 130, 150, 7, 6, 19],
    ["Lentejas cocidas", "1 taza", 200, 230, 18, 1, 40], ["Garbanzos cocidos", "½ taza", 120, 135, 7, 2, 22]
  ],
  lacteos: [
    ["Leche entera", "1 vaso (240 ml)", 240, 150, 8, 8, 12], ["Leche descremada", "1 vaso (240 ml)", 240, 90, 8, 0.3, 12],
    ["Yogur natural", "1 taza", 200, 120, 7, 6, 9], ["Queso fresco", "40 g", 40, 105, 7, 8, 1],
    ["Queso Oaxaca", "30 g", 30, 100, 7, 8, 1], ["Huevo cocido", "1 pieza", 50, 75, 6, 5, 0.5],
    ["Huevos revueltos", "2 piezas", 120, 200, 13, 15, 2], ["Huevos a la mexicana", "2 piezas", 180, 230, 14, 17, 6]
  ],
  proteinas: [
    ["Pechuga de pollo a la plancha", "120 g", 120, 200, 37, 5, 0], ["Bistec de res", "120 g", 120, 250, 30, 14, 0],
    ["Carne asada", "150 g", 150, 330, 38, 19, 0], ["Filete de pescado", "150 g", 150, 190, 32, 6, 0],
    ["Atún en agua", "1 lata", 120, 130, 28, 1, 0], ["Carnitas", "100 g", 100, 270, 22, 20, 0],
    ["Milanesa de pollo empanizada", "1 pieza", 150, 330, 28, 16, 18]
  ],
  sopas: [
    ["Sopa de verduras", "1 plato", 300, 120, 4, 3, 20], ["Caldo de pollo con verduras", "1 plato", 350, 150, 14, 5, 12],
    ["Crema de verduras", "1 plato", 300, 180, 5, 9, 20]
  ],
  postres: [
    ["Flan", "1 rebanada", 120, 220, 5, 8, 32], ["Pastel de chocolate", "1 rebanada", 100, 370, 5, 18, 50],
    ["Helado de vainilla", "1 bola", 70, 140, 2, 7, 16], ["Gelatina", "1 vaso", 120, 70, 2, 0, 16],
    ["Arroz con leche", "1 taza", 200, 280, 6, 7, 48], ["Churro", "1 pieza", 50, 200, 2, 11, 23],
    ["Galletas Marías", "4 piezas", 28, 120, 2, 3, 21], ["Paleta de hielo de agua", "1 pieza", 60, 60, 0, 0, 15]
  ],
  snacks: [
    ["Papitas fritas de bolsa", "1 bolsa chica", 45, 240, 3, 15, 24], ["Cacahuates", "30 g", 30, 175, 7, 15, 5],
    ["Palomitas naturales", "3 tazas", 25, 95, 3, 1, 19], ["Barra de granola", "1 pieza", 30, 130, 2, 5, 20]
  ],
  bebidas: [
    ["Agua natural", "1 vaso (350 ml)", 350, 0, 0, 0, 0], ["Café negro sin azúcar", "1 taza", 240, 2, 0.3, 0, 0],
    ["Café con leche y 1 cdta de azúcar", "1 taza", 240, 90, 4, 4, 9], ["Té sin azúcar", "1 taza", 240, 0, 0, 0, 0],
    ["Agua de jamaica sin azúcar", "1 vaso (350 ml)", 350, 5, 0, 0, 1], ["Agua de jamaica con azúcar", "1 vaso (350 ml)", 350, 110, 0, 0, 28],
    ["Agua de limón con azúcar", "1 vaso (350 ml)", 350, 100, 0, 0, 26], ["Jugo de naranja natural", "1 vaso (240 ml)", 240, 110, 2, 0.5, 26],
    ["Agua de coco", "1 envase (330 ml)", 330, 60, 0, 0, 15], ["Refresco de cola", "1 lata (355 ml)", 355, 140, 0, 0, 39],
    ["Refresco de cola sin azúcar", "1 lata (355 ml)", 355, 0, 0, 0, 0], ["Jugo o néctar envasado", "1 caja (250 ml)", 250, 120, 0, 0, 30],
    ["Bebida deportiva", "1 botella (500 ml)", 500, 120, 0, 0, 30], ["Champurrado", "1 taza", 250, 190, 5, 5, 32],
    ["Chocolate caliente con leche", "1 taza", 250, 230, 8, 9, 30]
  ],
  licuados: [
    ["Licuado de plátano con leche", "1 vaso (400 ml)", 400, 280, 10, 6, 48], ["Licuado de avena", "1 vaso (400 ml)", 400, 300, 11, 7, 48],
    ["Malteada de chocolate", "1 vaso (400 ml)", 400, 450, 10, 16, 65], ["Smoothie de fresa con yogur", "1 vaso (350 ml)", 350, 220, 7, 3, 43]
  ],
  alcohol: [
    ["Cerveza clara", "1 lata (355 ml)", 355, 150, 1, 0, 13], ["Vino tinto", "1 copa (150 ml)", 150, 125, 0, 0, 4],
    ["Tequila o mezcal", "1 caballito (45 ml)", 45, 100, 0, 0, 0], ["Michelada", "1 vaso (500 ml)", 500, 200, 1, 0, 15],
    ["Margarita", "1 copa (240 ml)", 240, 280, 0, 0, 30], ["Piña colada", "1 vaso (240 ml)", 240, 380, 1, 9, 50],
    ["Cuba libre", "1 vaso (300 ml)", 300, 190, 0, 0, 20]
  ]
};

const slug = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const construir = datos => Object.entries(datos).flatMap(([grupo, filas]) =>
  filas.map(([nombre, porcion, gramos, kcal, prot, grasa, carb]) => {
    const v = GRUPOS[grupo].var;
    return { id: `mx-${grupo}-${slug(nombre)}`, nombre, pais: "MX", grupo, desc: "", porcion, gramos,
      kcal, kcalMin: Math.round(kcal * (1 - v)), kcalMax: Math.round(kcal * (1 + v)), prot, grasa, carb };
  })
);

export const alimentosBase = construir(DATOS);
