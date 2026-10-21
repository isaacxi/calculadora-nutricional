import { basePlatillos } from './data/platillos.js';
import { alimentosBase, GRUPOS } from './data/alimentos.js';
import { ampliacionBase } from './data/ampliacion.js';
import { calcularRequerimientos } from './engine.js';

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const r1 = n => Math.round(n * 10) / 10;
const TIEMPOS = ['desayuno', 'comida', 'cena'];
const COLOR = { desayuno: 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300', comida: 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300', cena: 'bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-300' };
const BORDE = { desayuno: 'border-l-blue-500', comida: 'border-l-amber-500', cena: 'border-l-purple-500' };
const LS = { perfil: 'zg_perfil_v1', diario: 'zg_diario_v1' };

// Platillos regionales existentes -> mismo formato + grupo
const mapaGrupo = { sopa_caldo: 'sopas', snack: 'snacks', pan_dulce_panaderia: 'postres', bebida: 'bebidas' };
const regionales = basePlatillos.map(p => ({
  id: p.id, nombre: p.nombre, pais: p.pais, desc: p.descripcion, grupo: mapaGrupo[p.categoria] || 'platillos',
  porcion: p.porcion.descripcion, gramos: p.porcion.gramos,
  kcal: p.nutricion.kcal.tipico, kcalMin: p.nutricion.kcal.min, kcalMax: p.nutricion.kcal.max,
  prot: p.nutricion.proteina_g.tipico, grasa: p.nutricion.grasa_g.tipico, carb: p.nutricion.carbohidratos_g.tipico
}));
const catalogo = [...regionales, ...alimentosBase, ...ampliacionBase];

let diario = { desayuno: [], comida: [], cena: [] };
let metas = { kcal: 0, prot: 0, grasa: 0, carb: 0 };
let filtro = { pais: 'TODOS', grupo: 'TODOS', texto: '' };

const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* modo privado */ } };
const leer = k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };

// ---------- Catálogo ----------
function renderChips() {
  const grupos = [['TODOS', 'Todos'], ...Object.entries(GRUPOS).map(([k, g]) => [k, g.label])];
  $('chipsGrupo').innerHTML = grupos.map(([k, label]) =>
    `<button type="button" data-grupo="${k}" aria-pressed="${filtro.grupo === k}" class="chip text-xs font-semibold px-3 py-1.5 rounded-full border ${filtro.grupo === k ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-600'}">${esc(label)}</button>`).join('');
}

function renderCatalogo() {
  const t = filtro.texto.trim().toLowerCase();
  const lista = catalogo.filter(p =>
    (filtro.pais === 'TODOS' || p.pais === filtro.pais) &&
    (filtro.grupo === 'TODOS' || p.grupo === filtro.grupo) &&
    (!t || (p.nombre + ' ' + p.desc).toLowerCase().includes(t)));
  $('conteoCatalogo').textContent = `${lista.length} resultados`;
  const cont = $('listaPlatillos');
  if (!lista.length) { cont.innerHTML = '<p class="col-span-full text-center text-slate-500 py-6 text-sm">Sin resultados. Prueba otro grupo o quita el filtro de país.</p>'; return; }
  const cants = [0.5, 1, 1.5, 2, 3, 4, 5].map(n => `<option value="${n}"${n === 1 ? ' selected' : ''}>${n}</option>`).join('');
  cont.innerHTML = lista.map(p => `
    <div class="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-start gap-2 mb-1">
          <h4 class="font-bold text-slate-900 text-sm leading-snug">${esc(p.nombre)}</h4>
          <span class="text-[10px] bg-slate-100 font-bold text-slate-700 px-2 py-0.5 rounded">${esc(p.pais)}</span>
        </div>
        ${p.desc ? `<p class="text-xs text-slate-600 mb-2">${esc(p.desc)}</p>` : ''}
        <p class="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded inline-block">${esc(p.porcion)}</p>
        <p class="mt-2 text-[11px] text-slate-500">P ${r1(p.prot)} g · G ${r1(p.grasa)} g · C ${r1(p.carb)} g</p>
      </div>
      <div class="mt-3 pt-3 border-t border-slate-100 space-y-2">
        <div class="flex justify-between items-center">
          <span class="font-black text-slate-900 text-sm">${p.kcal} kcal <span class="text-[11px] font-normal text-slate-500">(${p.kcalMin}–${p.kcalMax})</span></span>
          <label class="text-xs text-slate-600 font-semibold">Cant.
            <select id="cant-${p.id}" class="text-xs border border-slate-300 rounded p-1 font-bold">${cants}</select></label>
        </div>
        <div class="grid grid-cols-3 gap-1">
          ${TIEMPOS.map(t => `<button onclick="agregarAlDiario('${p.id}','${t}')" class="${COLOR[t]} border py-1.5 rounded text-xs font-bold">+ ${t[0].toUpperCase() + t.slice(1)}</button>`).join('')}
        </div>
      </div>
    </div>`).join('');
}

// ---------- Diario ----------
window.agregarAlDiario = (id, tiempo) => {
  const p = catalogo.find(x => x.id === id); if (!p) return;
  const c = Number($(`cant-${id}`)?.value) || 1;
  diario[tiempo].push({ nombre: p.nombre, cantidad: c, kcal: p.kcal * c, prot: p.prot * c, grasa: p.grasa * c, carb: p.carb * c });
  actualizarDiario();
};
window.limpiarComida = t => { diario[t] = []; actualizarDiario(); };
window.removerItem = (t, i) => { diario[t].splice(i, 1); actualizarDiario(); };

function barra(idBar, idTxt, consumido, meta, unidad) {
  const pct = meta ? Math.round((consumido / meta) * 100) : 0;
  $(idBar).style.width = `${Math.min(pct, 100)}%`;
  $(idBar).classList.toggle('bg-red-500', pct > 110);
  $(idTxt).textContent = `${Math.round(consumido)} / ${meta} ${unidad} (${pct}%)`;
}

function actualizarDiario() {
  const tot = { kcal: 0, prot: 0, grasa: 0, carb: 0 };
  TIEMPOS.forEach(t => {
    const N = t[0].toUpperCase() + t.slice(1);
    const suma = diario[t].reduce((a, i) => a + i.kcal, 0);
    $(`lista${N}`).innerHTML = diario[t].length
      ? diario[t].map((i, n) => `<li class="flex justify-between items-center bg-white p-2 rounded border border-slate-200 border-l-4 ${BORDE[t]}"><span><b>${i.cantidad}×</b> ${esc(i.nombre)} <span class="text-slate-500">(${Math.round(i.kcal)} kcal)</span></span><button aria-label="Quitar ${esc(i.nombre)}" onclick="removerItem('${t}',${n})" class="text-red-600 font-bold px-1.5">×</button></li>`).join('')
      : '<li class="text-slate-500 italic">No hay alimentos agregados.</li>';
    $(`kcal${N}`).textContent = `${Math.round(suma)} kcal`;
    diario[t].forEach(i => { tot.kcal += i.kcal; tot.prot += i.prot; tot.grasa += i.grasa; tot.carb += i.carb; });
  });
  $('totalConsumido').textContent = `${Math.round(tot.kcal)} kcal`;
  $('totalConsumido').classList.toggle('text-red-600', metas.kcal > 0 && tot.kcal > metas.kcal * 1.1);
  const dif = Math.round(tot.kcal - metas.kcal);
  $('difKcal').textContent = metas.kcal ? (dif > 0 ? `${dif} kcal por encima de tu meta` : `Te quedan ${-dif} kcal`) : '';
  barra('barKcal', 'txtKcal', tot.kcal, metas.kcal, 'kcal');
  barra('barMacroProt', 'txtMacroProt', tot.prot, metas.prot, 'g');
  barra('barMacroGrasa', 'txtMacroGrasa', tot.grasa, metas.grasa, 'g');
  barra('barMacroCarb', 'txtMacroCarb', tot.carb, metas.carb, 'g');
  guardar(LS.diario, { fecha: new Date().toDateString(), diario });
}

// ---------- Calculadora y perfil ----------
const CAMPOS = ['genero', 'edad', 'peso', 'estatura', 'actividad', 'objetivo'];

function calcular() {
  const emb = $('condEmbarazo').checked;
  const datos = {
    genero: $('genero').value, edad: Number($('edad').value), peso: Number($('peso').value),
    estatura: Number($('estatura').value), actividad: Number($('actividad').value), objetivo: $('objetivo').value,
    condiciones: { embarazo: emb, lactancia: emb, diabetes: $('condDiabetes').checked, renal: $('condRenal').checked }
  };
  const res = calcularRequerimientos(datos);
  const ver = (id, on) => $(id).classList.toggle('hidden', !on);
  if (res.error) {
    $('errorText').textContent = res.error;
    ['resultCard', 'placeholderCard', 'seccionDiario'].forEach(i => ver(i, false)); ver('errorCard', true); return;
  }
  ['errorCard', 'placeholderCard'].forEach(i => ver(i, false)); ver('resultCard', true); ver('seccionDiario', true);
  const m = res.macronutrientes;
  metas = { kcal: res.caloriasObjetivo, prot: m.proteina, grasa: m.grasa, carb: m.carbohidratos };
  $('caloriasTotal').textContent = `${metas.kcal} kcal`;
  $('resTmb').textContent = res.tmb; $('resGetd').textContent = res.getd; $('resImc').textContent = res.imc;
  $('macroProt').textContent = `${m.proteina} g`; $('macroGrasa').textContent = `${m.grasa} g`; $('macroCarb').textContent = `${m.carbohidratos} g`;
  const kp = m.proteina * 4, kg = m.grasa * 9, kc = m.carbohidratos * 4, t = kp + kg + kc;
  const pp = Math.round(kp / t * 100), pg = Math.round(kg / t * 100), pc = 100 - pp - pg;
  $('labelPorcProt').textContent = `Prot: ${pp}%`; $('labelPorcGrasa').textContent = `Grasas: ${pg}%`; $('labelPorcCarb').textContent = `Carbs: ${pc}%`;
  $('svgBarProt').setAttribute('width', pp);
  $('svgBarGrasa').setAttribute('x', pp); $('svgBarGrasa').setAttribute('width', pg);
  $('svgBarCarb').setAttribute('x', pp + pg); $('svgBarCarb').setAttribute('width', pc);
  $('metaComparativa').textContent = `${metas.kcal} kcal`;
  guardar(LS.perfil, Object.fromEntries(CAMPOS.map(c => [c, $(c).value])));
  actualizarDiario();
}

document.addEventListener('DOMContentLoaded', () => {
  const perfil = leer(LS.perfil);
  if (perfil) { CAMPOS.forEach(c => { if (perfil[c] != null) $(c).value = perfil[c]; }); $('perfilGuardado').classList.remove('hidden'); }
  const hoy = leer(LS.diario);
  if (hoy && hoy.fecha === new Date().toDateString()) diario = hoy.diario;
  $('calcForm').addEventListener('submit', e => { e.preventDefault(); calcular(); });
  $('borrarPerfil').addEventListener('click', () => { try { localStorage.removeItem(LS.perfil); localStorage.removeItem(LS.diario); } catch {} location.reload(); });
  $('filtroPais').addEventListener('change', e => { filtro.pais = e.target.value; renderCatalogo(); });
  $('busquedaPlatillo').addEventListener('input', e => { filtro.texto = e.target.value; renderCatalogo(); });
  $('chipsGrupo').addEventListener('click', e => {
    const b = e.target.closest('[data-grupo]'); if (!b) return;
    filtro.grupo = b.dataset.grupo; renderChips(); renderCatalogo();
  });
  renderChips(); renderCatalogo();
  if (perfil && perfil.edad && perfil.peso && perfil.estatura) calcular();
});
