# Página de empreendimento com tour 3D (amostra novapicks)

Demonstração para vender a corretores, imobiliárias e construtoras. HTML, CSS e JavaScript puros, sem build e sem servidor. Empreendimento, preços e contatos são fictícios.

## Páginas
- `index.html` — página de lançamento: hero com fachada ilustrada, diferenciais e lazer, plantas por tipologia (desenhadas em código), tour 3D, simulador de parcela, localização e formulário de contato com pedido de visita e autorização LGPD. Botão flutuante de WhatsApp.
- `leads.html` — painel do corretor: contatos recebidos, situação (novo, contatado, visita, proposta, perdido), botão de WhatsApp, exportação CSV e contatos de exemplo para demonstrar.
- `qr.html` — placa de QR para stand, panfleto e vitrine.
- `apresentacao.html` — proposta comercial (valores de exemplo).

## Tour 3D
A seção embute o tour publicado em `savio13-desig/tour-apartamento` (apartamento de exemplo de 77 m², feito em Three.js a partir de planta, sem arquivo CAD da construtora). Carrega só quando o visitante clica, para não pesar no celular. Para outro empreendimento, aponte `tour` em `js/dados.js` para o tour daquela unidade.

## Adaptar para um novo empreendimento
Edite `js/dados.js` (nome, bairro, entrega, WhatsApp, números, diferenciais, lazer, localização, plantas com cômodos e preços, taxa do simulador, `tour` e `video`) e as cores em `css/estilo.css` (`:root`). O `video` aceita o ID de um vídeo do YouTube; vazio oculta a seção. Para usar fotos reais, troque `Arte.fachada()` em `js/arte.js` por uma imagem.

## Rodar local
```
python -m http.server 8767
```
Abra http://localhost:8767/apresentacao.html

## Limitações desta amostra
- Os contatos ficam no navegador (localStorage, em `js/leads.js`). A página e o painel só se enxergam no mesmo aparelho e navegador. A versão final grava num banco online, avisa o corretor por WhatsApp ou e-mail e coloca login no painel.
- O simulador usa a tabela Price com taxa fixa configurável. É ilustrativo, sem seguros, taxas ou análise de crédito.
- Plantas são ilustrações simples a partir de uma lista de cômodos, não plantas técnicas.
- `vendor/qrcode.js`: qrcode-generator 1.4.4 (Kazuhiko Arase, licença MIT).
