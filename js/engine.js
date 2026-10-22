/**
 * ZG Group - Calculadora Nutricional / Calórica
 * Motor de Cálculo y Reglas de Seguridad (v1.1.0)
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

  if (imc >= 40) {
    return { error: "Con un IMC de 40 o más el plan alimentario debe indicarlo un profesional de la salud. Esta herramienta no lo calcula." };
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

  // 6. Reparto de macronutrientes con base en evidencia
  // Proteína: RDA 0.8 g/kg (IOM) como piso; 1.4-2.0 g/kg en personas que se ejercitan (ISSN, 2017).
  // Todo se limita a los rangos AMDR del IOM (% de kcal): proteína 10-35, grasa 20-35, carbohidratos 45-65.
  let factorProteina = actividad <= 1.2 ? 1.0 : (actividad <= 1.375 ? 1.2 : 1.6);
  if (objetivo === 'deficit') factorProteina = Math.min(factorProteina + 0.2, 2.0);
  const pPct = Math.min(Math.max((peso * factorProteina * 4) / caloriasObjetivo, 0.10), 0.35);
  let gPct = 0.25;
  let cPct = 1 - pPct - gPct;
  if (cPct < 0.45) { gPct = 0.20; cPct = 1 - pPct - gPct; }
  if (cPct > 0.65) { gPct = 1 - pPct - 0.65; cPct = 0.65; }
  const proteinasGramos = (caloriasObjetivo * pPct) / 4;
  const grasasGramos = (caloriasObjetivo * gPct) / 9;
  const carbohidratosGramos = (caloriasObjetivo * cPct) / 4;

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
