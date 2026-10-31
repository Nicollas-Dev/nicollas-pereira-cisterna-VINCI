<script setup>
import { ref } from 'vue';
defineProps({ open: Boolean });
defineEmits(['close', 'open-test-drive', 'open-offers', 'open-stores', 'open-info']);
const firstLink = ref(null);
const cars = [
  { image: '6ba2be9440ea9583a2ecd62975a9f4b4353dd41e', model: 'V1' },
  { image: '0a41fda59a7e7b2282b21c7c6553b138a6941ebe', model: 'V2' },
  { image: 'fbbb7fa656a49658d138a9e63aa06d1d7cd55131', model: 'V3' },
  { image: 'b97fcf5f2fdd1702a7b5a448a3dac2990601f4b5', model: 'V1' },
  { image: '6ba2be9440ea9583a2ecd62975a9f4b4353dd41e', model: 'V1' },
  { image: '6ba2be9440ea9583a2ecd62975a9f4b4353dd41e', model: 'V1' }
];
defineExpose({ focusFirst: () => firstLink.value?.focus({ preventScroll: true }) });
function rememberFirst(element, index) { if (index === 0) firstLink.value = element; }
</script>

<template>
  <section id="models-menu" class="models-menu" :hidden="!open" aria-label="Modelos VINCI">
    <div class="models-grid">
      <article v-for="(car, index) in cars" :key="index" class="menu-model">
        <a :ref="element => rememberFirst(element, index)" class="menu-image" href="carro.html" :aria-label="`Conheça o modelo ${car.model}`"><img :src="`assets/images/${car.image}.png`" width="295" height="144" :alt="`VINCI Modelo ${car.model}`"></a>
        <h2>MODELO {{ car.model }}</h2>
        <div class="menu-actions"><a href="carro.html">Ver mais</a><button @click="$emit('open-test-drive')">Comprar</button></div>
      </article>
    </div>
    <nav class="menu-links" aria-label="Navegue">
      <h2>NAVEGUE</h2>
      <ul>
        <li><button @click="$emit('open-offers')">OFERTAS</button></li>
        <li><button data-open-test-drive @click="$emit('open-test-drive')">TEST DRIVE</button></li>
        <li><button @click="$emit('open-stores')">LOJAS</button></li>
        <li><button @click="$emit('open-info', 'Serviços')">SERVIÇOS</button></li>
        <li><button @click="$emit('open-info', 'SAC')">SAC</button></li>
        <li><button @click="$emit('open-info', 'Privacidade')">PRIVACIDADE</button></li>
      </ul>
    </nav>
    <button class="menu-close" aria-label="Fechar menu de veículos" @click="$emit('close')">×</button>
  </section>
</template>
