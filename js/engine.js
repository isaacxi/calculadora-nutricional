/**
 * ZG Group - Calculadora Nutricional / Calórica
 * Motor de Cálculo y Reglas de Seguridad (v1.0.0)
 */

export function calcularRequerimientos(datos) {
  const {
    genero,          // 'hombre' o 'mujer'
    edad,            // en años (número)
    peso,            // en kg (número)
    estatura,        // en cm (número)
    actividad,       // 1.2, 1.375, 1.55, 1.725, 1.9
    objetivo,        // 'deficit', 'mantenimiento', 'superavit'
    condiciones = {} // objeto con booleanos: embarazo, lactancia, diabetes, renal, etc.
  } = datos;

  if (!(edad > 0 && peso >= 30 && peso <= 300 && estatura >= 120 && estatura <= 230)) {
    return { error: "Revisa tus datos: edad, peso (30-300 kg) y estatura (120-230 cm) deben ser valores reales." };
  }

  // 1. Validaciones de Seguridad (YMYL & Bloqueos Clínicos)
  if (edad < 18) {
    return { error: "La calculadora está restringida para menores de 18 años. Consulta a un especialista." };
  }
  if (condiciones.embarazo || condiciones.lactancia || condiciones.diabetes || condiciones.renal) {
    return { error: "Por seguridad clínica, las condiciones médicas especiales requieren supervisión nutricional presencial." };
  }

  // Cálculo del IMC (Índice de Masa Corporal)
  const estaturaMetros = estatura / 100;
  const imc = peso / (estaturaMetros * estaturaMetros);

  if (imc < 18.5 && objetivo === 'deficit') {
    return { error: "Tu IMC indica bajo peso. No es médicamente recomendable aplicar un déficit calórico." };
  }

  // 2. Cálculo de Tasa Metabólica Basal (TMB) - Ecuación de Mifflin-St Jeor (1990)
  let tmb = (10 * peso) + (6.25 * estatura) - (5 * edad);
  tmb = genero === 'hombre' ? tmb + 5 : tmb - 161;

  // 3. Gasto Energético Total Diario (GETD / TDEE)
  let getd = tmb * actividad;

  // 4. Ajuste por Objetivo Calórico
  let caloriasObjetivo = getd;
  if (objetivo === 'deficit') {
    caloriasObjetivo = getd * 0.85; // Déficit moderado del 15%
  } else if (objetivo === 'superavit') {
    caloriasObjetivo = getd * 1.10; // Superávit limpio del 10%
  }

  // 5. Pisos Calóricos de Seguridad Absolutos
  const pisoCalorico = genero === 'hombre' ? 1500 : 1200;
  if (caloriasObjetivo < pisoCalorico) {
    caloriasObjetivo = pisoCalorico; // Se blinda para no romper el piso mínimo de seguridad
  }
  if (caloriasObjetivo < tmb) {
    caloriasObjetivo = tmb; // Nunca sugerir por debajo de la TMB por defecto
  }

  // 6. Algoritmo de Reparto de Macronutrientes (Proteínas, Grasas, Carbohidratos)
  // Proteína ajustada por kg de peso (máximo 2.0g/kg para evitar cifras desproporcionadas)
  let factorProteina = objetivo === 'deficit' ? 2.0 : 1.8;
  let proteinasGramos = Math.min(peso * factorProteina, peso * 2.2);
  
  // Grasas: el mayor entre 0.9g/kg o el 20% de las calorías totales
  let grasasGramos = Math.max(peso * 0.9, (caloriasObjetivo * 0.20) / 9);

  // Carbohidratos: calorías remanentes / 4
  let caloriasRestantes = caloriasObjetivo - ((proteinasGramos * 4) + (grasasGramos * 9));
  let carbohidratosGramos = caloriasRestantes / 4;

  // Mecanismo de Fallback si los carbohidratos salen muy bajos (< 100g)
  if (carbohidratosGramos < 100) {
    proteinasGramos = peso * 1.5; // Ajuste al rango inferior seguro
    grasasGramos = (caloriasObjetivo * 0.25) / 9;
    carbohidratosGramos = (caloriasObjetivo - ((proteinasGramos * 4) + (grasasGramos * 9))) / 4;
  }

  // 7. Redondeo final a decenas y enteros (Evita falsa precisión)
  return {
    tmb: Math.round(tmb),
    getd: Math.round(getd),
    caloriasObjetivo: Math.round(caloriasObjetivo / 10) * 10,
    macronutrientes: {
      proteina: Math.round(proteinasGramos),
      grasa: Math.round(grasasGramos),
      carbohidratos: Math.round(carbohidratosGramos)
    },
    imc: Number(imc.toFixed(1))
  };
}