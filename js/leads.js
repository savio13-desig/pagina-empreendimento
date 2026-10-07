/* Contatos captados. Na amostra ficam no navegador (localStorage);
   em produção, esta camada envia para um banco, planilha ou CRM. */
window.Leads = (function () {
  "use strict";
  var K = "ap-leads:v1";
  function ler() { try { var v = JSON.parse(localStorage.getItem(K)); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function gravar(l) { try { localStorage.setItem(K, JSON.stringify(l)); } catch (e) {} }
  var STATUS = ["novo", "contatado", "visita", "proposta", "perdido"];
  var ROTULO = { novo: "Novo", contatado: "Contatado", visita: "Visita marcada", proposta: "Proposta", perdido: "Perdido" };
  return {
    STATUS: STATUS, ROTULO: ROTULO,
    lista: ler,
    add: function (l) {
      var a = ler(); l.id = a.reduce(function (m, x) { return Math.max(m, x.id); }, 0) + 1;
      l.status = "novo"; l.hora = new Date().toISOString(); a.push(l); gravar(a); return l;
    },
    status: function (id, s) { var a = ler(); a.forEach(function (x) { if (x.id === id) x.status = s; }); gravar(a); },
    remover: function (id) { gravar(ler().filter(function (x) { return x.id !== id; })); },
    limpar: function () { try { localStorage.removeItem(K); } catch (e) {} },
    exemplo: function () {
      var nomes = [["Mariana Costa", "11977770001", "2d", "Quer visitar no sábado"], ["Ricardo Alves", "11977770002", "3d", "Tem FGTS e entrada de 25%"], ["Fernanda Lima", "11977770003", "cob", "Investidora, quer ver o tour"], ["Paulo Henrique", "11977770004", "2d", ""]];
      var st = ["novo", "contatado", "visita", "novo"];
      nomes.forEach(function (n, i) { var l = Leads.add({ nome: n[0], tel: n[1], interesse: n[2], contato: "whatsapp", obs: n[3], origem: "site", visita: i === 2 ? { data: "", periodo: "manhã" } : null }); Leads.status(l.id, st[i]); });
    },
    aoMudar: function (fn) { window.addEventListener("storage", function (e) { if (!e.key || e.key === K) fn(); }); }
  };
})();
