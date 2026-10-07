/* Ilustrações geradas por código: fachada do prédio e plantas baixas. Sem imagens, sem direitos autorais. */
window.Arte = (function () {
  "use strict";
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* fachada ao entardecer: torre com janelas, algumas acesas, e árvores na base */
  function fachada() {
    var j = "", r, c, x, y, acesa;
    for (r = 0; r < 18; r++) for (c = 0; c < 6; c++) {
      x = 118 + c * 22; y = 40 + r * 21; acesa = ((r * 7 + c * 13) % 5) < 2;
      j += '<rect x="' + x + '" y="' + y + '" width="14" height="13" rx="1.5" fill="' + (acesa ? "#f7d58a" : "#2b4a3b") + '"' + (acesa ? ' opacity=".95"' : "") + "/>";
      if (c % 2 === 0) j += '<rect x="' + (x - 2) + '" y="' + (y + 14) + '" width="18" height="2" fill="#e9dfc8" opacity=".7"/>';
    }
    var arv = "";
    [[40, 410, 26], [76, 420, 20], [300, 412, 24], [340, 422, 18], [24, 428, 16], [362, 430, 14]].forEach(function (t) {
      arv += '<rect x="' + (t[0] - 2) + '" y="' + t[1] + '" width="4" height="' + (440 - t[1]) + '" fill="#3b2f20"/><circle cx="' + t[0] + '" cy="' + t[1] + '" r="' + t[2] + '" fill="#3f7a56"/><circle cx="' + (t[0] - t[2] / 3) + '" cy="' + (t[1] - t[2] / 3) + '" r="' + t[2] / 2.4 + '" fill="#58a173" opacity=".7"/>';
    });
    return '<svg viewBox="0 0 400 460" role="img" aria-label="Ilustração da fachada do Aurora Park ao entardecer" preserveAspectRatio="xMidYMax slice">' +
      '<defs><linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#27456b"/><stop offset=".55" stop-color="#d98b5f"/><stop offset="1" stop-color="#f5d9a8"/></linearGradient>' +
      '<linearGradient id="torre" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1b3328"/><stop offset=".5" stop-color="#234536"/><stop offset="1" stop-color="#162b21"/></linearGradient></defs>' +
      '<rect width="400" height="460" fill="url(#ceu)"/><circle cx="330" cy="110" r="34" fill="#fbe7b5" opacity=".85"/>' +
      '<g fill="#1a2f3d" opacity=".55"><rect x="0" y="260" width="60" height="200"/><rect x="62" y="300" width="40" height="160"/><rect x="300" y="240" width="50" height="220"/><rect x="352" y="290" width="48" height="170"/></g>' +
      '<rect x="100" y="14" width="164" height="426" rx="4" fill="url(#torre)"/><rect x="92" y="8" width="180" height="10" rx="2" fill="#e9dfc8"/>' + j +
      '<rect x="130" y="400" width="104" height="40" fill="#e9dfc8" opacity=".9"/><rect x="164" y="410" width="36" height="30" fill="#1f3b2d"/>' +
      '<rect x="0" y="438" width="400" height="22" fill="#2c4a39"/>' + arv + "</svg>";
  }

  /* planta baixa em SVG a partir da lista de cômodos [nome, x, y, w, h] */
  function planta(p) {
    var cores = ["#efe6d2", "#e6dcc3", "#dfe8dc", "#f1ead9"], g = "";
    p.comodos.forEach(function (c, i) {
      var cx = c[1] + c[3] / 2, cy = c[2] + c[4] / 2, pequeno = c[3] < 28 || c[4] < 16;
      g += '<rect x="' + c[1] + '" y="' + c[2] + '" width="' + c[3] + '" height="' + c[4] + '" fill="' + cores[i % cores.length] + '" stroke="#1f3b2d" stroke-width="1"/>' +
        '<text x="' + cx + '" y="' + (cy + 1) + '" text-anchor="middle" font-size="' + (pequeno ? 2.9 : 3.5) + '" fill="#1d2420" font-family="system-ui,sans-serif" font-weight="600">' + esc(c[0]) + "</text>";
    });
    return '<svg viewBox="-2 -2 104 ' + (p.alt + 4) + '" role="img" aria-label="Planta do apartamento de ' + esc(p.nome) + ', ' + p.area + ' metros quadrados">' + g + "</svg>";
  }
  return { fachada: fachada, planta: planta, esc: esc };
})();
