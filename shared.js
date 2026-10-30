/* Shared VINCI components: original Figma header, footer and vehicles menu. */
(() => {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  const brand = '<a class="brand" href="./" aria-label="VINCI — início"><img src="assets/vinci-logo.svg" width="224" height="34" alt="VINCI"></a>';
  if (header) header.innerHTML = `<header class="site-header">${brand}<nav class="desktop-nav" aria-label="Navegação principal"><a href="./">Home</a><button data-open-info="Sobre a VINCI">Sobre</button><button data-open-models aria-expanded="false" aria-controls="models-menu">Veículos</button><button data-open-info="Serviços">Serviços</button><button data-open-test-drive>Test Drive</button></nav><button class="mobile-nav-toggle" data-open-models aria-expanded="false" aria-controls="models-menu" aria-label="Abrir menu de veículos">☰</button></header>`;
  if (footer) footer.innerHTML = `<footer class="site-footer" id="contato"><div class="footer-content"><div class="footer-brand">${brand}</div><section class="footer-column"><h2>SOBRE</h2><ul>${['A Marca','História','Qualidade','Onde estamos','Investidores'].map(label=>`<li><button data-open-info="${label}">${label}</button></li>`).join('')}</ul></section><section class="footer-column"><h2>CONTATO</h2><ul>${['Fale Conosco','Atendimento','SAC'].map(label=>`<li><button data-open-info="${label}">${label}</button></li>`).join('')}</ul></section><section class="footer-column"><h2>SAC</h2><ul>${['Canais Oficiais','Redes Sociais','Suporte'].map(label=>`<li><button data-open-info="${label}">${label}</button></li>`).join('')}</ul></section><p class="copyright">©Copyright 2026.<br>Todos os Direitos Reservados.</p></div></footer>`;

  const cars = [
    ['6ba2be9440ea9583a2ecd62975a9f4b4353dd41e','V1'],
    ['0a41fda59a7e7b2282b21c7c6553b138a6941ebe','V2'],
    ['fbbb7fa656a49658d138a9e63aa06d1d7cd55131','V3'],
    ['b97fcf5f2fdd1702a7b5a448a3dac2990601f4b5','V1'],
    ['6ba2be9440ea9583a2ecd62975a9f4b4353dd41e','V1'],
    ['6ba2be9440ea9583a2ecd62975a9f4b4353dd41e','V1']
  ];
  const menu = document.createElement('section');
  menu.id='models-menu';menu.className='models-menu';menu.hidden=true;menu.setAttribute('aria-label','Modelos VINCI');
  menu.innerHTML=`<div class="models-grid">${cars.map(([image,model])=>`<article class="menu-model"><a class="menu-image" href="carro.html" aria-label="Conheça o modelo ${model}"><img src="assets/images/${image}.png" width="295" height="144" alt="VINCI Modelo ${model}"></a><h2>MODELO ${model}</h2><div class="menu-actions"><a href="carro.html">Ver mais</a><button data-open-test-drive>Comprar</button></div></article>`).join('')}</div><nav class="menu-links" aria-label="Navegue"><h2>NAVEGUE</h2><ul><li><button data-open-offers>OFERTAS</button></li><li><button data-open-test-drive>TEST DRIVE</button></li><li><button data-open-stores>LOJAS</button></li><li><button data-open-info="Serviços">SERVIÇOS</button></li><li><button data-open-info="SAC">SAC</button></li><li><button data-open-info="Privacidade">PRIVACIDADE</button></li></ul></nav><button class="menu-close" aria-label="Fechar menu de veículos">×</button>`;
  header?.append(menu);
  let trigger = null;
  const setOpen = (open, source) => {
    menu.hidden=!open;
    document.querySelectorAll('[data-open-models]').forEach(el=>el.setAttribute('aria-expanded',String(open)));
    if(open){trigger=source;window.scrollTo({top:0,behavior:'instant'});menu.querySelector('a')?.focus({preventScroll:true});}
  };
  document.addEventListener('click', event=>{
    const open=event.target.closest('[data-open-models]');
    if(open){setOpen(menu.hidden,open);return;}
    if(event.target.closest('.menu-close')){setOpen(false);trigger?.focus();return;}
    if(!menu.hidden&&!event.target.closest('#site-header'))setOpen(false);
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){setOpen(false);trigger?.focus();}});
})();
