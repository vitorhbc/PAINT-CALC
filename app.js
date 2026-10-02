let areaMode = 'direct';

function switchAreaMode(mode) {
  areaMode = mode;
  const directBtn = document.getElementById('btnDirectArea');
  const dimBtn = document.getElementById('btnDimArea');
  const directInput = document.getElementById('directAreaInput');
  const dimInput = document.getElementById('dimAreaInput');

  if (mode === 'direct') {
    directBtn.classList.add('active');
    dimBtn.classList.remove('active');
    directInput.classList.remove('hidden');
    dimInput.classList.add('hidden');
    calculate();
  } else {
    dimBtn.classList.add('active');
    directBtn.classList.remove('active');
    dimInput.classList.remove('hidden');
    directInput.classList.add('hidden');
    calculateDim();
  }
}

function calculateDim() {
  const width = parseFloat(document.getElementById('wallWidth').value) || 0;
  const height = parseFloat(document.getElementById('wallHeight').value) || 0;
  const deductions = parseFloat(document.getElementById('deductions').value) || 0;

  const totalCalcArea = Math.max(0, (width * height) - deductions);
  document.getElementById('totalArea').value = totalCalcArea.toFixed(1);
  calculate();
}

function setRate(rate) {
  document.getElementById('laborRate').value = rate;
  calculate();
}

function calculate() {
  const area = parseFloat(document.getElementById('totalArea').value) || 0;
  const coats = parseInt(document.getElementById('coats').value) || 2;
  const yieldRate = parseFloat(document.getElementById('yield').value) || 11;
  const laborRate = parseFloat(document.getElementById('laborRate').value) || 0;

  // Cálculo de tinta (Litros = (Área * Demãos) / Rendimento)
  const liters = yieldRate > 0 ? (area * coats) / yieldRate : 0;

  // Cálculo de Mão de Obra
  const laborCost = area * laborRate;

  // Atualização dos elementos na interface
  document.getElementById('litersResult').innerText = `${liters.toFixed(1)} Litros`;
  document.getElementById('laborResult').innerText = `${laborCost.toFixed(2)} €`;

  document.getElementById('summaryArea').innerText = `${area.toFixed(1)} m²`;
  document.getElementById('summaryLiters').innerText = `${liters.toFixed(1)} L`;
  document.getElementById('summaryLaborTotal').innerText = `${laborCost.toFixed(2)} €`;
}

// Registo do Service Worker para PWA (offline)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('PWA Service Worker registado com sucesso.'))
      .catch(err => console.log('Erro ao registar Service Worker:', err));
  });
}

// Inicializar cálculos no arranque
window.onload = calculate;
