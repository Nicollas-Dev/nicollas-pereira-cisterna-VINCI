<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

defineEmits(['open-models', 'open-test-drive'])

const introduction = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."
const featureDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
const images = {
  hero: 'assets/images/6ba2be9440ea9583a2ecd62975a9f4b4353dd41e.png',
  road: 'assets/images/1a0a65569f03e1afe1b090b1d6173da9866fa6b9.jpg',
  details: 'assets/images/d91dce667b4263e0f3ea01c50edf8e89ace50c89.png',
  chevron: 'assets/icons/chevron-down.svg',
}
const statistics = [
  { value: '520 KM', label: 'COM 1 CARGA' },
  { value: '2.800 RPM', label: 'de torque' },
  { value: '10 anos', label: 'garantia' },
]
const features = [
  { title: 'recarga rápida', image: 'assets/images/c69262891b72a50a33022edd3430ae0c2767da23.png', alt: 'Motorista junto ao carro elétrico' },
  { title: 'painel de instrumentos', image: 'assets/images/f1986a1946c175fdc919bc48646fbb730bf956eb.png', alt: 'Painel digital de instrumentos' },
  { title: 'pontos de regarga', image: 'assets/images/1629250aedaf8118dc8682eaa5940dd8fe758ba4.png', alt: 'Conector de recarga do veículo' },
  { title: 'design premiado', image: 'assets/images/d1d1771070730b882c2dd5f9dfb01a35b2057c49.png', alt: 'Interior e acabamento do veículo' },
]
const details = [
  { key: 'A', label: 'Retrovisores inteligentes', accessibleLabel: 'Retrovisores inteligentes', x: '15.54935%', y: '30.62914%' },
  { key: 'B', label: 'RODAS DE LIGA LEVE', accessibleLabel: 'Rodas de liga leve', x: '10.80074%', y: '66.05960%' },
  { key: 'C', label: 'RECONHECIMENTO DE DIGITAL', accessibleLabel: 'Reconhecimento de digital', x: '30.26071%', y: '38.90728%' },
  { key: 'D', label: 'sensor de proximidade', accessibleLabel: 'Sensor de proximidade', x: '54.46927%', y: '35.09934%' },
  { key: 'E', label: 'antena 5g', accessibleLabel: 'Antena 5G', x: '65.64246%', y: '13.41060%' },
  { key: 'F', label: 'design sofisticado', accessibleLabel: 'Design sofisticado', x: '63.96648%', y: '58.11258%' },
  { key: 'G', label: 'abertura automática', accessibleLabel: 'Abertura automática', x: '78.39851%', y: '33.60927%' },
  { key: 'H', label: 'câmera de estacionamento', accessibleLabel: 'Câmera de estacionamento', x: '93.01676%', y: '68.87417%' },
]
const questions = [
  {
    question: 'Qual é a autonomia real da bateria em diferentes condições de condução?',
    answer: 'A autonomia apresentada para o Model V2 é de 520 km com uma carga. As condições de condução, a velocidade, o clima e o uso de acessórios podem influenciar a autonomia.',
  },
  {
    question: 'Quanto tempo o carro leva para carregar em tomadas residenciais e em carregadores rápidos?',
    answer: 'O tempo de recarga depende da potência do carregador, da instalação elétrica e da carga disponível na bateria. Carregadores rápidos permitem recargas em menos tempo que tomadas residenciais.',
  },
  {
    question: 'Como funciona a infraestrutura de recarga para viagens de longa distância?',
    answer: 'Planeje a viagem considerando a autonomia do veículo e os pontos de recarga disponíveis no trajeto. Verifique a compatibilidade e a disponibilidade dos carregadores antes de sair.',
  },
  {
    question: 'Qual é o tempo de garantia da bateria e qual a sua vida útil estimada?',
    answer: 'O projeto apresenta 10 anos de garantia. A vida útil da bateria depende das condições de uso e dos cuidados com a recarga.',
  },
  {
    question: 'Quais são as principais economias em manutenção e impostos comparado a um carro a combustão?',
    answer: 'Veículos elétricos dispensam itens de manutenção ligados ao motor a combustão. Custos de energia e benefícios tributários variam conforme o uso do veículo e a região.',
  },
]

// The legend and the vehicle markers share the same reactive selection.
const selectedDetail = ref(null)
const activeDetail = computed(() => details.find(detail => detail.key === selectedDetail.value))
const pointStyle = detail => ({ '--x': detail.x, '--y': detail.y })
const tooltipStyle = computed(() => activeDetail.value ? pointStyle(activeDetail.value) : undefined)

function toggleDetail(key) {
  selectedDetail.value = selectedDetail.value === key ? null : key
}

function handleEscape(event) {
  if (event.key === 'Escape') selectedDetail.value = null
}

onMounted(() => document.addEventListener('keydown', handleEscape))
onBeforeUnmount(() => document.removeEventListener('keydown', handleEscape))
</script>

<template>
  <main id="conteudo" class="carro-main">
    <section class="carro-hero" aria-labelledby="model-title">
      <img class="carro-hero-image" :src="images.hero" width="947" height="533" alt="VINCI Model V2 branco visto de lado" fetchpriority="high">
      <div class="carro-hero-copy">
        <h1 id="model-title">VINCI MODEL V2</h1>
        <p>{{ introduction }}</p>
        <div class="carro-hero-actions">
          <button class="carro-button carro-button-primary" type="button" data-open-models @click="$emit('open-models', $event)"><span>Modelos</span></button>
          <button class="carro-button" type="button" data-open-test-drive @click="$emit('open-test-drive')"><span>Test Drive</span></button>
        </div>
      </div>
    </section>

    <section class="carro-performance" aria-label="Tecnologia aliada ao futuro">
      <p class="carro-performance-intro">tecnologia aliada ao futuro</p>
      <div class="carro-stats">
        <div v-for="statistic in statistics" :key="statistic.value" class="carro-stat">
          <p class="carro-stat-value">{{ statistic.value }}</p>
          <p class="carro-stat-label">{{ statistic.label }}</p>
        </div>
      </div>
    </section>

    <div class="carro-road-image">
      <img :src="images.road" width="1360" height="520" alt="Carro elétrico em uma estrada ao pôr do sol" loading="lazy">
    </div>

    <section class="carro-features" aria-label="Características do Model V2">
      <article v-for="feature in features" :key="feature.title" class="carro-feature">
        <div class="carro-feature-copy"><h2>{{ feature.title }}</h2><p>{{ featureDescription }}</p></div>
        <img :src="feature.image" width="360" height="272" :alt="feature.alt" loading="lazy">
      </article>
    </section>

    <section class="carro-details" aria-labelledby="details-title">
      <div class="carro-details-header">
        <div class="carro-details-intro"><h2 id="details-title">VINCI MODEL V2</h2><p>{{ introduction }}</p></div>
        <ol class="carro-detail-legend" aria-label="Detalhes do veículo">
          <li v-for="detail in details" :key="detail.key">
            <button
              type="button"
              :data-detail="detail.key"
              :class="{ 'is-active': selectedDetail === detail.key }"
              :aria-pressed="selectedDetail === detail.key"
              @click="toggleDetail(detail.key)"
            ><span>{{ detail.key }}</span>{{ detail.label }}</button>
          </li>
        </ol>
      </div>
      <div class="carro-detail-image">
        <img :src="images.details" width="1074" height="604" alt="Vista traseira lateral do VINCI Model V2 com oito detalhes interativos">
        <button
          v-for="detail in details"
          :key="detail.key"
          type="button"
          class="carro-hotspot"
          :class="{ 'is-active': selectedDetail === detail.key }"
          :style="pointStyle(detail)"
          :data-detail="detail.key"
          :aria-label="`${detail.key}: ${detail.accessibleLabel}`"
          :aria-pressed="selectedDetail === detail.key"
          @click="toggleDetail(detail.key)"
        >{{ detail.key }}</button>
        <output class="carro-hotspot-tooltip" aria-live="polite" :hidden="!activeDetail" :style="tooltipStyle">{{ activeDetail?.label || '' }}</output>
      </div>
    </section>

    <section class="carro-faq" aria-labelledby="faq-title">
      <h2 id="faq-title">FAQ</h2>
      <p class="carro-faq-subtitle">PERGUNTAS FREQUENTES</p>
      <div class="carro-faq-list">
        <details v-for="item in questions" :key="item.question">
          <summary><span>{{ item.question }}</span><img :src="images.chevron" width="24" height="12" alt=""></summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </section>
  </main>
  <div class="carro-footer-divider"></div>
</template>

