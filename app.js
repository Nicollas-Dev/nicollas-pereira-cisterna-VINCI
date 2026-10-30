(() => {
  'use strict';

  const storageKey = 'vinci-academic-test-drive';
  let activeDialog = null;
  let returnFocus = null;

  const localToday = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  function readBooking() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || 'null');
      return value && typeof value === 'object' ? value : null;
    } catch {
      return null;
    }
  }

  function openDialog(title, content, className = '') {
    const previousFocus = activeDialog && returnFocus?.isConnected ? returnFocus : document.activeElement;
    const previousDialog = activeDialog;
    activeDialog = null;
    previousDialog?.close();
    previousDialog?.remove();
    const dialog = document.createElement('dialog');
    dialog.className = `vinci-dialog ${className}`.trim();
    dialog.setAttribute('aria-labelledby', 'vinci-dialog-title');
    dialog.innerHTML = `
      <div class="vinci-dialog__body">
        <button class="vinci-dialog__close" type="button" data-close-dialog aria-label="Fechar janela">×</button>
        <p class="vinci-dialog__eyebrow">VINCI ELECTRIC VEHICLES</p>
        <h2 id="vinci-dialog-title"></h2>
        <div class="vinci-dialog__content">${content}</div>
      </div>`;
    dialog.querySelector('h2').textContent = title;
    returnFocus = previousFocus;
    activeDialog = dialog;
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
      }
      if (event.target.closest('[data-close-dialog]')) dialog.close();
    });
    dialog.addEventListener('close', () => {
      dialog.remove();
      if (activeDialog === dialog) {
        activeDialog = null;
        if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
      }
    }, { once: true });
    document.body.append(dialog);
    dialog.showModal();
    return dialog;
  }

  function formatDate(value) {
    const [year, month, day] = value.split('-').map(Number);
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(year, month - 1, day, 12));
  }

  function bookingConfirmation(dialog, booking, saved) {
    const content = dialog.querySelector('.vinci-dialog__content');
    content.innerHTML = `
      <section class="vinci-dialog__confirmation" role="status" aria-live="polite" tabindex="-1">
        <h3>Demonstração ${saved ? 'salva' : 'preenchida'}</h3>
        <p class="vinci-dialog__confirmation-summary"></p>
        <p>${saved ? 'Os dados foram salvos somente neste navegador.' : 'O navegador não permitiu salvar os dados. Você pode tentar novamente depois.'} Este é um formulário acadêmico: nenhum agendamento real foi feito e nenhum dado foi enviado.</p>
      </section>
      <div class="vinci-dialog__actions">
        ${saved ? '<button type="button" class="vinci-dialog__button vinci-dialog__button--outline" data-clear-booking>Apagar dados salvos</button>' : ''}
        <button type="button" class="vinci-dialog__button" data-close-dialog>Concluir</button>
      </div>`;
    content.querySelector('.vinci-dialog__confirmation-summary').textContent = `${booking.nome}, sua seleção de demonstração é ${booking.modelo}, em ${formatDate(booking.data)}, na ${booking.unidade}.`;
    content.querySelector('[role="status"]').focus();
    content.querySelector('[data-clear-booking]')?.addEventListener('click', (event) => {
      try {
        localStorage.removeItem(storageKey);
        content.querySelector('.vinci-dialog__confirmation-summary').textContent = 'Os dados desta demonstração foram apagados deste navegador.';
        event.currentTarget.remove();
        content.querySelector('[role="status"]').focus();
      } catch {
        content.querySelector('.vinci-dialog__confirmation-summary').textContent = 'Não foi possível acessar o armazenamento deste navegador.';
      }
    });
  }

  function openTestDrive(trigger) {
    const dialog = openDialog('Agende um test drive', `
      <p class="vinci-dialog__notice">Demonstração acadêmica. Os dados ficam apenas neste navegador. Nenhum agendamento real é feito e nada é enviado.</p>
      <form class="vinci-booking-form">
        <div class="vinci-dialog__fields">
          <label class="vinci-dialog__field vinci-dialog__field--wide">Nome completo
            <input name="nome" autocomplete="name" required minlength="3" maxlength="100" placeholder="Seu nome completo">
          </label>
          <label class="vinci-dialog__field">E-mail
            <input type="email" name="email" autocomplete="email" required maxlength="150" placeholder="voce@exemplo.com">
          </label>
          <label class="vinci-dialog__field">Telefone
            <input type="tel" name="telefone" autocomplete="tel" inputmode="tel" required maxlength="16" placeholder="(11) 99999-9999" aria-describedby="vinci-phone-help">
            <small id="vinci-phone-help">Informe o DDD e o número.</small>
          </label>
          <label class="vinci-dialog__field">Modelo
            <select name="modelo" required>
              <option value="">Selecione um modelo</option>
              <option>VINCI MODEL V1</option><option>VINCI MODEL V2</option><option>VINCI MODEL V3</option>
            </select>
          </label>
          <label class="vinci-dialog__field">Data
            <input type="date" name="data" required>
          </label>
          <label class="vinci-dialog__field vinci-dialog__field--wide">Unidade de demonstração
            <select name="unidade" required>
              <option value="">Selecione uma unidade fictícia</option>
              <option>Unidade demonstrativa — São Paulo</option>
              <option>Unidade demonstrativa — Curitiba</option>
              <option>Unidade demonstrativa — Rio de Janeiro</option>
            </select>
          </label>
        </div>
        <p class="vinci-dialog__required">Todos os campos são obrigatórios. As unidades são fictícias.</p>
        <p class="vinci-dialog__saved-note" hidden>Há uma demonstração salva neste navegador. Você pode editar os campos abaixo.</p>
        <button class="vinci-dialog__button vinci-dialog__button--full" type="submit">Salvar demonstração</button>
      </form>`, 'vinci-dialog--booking');

    const form = dialog.querySelector('form');
    form.elements.data.min = localToday();
    const previousBooking = readBooking();
    if (previousBooking) {
      for (const name of ['nome', 'email', 'telefone', 'modelo', 'data', 'unidade']) {
        if (typeof previousBooking[name] === 'string') form.elements[name].value = previousBooking[name].slice(0, 150);
      }
      if (form.elements.data.value < localToday()) form.elements.data.value = '';
      dialog.querySelector('.vinci-dialog__saved-note').hidden = false;
    }
    const requestedModel = trigger?.dataset.model;
    if (requestedModel && [...form.elements.modelo.options].some(option => option.value === requestedModel)) form.elements.modelo.value = requestedModel;

    const phone = form.elements.telefone;
    const validatePhone = () => {
      const digits = phone.value.replace(/\D/g, '');
      phone.setCustomValidity(digits.length >= 10 && digits.length <= 11 ? '' : 'Informe um telefone com DDD, com 10 ou 11 dígitos.');
    };
    phone.addEventListener('input', validatePhone);
    form.elements.nome.addEventListener('input', () => form.elements.nome.setCustomValidity(''));
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.elements.nome.value = form.elements.nome.value.trim();
      form.elements.nome.setCustomValidity(form.elements.nome.value.length >= 3 ? '' : 'Informe seu nome completo, com pelo menos 3 caracteres.');
      validatePhone();
      form.elements.data.min = localToday();
      if (!form.reportValidity()) return;
      const booking = Object.fromEntries(new FormData(form).entries());
      let saved = false;
      try {
        localStorage.setItem(storageKey, JSON.stringify(booking));
        saved = true;
      } catch { /* The confirmation explains unavailable browser storage. */ }
      bookingConfirmation(dialog, booking, saved);
    });
  }

  function openOffers() {
    openDialog('Conheça os modelos', `
      <p>Explore os veículos do catálogo VINCI.</p>
      <div class="vinci-dialog__models">
        <a class="vinci-dialog__model" href="carro.html">
          <img src="assets/images/41c49521bc684aa43c70f4f353609d8ee65d1a89.png" width="1480" height="1012" alt="VINCI MODEL V1">
          <span>VINCI MODEL V1</span><span class="vinci-dialog__model-link">Conheça o modelo →</span>
        </a>
        <a class="vinci-dialog__model" href="carro.html">
          <img src="assets/images/d91dce667b4263e0f3ea01c50edf8e89ace50c89.png" width="1480" height="833" alt="VINCI MODEL V2">
          <span>VINCI MODEL V2</span><span class="vinci-dialog__model-link">Conheça o modelo →</span>
        </a>
      </div>
      <p class="vinci-dialog__notice">Catálogo demonstrativo de um projeto acadêmico. Não há oferta comercial ou compra real.</p>`, 'vinci-dialog--wide');
  }

  function openStores() {
    const dialog = openDialog('Encontre uma loja', `
      <p>O VINCI é apresentado neste trabalho como uma marca fictícia. As unidades abaixo servem apenas para demonstrar a navegação e não correspondem a lojas reais.</p>
      <label class="vinci-dialog__field">Cidade de demonstração
        <select name="cidade"><option value="">Selecione uma cidade</option><option>São Paulo</option><option>Curitiba</option><option>Rio de Janeiro</option></select>
      </label>
      <p class="vinci-dialog__store-result" role="status" aria-live="polite">Escolha uma cidade para visualizar a unidade fictícia.</p>
      <div class="vinci-dialog__actions"><button class="vinci-dialog__button" type="button" data-open-test-drive>Simular test drive</button></div>`);
    dialog.querySelector('select').addEventListener('change', (event) => {
      dialog.querySelector('.vinci-dialog__store-result').textContent = event.target.value
        ? `Unidade demonstrativa — ${event.target.value}. Local fictício, sem endereço ou atendimento real.`
        : 'Escolha uma cidade para visualizar a unidade fictícia.';
    });
  }

  function openInfo(trigger) {
    const title = trigger.dataset.openInfo || trigger.dataset.infoTitle || trigger.textContent.trim() || 'Sobre a VINCI';
    const normalized = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    let detail = 'Explore os modelos e os recursos apresentados nas telas para conhecer este catálogo demonstrativo.';
    if (/privacidade/.test(normalized)) detail = 'O formulário de demonstração salva os dados apenas no armazenamento local deste navegador. Nenhum dado do formulário é enviado. Você pode apagar uma demonstração salva na tela de confirmação.';
    else if (/contato|atendimento|sac|suporte|canais|redes/.test(normalized)) detail = 'Os canais de atendimento fazem parte do layout demonstrativo. Este projeto não oferece atendimento comercial ou suporte de uma fabricante real.';
    else if (/servico|qualidade/.test(normalized)) detail = 'Os serviços e as características dos veículos reproduzem o conteúdo demonstrativo do catálogo. Não há contratação ou prestação de serviços reais.';
    else if (/marca|sobre|historia|investidor/.test(normalized)) detail = 'A identidade VINCI e o catálogo de veículos fazem parte da proposta visual deste projeto acadêmico.';
    const dialog = openDialog(title, `
      <p class="vinci-dialog__info"></p>
      <p class="vinci-dialog__notice">Projeto acadêmico demonstrativo. A marca, os veículos e os serviços são apresentados para fins de estudo.</p>
      <div class="vinci-dialog__actions"><button type="button" class="vinci-dialog__button" data-close-dialog>Entendi</button></div>`);
    dialog.querySelector('.vinci-dialog__info').textContent = detail;
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-open-test-drive], [data-open-offers], [data-open-stores], [data-open-info]');
    if (!trigger) return;
    event.preventDefault();
    if (trigger.hasAttribute('data-open-test-drive')) openTestDrive(trigger);
    else if (trigger.hasAttribute('data-open-offers')) openOffers();
    else if (trigger.hasAttribute('data-open-stores')) openStores();
    else openInfo(trigger);
  });
})();
