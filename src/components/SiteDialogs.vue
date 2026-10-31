<script setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';

const props = defineProps({
  kind: { type: String, default: null },
  title: { type: String, default: '' },
  model: { type: String, default: '' }
});
const emit = defineEmits(['close', 'open-test-drive']);

const storageKey = 'vinci-academic-test-drive';
const dialog = ref(null);
const closeButton = ref(null);
const bookingForm = ref(null);
const nameInput = ref(null);
const phoneInput = ref(null);
const confirmationRegion = ref(null);
const minimumDate = ref(localToday());
const previousBooking = ref(false);
const confirmation = ref(null);
const saved = ref(false);
const clearMessage = ref('');
const city = ref('');
const booking = reactive({ nome: '', email: '', telefone: '', modelo: '', data: '', unidade: '' });
const cities = ['São Paulo', 'Curitiba', 'Rio de Janeiro'];
const models = ['VINCI MODEL V1', 'VINCI MODEL V2', 'VINCI MODEL V3'];
const units = cities.map(name => `Unidade demonstrativa — ${name}`);
const offerModels = [
  { name: 'VINCI MODEL V1', image: '41c49521bc684aa43c70f4f353609d8ee65d1a89.png', height: 1012 },
  { name: 'VINCI MODEL V2', image: 'd91dce667b4263e0f3ea01c50edf8e89ace50c89.png', height: 833 }
];
let returnFocus = null;

const heading = computed(() => ({
  'test-drive': 'Agende um test drive',
  offers: 'Conheça os modelos',
  stores: 'Encontre uma loja',
  info: props.title || 'Sobre a VINCI'
}[props.kind] || 'Sobre a VINCI'));

const infoDetail = computed(() => {
  const normalized = heading.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (/privacidade/.test(normalized)) return 'O formulário de demonstração salva os dados apenas no armazenamento local deste navegador. Nenhum dado do formulário é enviado. Você pode apagar uma demonstração salva na tela de confirmação.';
  if (/contato|atendimento|sac|suporte|canais|redes/.test(normalized)) return 'Os canais de atendimento fazem parte do layout demonstrativo. Este projeto não oferece atendimento comercial ou suporte de uma fabricante real.';
  if (/servico|qualidade/.test(normalized)) return 'Os serviços e as características dos veículos reproduzem o conteúdo demonstrativo do catálogo. Não há contratação ou prestação de serviços reais.';
  if (/marca|sobre|historia|investidor/.test(normalized)) return 'A identidade VINCI e o catálogo de veículos fazem parte da proposta visual deste projeto acadêmico.';
  return 'Explore os modelos e os recursos apresentados nas telas para conhecer este catálogo demonstrativo.';
});

const confirmationSummary = computed(() => {
  if (clearMessage.value) return clearMessage.value;
  if (!confirmation.value) return '';
  const value = confirmation.value;
  return `${value.nome}, sua seleção de demonstração é ${value.modelo}, em ${formatDate(value.data)}, na ${value.unidade}.`;
});

const storeResult = computed(() => city.value
  ? `Unidade demonstrativa — ${city.value}. Local fictício, sem endereço ou atendimento real.`
  : 'Escolha uma cidade para visualizar a unidade fictícia.');

function localToday() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function formatDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(year, month - 1, day, 12));
}

function readBooking() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || 'null');
    return value && typeof value === 'object' ? value : null;
  } catch {
    return null;
  }
}

function resetView() {
  city.value = '';
  confirmation.value = null;
  clearMessage.value = '';
  saved.value = false;
  previousBooking.value = false;
  minimumDate.value = localToday();
  for (const key of Object.keys(booking)) booking[key] = '';
  if (props.kind !== 'test-drive') return;
  const previous = readBooking();
  if (previous) {
    for (const key of Object.keys(booking)) {
      if (typeof previous[key] === 'string') booking[key] = previous[key].slice(0, 150);
    }
    if (booking.data < minimumDate.value) booking.data = '';
    if (!models.includes(booking.modelo)) booking.modelo = '';
    if (!units.includes(booking.unidade)) booking.unidade = '';
    previousBooking.value = true;
  }
  if (models.includes(props.model)) booking.modelo = props.model;
}

function validatePhone(event) {
  const digits = (event?.target?.value ?? booking.telefone).replace(/\D/g, '');
  phoneInput.value?.setCustomValidity(digits.length >= 10 && digits.length <= 11
    ? ''
    : 'Informe um telefone com DDD, com 10 ou 11 dígitos.');
}

function resetNameValidity() {
  nameInput.value?.setCustomValidity('');
}

async function saveBooking() {
  booking.nome = booking.nome.trim();
  nameInput.value?.setCustomValidity(booking.nome.length >= 3
    ? ''
    : 'Informe seu nome completo, com pelo menos 3 caracteres.');
  validatePhone();
  minimumDate.value = localToday();
  await nextTick();
  if (!bookingForm.value?.reportValidity()) return;
  const value = { ...booking };
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
    saved.value = true;
  } catch {
    saved.value = false;
  }
  confirmation.value = value;
  await nextTick();
  confirmationRegion.value?.focus();
}

async function clearBooking() {
  try {
    localStorage.removeItem(storageKey);
    saved.value = false;
    clearMessage.value = 'Os dados desta demonstração foram apagados deste navegador.';
  } catch {
    clearMessage.value = 'Não foi possível acessar o armazenamento deste navegador.';
  }
  await nextTick();
  confirmationRegion.value?.focus();
}

function close() {
  emit('close');
}

function closeFromBackdrop(event) {
  if (event.target !== dialog.value) return;
  const bounds = dialog.value.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
}

watch(() => props.kind, async () => {
  resetView();
  await nextTick();
  if (dialog.value?.open) (nameInput.value || closeButton.value)?.focus();
}, { immediate: true });
watch(() => props.model, value => {
  if (props.kind === 'test-drive' && models.includes(value)) booking.modelo = value;
});

onMounted(() => {
  returnFocus = document.activeElement;
  dialog.value?.showModal();
});

onUnmounted(() => {
  if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
});
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="vinci-dialog"
      :class="{ 'vinci-dialog--booking': kind === 'test-drive', 'vinci-dialog--wide': kind === 'offers' }"
      aria-labelledby="vinci-dialog-title"
      @cancel.prevent="close"
      @click="closeFromBackdrop"
    >
      <div class="vinci-dialog__body">
        <button ref="closeButton" class="vinci-dialog__close" type="button" aria-label="Fechar janela" @click="close">×</button>
        <p class="vinci-dialog__eyebrow">VINCI ELECTRIC VEHICLES</p>
        <h2 id="vinci-dialog-title">{{ heading }}</h2>
        <div class="vinci-dialog__content">
          <template v-if="kind === 'test-drive'">
            <template v-if="confirmation">
              <section ref="confirmationRegion" class="vinci-dialog__confirmation" role="status" aria-live="polite" tabindex="-1">
                <h3>Demonstração {{ clearMessage ? 'apagada' : saved ? 'salva' : 'preenchida' }}</h3>
                <p class="vinci-dialog__confirmation-summary">{{ confirmationSummary }}</p>
                <p><template v-if="!clearMessage">{{ saved ? 'Os dados foram salvos somente neste navegador.' : 'O navegador não permitiu salvar os dados. Você pode tentar novamente depois.' }} </template>Este é um formulário acadêmico: nenhum agendamento real foi feito e nenhum dado foi enviado.</p>
              </section>
              <div class="vinci-dialog__actions">
                <button v-if="saved" type="button" class="vinci-dialog__button vinci-dialog__button--outline" @click="clearBooking">Apagar dados salvos</button>
                <button type="button" class="vinci-dialog__button" @click="close">Concluir</button>
              </div>
            </template>
            <template v-else>
              <p class="vinci-dialog__notice">Demonstração acadêmica. Os dados ficam apenas neste navegador. Nenhum agendamento real é feito e nada é enviado.</p>
              <form ref="bookingForm" class="vinci-booking-form" @submit.prevent="saveBooking">
                <div class="vinci-dialog__fields">
                  <label class="vinci-dialog__field vinci-dialog__field--wide">Nome completo
                    <input ref="nameInput" v-model="booking.nome" name="nome" autocomplete="name" required minlength="3" maxlength="100" placeholder="Seu nome completo" @input="resetNameValidity">
                  </label>
                  <label class="vinci-dialog__field">E-mail
                    <input v-model="booking.email" type="email" name="email" autocomplete="email" required maxlength="150" placeholder="voce@exemplo.com">
                  </label>
                  <label class="vinci-dialog__field">Telefone
                    <input ref="phoneInput" v-model="booking.telefone" type="tel" name="telefone" autocomplete="tel" inputmode="tel" required maxlength="16" placeholder="(11) 99999-9999" aria-describedby="vinci-phone-help" @input="validatePhone">
                    <small id="vinci-phone-help">Informe o DDD e o número.</small>
                  </label>
                  <label class="vinci-dialog__field">Modelo
                    <select v-model="booking.modelo" name="modelo" required>
                      <option value="">Selecione um modelo</option>
                      <option v-for="modelName in models" :key="modelName">{{ modelName }}</option>
                    </select>
                  </label>
                  <label class="vinci-dialog__field">Data
                    <input v-model="booking.data" type="date" name="data" :min="minimumDate" required>
                  </label>
                  <label class="vinci-dialog__field vinci-dialog__field--wide">Unidade de demonstração
                    <select v-model="booking.unidade" name="unidade" required>
                      <option value="">Selecione uma unidade fictícia</option>
                      <option v-for="unit in units" :key="unit">{{ unit }}</option>
                    </select>
                  </label>
                </div>
                <p class="vinci-dialog__required">Todos os campos são obrigatórios. As unidades são fictícias.</p>
                <p v-if="previousBooking" class="vinci-dialog__saved-note">Há uma demonstração salva neste navegador. Você pode editar os campos abaixo.</p>
                <button class="vinci-dialog__button vinci-dialog__button--full" type="submit">Salvar demonstração</button>
              </form>
            </template>
          </template>

          <template v-else-if="kind === 'offers'">
            <p>Explore os veículos do catálogo VINCI.</p>
            <div class="vinci-dialog__models">
              <a v-for="offer in offerModels" :key="offer.name" class="vinci-dialog__model" href="carro.html">
                <img :src="`assets/images/${offer.image}`" width="1480" :height="offer.height" :alt="offer.name">
                <span>{{ offer.name }}</span><span class="vinci-dialog__model-link">Conheça o modelo →</span>
              </a>
            </div>
            <p class="vinci-dialog__notice">Catálogo demonstrativo de um projeto acadêmico. Não há oferta comercial ou compra real.</p>
          </template>

          <template v-else-if="kind === 'stores'">
            <p>O VINCI é apresentado neste trabalho como uma marca fictícia. As unidades abaixo servem apenas para demonstrar a navegação e não correspondem a lojas reais.</p>
            <label class="vinci-dialog__field">Cidade de demonstração
              <select v-model="city" name="cidade">
                <option value="">Selecione uma cidade</option>
                <option v-for="cityName in cities" :key="cityName">{{ cityName }}</option>
              </select>
            </label>
            <p class="vinci-dialog__store-result" role="status" aria-live="polite">{{ storeResult }}</p>
            <div class="vinci-dialog__actions"><button class="vinci-dialog__button" type="button" @click="emit('open-test-drive')">Simular test drive</button></div>
          </template>

          <template v-else>
            <p class="vinci-dialog__info">{{ infoDetail }}</p>
            <p class="vinci-dialog__notice">Projeto acadêmico demonstrativo. A marca, os veículos e os serviços são apresentados para fins de estudo.</p>
            <div class="vinci-dialog__actions"><button type="button" class="vinci-dialog__button" @click="close">Entendi</button></div>
          </template>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>
