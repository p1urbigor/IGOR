const fs = require('fs');

let html = fs.readFileSync('index_transacciones.html', 'utf8');

const markerStart = '<section id="sec-billetera" class="section">';
const markerEnd = '<!--Contenedordinámicodetarjetasregistradas-->';

const p1 = html.indexOf(markerStart);
const p2 = html.indexOf(markerEnd);

if (p1 !== -1 && p2 !== -1 && p2 > p1) {
  const replacement = `<section id="sec-billetera" class="section">
          <div class="sec-header">
            <div>
              <h2>Billetera</h2>
              <p>Gestiona métodos de pago, saldo y promociones</p>
            </div>
          </div>

          <div class="tab-bar">
            <button class="tab-btn active" onclick="showTab(this,'tab-metodos')">Métodos de Pago</button>
            <button class="tab-btn" onclick="showTab(this,'tab-recargar')">Recargar Saldo</button>
            <button class="tab-btn" onclick="showTab(this,'tab-transferir')">Transferir Saldo</button>
            <button class="tab-btn" onclick="showTab(this,'tab-promo')">Código Promocional</button>
            <button class="tab-btn" onclick="showTab(this,'tab-facturas')">Historial Facturas</button>
            <button class="tab-btn" onclick="showTab(this,'tab-hist-promo')">Historial Códigos Promocionales</button>
          </div>

          <!--Métodos de Pago-->
          <div id="tab-metodos" class="tab-panel active">
            <!--Barradesimulacióndeestadosdetarjeta-->
            <div
              style="background:linear-gradient(135deg,rgba(232,72,137,0.06) 0%,rgba(0,102,235,0.06) 100%);border:1px dashed var(--border-medium);border-radius:var(--r-md);padding:12px 16px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
              <div
                style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:var(--text-primary)">
                <i class="fa-solid fa-vial" style="color:var(--brand-primary)"></i>
                <span>Simulador de Expiración de Tarjetas:</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <button type="button" class="btn btn-sm" onclick="simulateCardState('expiring')"
                  style="background:#FEF3C7;color:#92400E;border:1px solid #FCD34D;font-size:12px;font-weight:700;border-radius:8px;padding:6px 12px;">
                  <i class="fa-solid fa-triangle-exclamation"></i> Simular Próxima a Expirar
                </button>
                <button type="button" class="btn btn-sm" onclick="simulateCardState('expired')"
                  style="background:#F1F5F9;color:#475569;border:1px solid #CBD5E1;font-size:12px;font-weight:700;border-radius:8px;padding:6px 12px;">
                  <i class="fa-solid fa-circle-xmark"></i> Simular Expirada (Gris)
                </button>
                <button type="button" class="btn btn-sm" onclick="simulateCardState('nocard')"
                  style="background:#FEE2E2;color:#991B1B;border:1px solid #FCA5A5;font-size:12px;font-weight:700;border-radius:8px;padding:6px 12px;">
                  <i class="fa-solid fa-ban"></i> Simular Sin Tarjetas
                </button>
                <button type="button" class="btn btn-sm" onclick="simulateCardState('reset')"
                  style="background:#FFFFFF;color:var(--text-secondary);border:1px solid var(--border-medium);font-size:12px;font-weight:600;border-radius:8px;padding:6px 12px;">
                  <i class="fa-solid fa-rotate-left"></i> Restablecer
                </button>
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
              <div style="font-size:14px;font-weight:700;display:flex;align-items:center;gap:8px">
                Tarjetas Registradas
                <div class="help-wrap">
                  <div class="help-icon">?</div>
                  <div class="help-tip">
                    <div class="ht">Métodos de pago</div>Aquí aparecen todas tus tarjetas vinculadas. La tarjeta <strong>Principal o predeterminada</strong> se usa automáticamente para recargas y para el cargo de la auto-recarga cuando tu saldo baja de $5.00.
                  </div>
                </div>
              </div>
            </div>
            `;

  html = html.substring(0, p1) + replacement + html.substring(p2);
  fs.writeFileSync('index_transacciones.html', html, 'utf8');
  console.log('Restored sec-billetera tab bar and tab-metodos header cleanly!');
} else {
  console.log('Error finding markers: p1 =', p1, 'p2 =', p2);
}
