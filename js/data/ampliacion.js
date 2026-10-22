/**
 * ZG Group - Ampliación de base de datos (v0.5.0)
 * Fila: [nombre, porción, gramos_o_ml, kcal, proteína_g, grasa_g, carbohidratos_g]
 * Fuentes de referencia: valores publicados por usuarios en FatSecret México para Vips, Toks y Sanborns
 * (anclan las kcal de la sección "restaurante"), más estimaciones propias de recetas de cocina económica,
 * antojitos y bebidas comunes. FatSecret es información colaborativa y a veces incompleta: los macros
 * marcados como estimados se calcularon aparte. TODO: validar con SMAE y un nutriólogo antes de publicar.
 * Los rangos min/max son amplios porque cada establecimiento cocina distinto.
 */
import { construir } from './alimentos.js';

const DATOS = {
  desayunos: [
    ["Huevos divorciados (Sanborns)", "1 plato (2 huevos)", 300, 500, 22, 30, 35],
    ["Chilaquiles verdes con claras (Toks)", "1 platillo", 300, 487, 17, 11, 80],
    ["Chilaquiles rojos con huevo", "1 plato", 300, 520, 22, 28, 45],
    ["Omelette poblano", "1 porción", 200, 377, 24, 28, 6],
    ["Huevos con salsa pasilla", "1 porción", 250, 384, 17, 26, 20],
    ["Avena con frutas (Toks)", "1 plato", 350, 527, 15, 12, 90],
    ["Hot cakes con mantequilla y miel", "3 piezas", 250, 480, 9, 14, 78],
    ["Huevos al gusto con frijoles y tortillas", "2 huevos", 280, 420, 18, 22, 38],
    ["Molletes", "2 piezas", 250, 450, 18, 18, 50],
    ["Enfrijoladas con queso y crema", "3 piezas", 300, 480, 18, 22, 50],
    ["Huevo con jamón", "2 huevos", 150, 260, 17, 19, 2],
    ["Machaca con huevo", "1 plato", 180, 350, 28, 24, 4],
    ["Sincronizada de jamón y queso", "1 pieza", 150, 380, 20, 20, 30]
  ],
  comida_corrida: [
    ["Caldo de res con verduras", "1 plato", 400, 280, 24, 10, 25],
    ["Chile relleno de queso capeado", "1 pieza", 250, 480, 18, 32, 28],
    ["Chile relleno de carne (Sanborns)", "1 porción", 150, 325, 14, 20, 20],
    ["Tostadas de tinga de pollo", "2 piezas", 220, 380, 22, 18, 32],
    ["Bistec a la mexicana", "1 porción", 150, 280, 26, 16, 6],
    ["Picadillo con papa", "1 plato", 250, 310, 18, 16, 24],
    ["Milanesa de res con ensalada", "1 pieza", 200, 420, 32, 22, 20],
    ["Albóndigas en chipotle", "4 piezas", 300, 360, 24, 20, 18],
    ["Cochinita pibil", "1 porción", 150, 330, 28, 22, 4],
    ["Pescado frito empanizado", "1 pieza", 250, 520, 34, 28, 30],
    ["Plátano macho frito", "1 porción", 100, 200, 1, 9, 30],
    ["Frijoles charros", "1 plato", 250, 280, 16, 12, 28],
    ["Pambazo", "1 pieza", 300, 600, 22, 32, 55],
    ["Torta de jamón", "1 pieza", 300, 560, 24, 24, 60],
    ["Torta de milanesa", "1 pieza", 350, 700, 35, 32, 70]
  ],
  tacos: [
    ["Taco de suadero", "1 pieza", 90, 180, 9, 11, 12], ["Taco de carnitas", "1 pieza", 90, 200, 10, 12, 13],
    ["Taco de barbacoa", "1 pieza", 90, 190, 12, 11, 12], ["Taco de canasta", "1 pieza", 60, 120, 3, 5, 16],
    ["Taco de pescado empanizado", "1 pieza", 120, 250, 10, 13, 24], ["Gringa de pastor", "1 pieza", 150, 380, 20, 20, 28],
    ["Tacos dorados de pollo", "3 piezas", 200, 420, 18, 20, 40], ["Sope con carne", "1 pieza", 120, 280, 9, 13, 32],
    ["Tlayuda", "1 pieza", 300, 650, 28, 30, 60], ["Gordita de chicharrón", "1 pieza", 120, 330, 12, 18, 32],
    ["Huarache con bistec", "1 pieza", 300, 600, 28, 25, 60], ["Tostada de ceviche", "1 pieza", 100, 190, 10, 7, 22]
  ],
  restaurante: [
    ["Enchiladas suizas (Vips)", "3 piezas", 300, 500, 25, 11, 53], ["Rajas con crema (Vips)", "1 porción", 115, 139, 2, 12, 7],
    ["Caldo tlalpeño (Vips)", "1 caldo", 120, 318, 21, 13, 31], ["Arrachera norteña (Vips)", "1 porción", 200, 738, 48, 52, 12],
    ["Pechuga con chilaquiles verdes (Toks)", "1 plato", 300, 697, 45, 32, 55], ["Consomé con pechuga de pollo (Toks)", "1 plato", 250, 107, 14, 3, 5],
    ["Queso panela asado (Toks)", "1 porción", 180, 479, 32, 32, 12], ["Pechuga a la parrilla (Toks)", "1 porción", 250, 441, 60, 18, 5],
    ["Res asada con tallarines y verduras (Toks)", "1 platillo", 300, 404, 30, 15, 38], ["Filete de pescado teriyaki (Toks)", "1 platillo", 350, 668, 38, 24, 70],
    ["Sándwich Club (Vips)", "1 plato", 300, 584, 37, 22, 59], ["Sándwich mediterráneo (Toks)", "1 pieza", 250, 397, 20, 16, 40],
    ["Hamburguesa con queso y papas", "1 plato", 450, 950, 40, 50, 75], ["Alitas de pollo con salsa", "6 piezas", 250, 480, 34, 34, 5],
    ["Pizza de pepperoni", "1 rebanada", 110, 285, 12, 10, 36], ["Hot dog con aderezos", "1 pieza", 150, 300, 11, 17, 25],
    ["Nachos con queso", "1 porción", 200, 500, 12, 28, 50], ["Pay de limón light (Vips)", "100 g", 100, 230, 7, 10, 28],
    ["Pastel de chocolate (Vips)", "100 g", 100, 333, 4, 17, 42], ["Cheesecake de fresa (Vips)", "100 g", 100, 256, 5, 14, 28],
    ["Pay helado de limón (Vips)", "100 g", 100, 420, 5, 24, 45], ["Rosca de Reyes (Sanborns)", "1 rebanada", 80, 272, 5, 8, 44]
  ],
  bebidas: [
    ["Limonada de arándanos (Vips)", "1 vaso (420 ml)", 420, 370, 0, 0, 92], ["Jugo de manzana", "1 vaso (240 ml)", 240, 115, 0, 0, 28],
    ["Jugo de uva", "1 vaso (240 ml)", 240, 150, 1, 0, 37], ["Jugo de toronja natural", "1 vaso (240 ml)", 240, 95, 1, 0, 22],
    ["Jugo de piña natural", "1 vaso (240 ml)", 240, 130, 1, 0, 32], ["Jugo de zanahoria", "1 vaso (240 ml)", 240, 95, 2, 0, 22],
    ["Jugo verde (nopal, piña, naranja)", "1 vaso (300 ml)", 300, 120, 3, 0, 28], ["Jugo de tomate", "1 vaso (240 ml)", 240, 50, 2, 0, 10],
    ["Agua de tamarindo con azúcar", "1 vaso (350 ml)", 350, 120, 0, 0, 30], ["Agua de sandía natural", "1 vaso (350 ml)", 350, 70, 1, 0, 17],
    ["Agua mineral", "1 botella (355 ml)", 355, 0, 0, 0, 0], ["Agua tónica", "1 botella (355 ml)", 355, 120, 0, 0, 31],
    ["Refresco de naranja", "1 lata (355 ml)", 355, 160, 0, 0, 44], ["Refresco de toronja", "1 lata (355 ml)", 355, 150, 0, 0, 40],
    ["Capuchino con leche entera", "1 taza (240 ml)", 240, 120, 6, 6, 10], ["Latte con leche entera", "1 vaso (355 ml)", 355, 190, 10, 10, 15],
    ["Té helado con azúcar", "1 vaso (355 ml)", 355, 120, 0, 0, 30], ["Bebida energética", "1 lata (250 ml)", 250, 110, 0, 0, 28],
    ["Leche de soya sin azúcar", "1 vaso (240 ml)", 240, 100, 7, 4, 8], ["Leche de almendra sin azúcar", "1 vaso (240 ml)", 240, 40, 1, 3, 2],
    ["Atole de avena", "1 taza (250 ml)", 250, 150, 5, 3, 27]
  ],
  licuados: [
    ["Licuado de papaya con leche", "1 vaso (400 ml)", 400, 220, 9, 6, 35], ["Licuado de fresa con leche", "1 vaso (400 ml)", 400, 250, 9, 6, 40],
    ["Malteada de vainilla", "1 vaso (400 ml)", 400, 420, 10, 16, 60], ["Frappé de café", "1 vaso (400 ml)", 400, 400, 5, 15, 60],
    ["Smoothie de mango", "1 vaso (350 ml)", 350, 200, 3, 1, 48], ["Licuado verde (espinaca y piña)", "1 vaso (400 ml)", 400, 150, 3, 1, 35],
    ["Licuado de proteína con plátano", "1 vaso (450 ml)", 450, 350, 35, 6, 40]
  ],
  alcohol: [
    ["Cerveza oscura (tipo Negra Modelo)", "1 botella (355 ml)", 355, 160, 1.5, 0, 14], ["Cerveza stout artesanal", "1 botella (355 ml)", 355, 200, 2, 0, 18],
    ["Cerveza light", "1 lata (355 ml)", 355, 102, 1, 0, 5.5, "S"], ["Cerveza IPA artesanal", "1 botella (355 ml)", 355, 210, 2, 0, 15],
    ["Cerveza sin alcohol", "1 botella (355 ml)", 355, 60, 1, 0, 13], ["Chelada", "1 vaso (470 ml)", 470, 160, 1, 0, 10],
    ["Whisky", "1 caballito (45 ml)", 45, 113, 0, 0, 0, "S"], ["Vodka", "1 caballito (45 ml)", 45, 104, 0, 0, 0, "S"],
    ["Ron", "1 caballito (45 ml)", 45, 104, 0, 0, 0, "S"], ["Brandy o coñac", "1 caballito (45 ml)", 45, 104, 0, 0, 0, "S"],
    ["Ginebra", "1 caballito (45 ml)", 45, 119, 0, 0, 0, "S"], ["Licor de café", "1 caballito (45 ml)", 45, 145, 0, 0, 20],
    ["Vino blanco", "1 copa (150 ml)", 150, 123, 0, 0, 4, "S"], ["Vino espumoso", "1 copa (150 ml)", 150, 110, 0, 0, 5],
    ["Whisky con refresco de cola", "1 vaso (300 ml)", 300, 190, 0, 0, 20], ["Paloma", "1 vaso (300 ml)", 300, 200, 0, 0, 22],
    ["Mojito", "1 vaso (240 ml)", 240, 190, 0, 0, 20], ["Carajillo", "1 vaso (120 ml)", 120, 150, 0, 0, 12],
    ["Aperol spritz", "1 copa (200 ml)", 200, 150, 0, 0, 14], ["Cantarito", "1 vaso (400 ml)", 400, 200, 0, 0, 24],
    ["Tequila sunrise", "1 vaso (240 ml)", 240, 230, 0, 0, 28], ["Martini", "1 copa (90 ml)", 90, 160, 0, 0, 1],
    ["Daiquirí", "1 copa (120 ml)", 120, 150, 0, 0, 12]
  ]
};

export const ampliacionBase = construir(DATOS);
