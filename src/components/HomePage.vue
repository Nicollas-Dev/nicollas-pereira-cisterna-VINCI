<script setup>
defineEmits(['open-models', 'open-test-drive', 'open-offers', 'open-stores']);
const models = [
  { id: 'v2', name: 'V2', image: 'd91dce667b4263e0f3ea01c50edf8e89ace50c89.png', alt: 'VINCI Model V2, SUV branco visto de trás', height: 833 },
  { id: 'v1', name: 'V1', image: '41c49521bc684aa43c70f4f353609d8ee65d1a89.png', alt: 'VINCI Model V1, hatch vermelho visto de frente', height: 1012 }
];
const specifications = [
  ['Potência;', '300 cavalos'], ['Autonomia:', '500km por carga'],
  ['Peso:', '1.500 kg'], ['Tecnologia:', 'GPS e Smartink']
];
const images = {
  hero: 'assets/images/4d6fb95259103ca5bb798aeb6a4dc380baf1d0f7.png',
  forest: 'assets/images/371a1a63003bf0b0fde98a955d761494591ed60a.png',
  highway: 'assets/images/849a153fc2b55176470a735932cf2604865d1e20.png',
  arrow: 'assets/chevron-right.svg'
};
</script>

<template>
  <main id="main-content">
    <section class="home-hero" aria-labelledby="hero-title">
      <img class="home-hero-image" :src="images.hero" alt="Veículo elétrico branco conectado a uma estação de recarga" fetchpriority="high">
      <div class="home-hero-overlay" aria-hidden="true"></div>
      <div class="home-hero-content">
        <h1 id="hero-title" class="trim">VINCI MODEL V3</h1>
        <p class="trim">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
        <div class="home-hero-buttons">
          <button class="home-button home-button-primary" type="button" data-open-models @click="$emit('open-models', $event)"><span class="trim">Modelos</span></button>
          <button class="home-button home-button-outline" type="button" data-open-test-drive @click="$emit('open-test-drive')"><span class="trim">Test Drive</span></button>
        </div>
      </div>
    </section>
    <section id="modelos" class="home-models" aria-label="Conheça nossos modelos">
      <article v-for="model in models" :key="model.id" class="home-model" :class="`home-model-${model.id}`">
        <div class="home-model-top">
          <h2 class="trim">VINCI<br>MODEL {{ model.name }}</h2>
          <dl class="home-specs">
            <div v-for="[label, value] in specifications" :key="label"><dt class="trim">{{ label }}</dt><dd class="trim">{{ value }}</dd></div>
          </dl>
        </div>
        <a class="home-model-image" href="carro.html" :aria-label="`Conheça o VINCI Model ${model.name}`"><img :src="`assets/images/${model.image}`" :alt="model.alt" width="1480" :height="model.height"></a>
        <div class="home-model-bottom"><p class="trim">A SUV mais robusta da categoria</p><a class="trim" href="carro.html">Conheça</a></div>
      </article>
    </section>
    <div class="home-photo home-photo-forest"><img :src="images.forest" alt="Carro elétrico em uma estrada sinuosa cercada por árvores" width="1480" height="866" loading="lazy"></div>
    <nav id="servicos" class="home-actions" aria-label="Explore a VINCI">
      <button type="button" data-open-test-drive @click="$emit('open-test-drive')"><span class="trim">Agende um test drive</span><img :src="images.arrow" alt="" aria-hidden="true"></button>
      <button type="button" @click="$emit('open-offers')"><span class="trim">Veja ofertas</span><img :src="images.arrow" alt="" aria-hidden="true"></button>
      <button type="button" @click="$emit('open-stores')"><span class="trim">Encontre uma loja</span><img :src="images.arrow" alt="" aria-hidden="true"></button>
    </nav>
    <div class="home-photo home-photo-highway"><img :src="images.highway" alt="Sedã elétrico preto percorrendo uma rodovia" width="1480" height="988" loading="lazy"></div>
  </main>
</template>

