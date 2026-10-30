# Pele Nua Studio

Site institucional estático em português, responsivo e sem dependências de build.

## Executar

Na pasta `/workspace/site-teste-3`:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

## Conteúdo e contato

Os dados oficiais fornecidos estão integrados em `index.html`: endereço, horários, serviços, métricas e Instagram. Cada CTA é um link nativo do WhatsApp, com mensagem específica por tratamento, funcional mesmo sem JavaScript. Ao trocar o telefone, atualize os links de `index.html`, os dados estruturados e `config.js`.

Não há preços, depoimentos inventados ou garantias de resultados. As métricas apresentadas foram fornecidas pelo studio. A localização usa uma ilustração vetorial conceitual da marca, com links para abrir a rota real no Google Maps. A arte não é um mapa geográfico de navegação. Google Fonts é opcional e conta com fontes locais alternativas.

## Validação

```sh
node --check script.js
node --check config.js
```

Publique os arquivos estáticos em hospedagem HTTPS. Não há backend nem segredos. As animações respeitam a preferência de redução de movimento. Confirme a aparência e o redirecionamento para o aplicativo WhatsApp em dispositivos reais antes de publicar.

## Direção editorial

As fotografias em `assets/` foram geradas por IA para uso ilustrativo, convertidas para WebP e não representam clientes, resultados ou instalações reais. O aviso está visível na página. Substitua-as por registros autorizados da marca quando disponíveis. As imagens fora do hero usam carregamento lazy. Cada tratamento possui uma foto ilustrativa própria, exibida em miniatura no acordeão fechado e ampliada no painel aberto.

A iconografia é SVG customizada. Os serviços mantêm `<details>` nativo e CTAs independentes de JavaScript. Movimentos de parallax, botões e revelação respeitam `prefers-reduced-motion`.
