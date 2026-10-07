/* Página do empreendimento: monta as seções a partir de js/dados.js. */
(function () {
  "use strict";
  var E = window.EMPREENDIMENTO, F = E.financiamento, esc = Arte.esc;
  var $ = function (s) { return document.querySelector(s); };
  var brl = function (v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }); };
  var brl2 = function (v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); };
  function planta(id) { return E.plantas.filter(function (p) { return p.id === id; })[0]; }
  var zap = function (msg) { return "https://wa.me/" + E.whatsapp + "?text=" + encodeURIComponent(msg); };

  /* ---------- topo e seções fixas ---------- */
  function topo() {
    document.title = E.nome + " · " + E.status + " na " + E.bairro.split(",")[0];
    $("#nav-marca").textContent = E.nome;
    $("#h-status").textContent = E.status + " · entrega em " + E.entrega;
    $("#h-nome").textContent = E.nome;
    $("#h-slogan").textContent = E.slogan;
    $("#h-numeros").innerHTML = E.numeros.map(function (n) { return "<div><b>" + esc(n.v) + "</b><span>" + esc(n.l) + "</span></div>"; }).join("");
    $("#h-arte").innerHTML = Arte.fachada();
    $("#s-lead").textContent = E.tipo + " " + E.nome + ", em " + E.bairro + ". " + E.numeros[0].v + " dormitórios, " + E.numeros[1].v + " e entrega prevista para " + E.entrega + ".";
    $("#s-dif").innerHTML = E.diferenciais.map(function (d) { return '<div class="cartao"><span class="rombo" aria-hidden="true">◆</span><h3>' + esc(d.t) + "</h3><p>" + esc(d.d) + "</p></div>"; }).join("");
    $("#s-lazer").innerHTML = E.lazer.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("");
    $("#l-titulo").textContent = "Tudo perto, na " + E.bairro.split(",")[0] + ".";
    $("#l-end").textContent = E.endereco + " · " + E.bairro;
    $("#l-lista").innerHTML = E.localizacao.map(function (l) { return '<div class="local"><span>' + esc(l.n) + "</span><b>" + esc(l.m) + "</b></div>"; }).join("");
    $("#c-corretor").textContent = E.corretor.nome + " · " + E.corretor.creci;
    $("#f-nome").textContent = E.tipo + " " + E.nome + " · " + E.endereco + " · " + E.bairro + " · " + E.corretor.creci;
    $("#zap").href = zap("Olá! Vi o " + E.nome + " e quero saber mais.");
  }

  /* ---------- plantas ---------- */
  var atual = E.plantas[0].id;
  function plantas() {
    $("#p-abas").innerHTML = E.plantas.map(function (p) { return '<button role="tab" data-pl="' + p.id + '" aria-selected="' + (p.id === atual) + '">' + esc(p.nome) + " · " + p.area + " m²</button>"; }).join("");
    var p = planta(atual);
    $("#p-corpo").innerHTML = '<div class="planta-arte">' + Arte.planta(p) + '</div><div class="ficha"><h3>' + esc(p.nome) + '</h3><dl><dt>Área privativa</dt><dd>' + p.area + " m²</dd><dt>Dormitórios</dt><dd>" + p.dorm + " (" + p.suites + (p.suites === 1 ? " suíte" : " suítes") + ")</dd><dt>Vagas</dt><dd>" + p.vagas + "</dd></dl>" +
      '<p class="nota" style="margin:0">A partir de</p><p class="preco" style="margin:0 0 var(--e2)">' + brl(p.preco) + '</p><div class="grupo-btn"><button class="btn btn-verde" data-quero="' + p.id + '" type="button">Quero esta planta</button></div><p class="nota">Planta ilustrativa. Mobiliário e cotas sem valor contratual.</p></div>';
  }

  /* ---------- tour 3D e vídeo ---------- */
  function tour() {
    $("#t-link").href = E.tour;
    $("#t-abrir").addEventListener("click", function () {
      $("#t-palco").innerHTML = '<iframe src="' + esc(E.tour) + '" title="Tour 3D do apartamento" allow="fullscreen; accelerometer; gyroscope" loading="lazy"></iframe>';
    });
    if (E.video) {
      $("#video").hidden = false;
      $("#v-palco").innerHTML = '<div class="chamada"><h3>Assistir ao vídeo</h3><p>O vídeo só carrega quando você clicar.</p><button class="btn btn-ouro" id="v-abrir" type="button">Assistir</button></div>';
      $("#v-abrir").addEventListener("click", function () {
        $("#v-palco").innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(E.video) + '?autoplay=1&rel=0" title="Vídeo do empreendimento" allow="autoplay; fullscreen" allowfullscreen></iframe>';
      });
    }
  }

  /* ---------- simulador (Price) ---------- */
  function simular() {
    var p = planta($("#s-planta").value), ent = Number($("#s-entrada").value), n = Number($("#s-prazo").value);
    var financiado = p.preco * (1 - ent / 100), i = Math.pow(1 + F.taxaAnual / 100, 1 / 12) - 1;
    var parcela = financiado * i / (1 - Math.pow(1 + i, -n));
    $("#s-ent-v").textContent = ent + "% (" + brl(p.preco * ent / 100) + ")";
    $("#s-res").innerHTML = '<div class="linha"><span>Valor do imóvel</span><b>' + brl(p.preco) + '</b></div><div class="linha"><span>Entrada</span><b>' + brl(p.preco * ent / 100) + '</b></div><div class="linha"><span>Financiado</span><b>' + brl(financiado) + '</b></div><div class="linha"><span>Parcela estimada em ' + n + 'x</span><span class="grande">' + brl2(parcela) + "</span></div>";
  }
  function simulador() {
    $("#s-planta").innerHTML = E.plantas.map(function (p) { return '<option value="' + p.id + '">' + esc(p.nome) + " · " + p.area + " m² · " + brl(p.preco) + "</option>"; }).join("");
    var r = $("#s-entrada"); r.min = F.entradaMin; r.max = F.entradaMax; r.step = 5; r.value = F.entradaMin;
    $("#s-prazo").innerHTML = F.prazos.map(function (m) { return '<option value="' + m + '">' + m + " meses (" + m / 12 + " anos)</option>"; }).join("");
    $("#s-prazo").value = F.prazos[F.prazos.length - 1];
    ["s-planta", "s-entrada", "s-prazo"].forEach(function (id) { $("#" + id).addEventListener("input", simular); });
    simular();
  }

  /* ---------- formulário de contato ---------- */
  var nota = "";
  function formulario() {
    $("#c-area").innerHTML = '<form id="f" class="caixa" novalidate><label for="f-nome-c" style="margin-top:0">Seu nome</label><input type="text" id="f-nome-c" autocomplete="name" maxlength="60">' +
      '<label for="f-tel">WhatsApp</label><input type="tel" id="f-tel" autocomplete="tel" inputmode="tel" placeholder="(11) 99999-9999" maxlength="16">' +
      '<label for="f-int">Planta de interesse</label><select id="f-int">' + E.plantas.map(function (p) { return '<option value="' + p.id + '">' + esc(p.nome) + " · " + p.area + " m²</option>"; }).join("") + "</select>" +
      '<label for="f-vis">Quer agendar uma visita? (opcional)</label><div style="display:flex;gap:8px"><input type="date" id="f-vis"><select id="f-per" aria-label="Período da visita"><option>manhã</option><option>tarde</option></select></div>' +
      '<label class="opc"><input type="checkbox" id="f-ok"><span>Concordo em ser contatado pelo time de vendas sobre o ' + esc(E.nome) + ". Uso seus dados só para isso (LGPD).</span></label>" +
      '<p class="erro" id="f-erro" role="alert" hidden></p><p style="margin:var(--e3) 0 0"><button class="btn btn-verde" type="submit" style="width:100%">Enviar meus dados</button></p></form>';
    var hoje = new Date(), pad = function (n) { return (n < 10 ? "0" : "") + n; };
    $("#f-vis").min = hoje.getFullYear() + "-" + pad(hoje.getMonth() + 1) + "-" + pad(hoje.getDate());
    $("#f-tel").addEventListener("input", function () {
      var d = this.value.replace(/\D/g, "").slice(0, 11), c = d.length > 10 ? 7 : 6, r = d;
      if (d.length > 2) r = "(" + d.slice(0, 2) + ") " + d.slice(2, c) + (d.length > c ? "-" + d.slice(c) : "");
      this.value = r;
    });
    $("#f").addEventListener("submit", enviar);
  }
  function enviar(e) {
    e.preventDefault();
    var nome = $("#f-nome-c").value.trim(), tel = $("#f-tel").value.replace(/\D/g, ""), er = $("#f-erro");
    function falha(t, el) { er.textContent = t; er.hidden = false; $(el).focus(); }
    if (nome.length < 2) return falha("Informe seu nome.", "#f-nome-c");
    if (tel.length < 10) return falha("Informe um WhatsApp com DDD.", "#f-tel");
    if (!$("#f-ok").checked) return falha("Precisamos da sua autorização para entrar em contato.", "#f-ok");
    var vis = $("#f-vis").value ? { data: $("#f-vis").value, periodo: $("#f-per").value } : null;
    var l = Leads.add({ nome: nome, tel: tel, interesse: $("#f-int").value, contato: "whatsapp", obs: nota, visita: vis, origem: "site" });
    var p = planta(l.interesse);
    var msg = "Olá! Sou " + nome + " e tenho interesse no " + E.nome + ", planta " + p.nome + " (" + p.area + " m²)." + (vis ? " Gostaria de visitar no dia " + vis.data.split("-").reverse().join("/") + ", à " + vis.periodo + "." : "") + (nota ? " " + nota : "");
    $("#c-area").innerHTML = '<div class="sucesso" role="status"><h3>Recebemos seus dados</h3><p>Obrigado, ' + esc(nome.split(" ")[0]) + '! O time do ' + esc(E.nome) + ' vai falar com você em breve. Para adiantar, chame agora no WhatsApp:</p><p><a class="btn btn-verde" target="_blank" rel="noopener" href="' + zap(msg) + '">Continuar no WhatsApp</a></p></div>';
    nota = "";
  }

  /* ---------- eventos ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.pl) { atual = b.dataset.pl; plantas(); }
    else if (b.dataset.quero) { $("#f-int") && ($("#f-int").value = b.dataset.quero); location.hash = "#contato"; }
    else if (b.id === "s-quero") {
      var p = planta($("#s-planta").value), ent = $("#s-entrada").value, n = $("#s-prazo").value;
      nota = "Simulação: planta " + p.nome + ", entrada " + ent + "%, " + n + " meses.";
      if ($("#f-int")) $("#f-int").value = p.id; location.hash = "#contato";
    }
  });

  topo(); plantas(); tour(); simulador(); formulario();
})();
