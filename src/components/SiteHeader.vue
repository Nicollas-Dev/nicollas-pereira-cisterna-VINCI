<script setup>
import VinciBrand from './VinciBrand.vue';
defineProps({ modelsOpen: Boolean });
defineEmits(['open-models', 'open-test-drive', 'open-info']);
</script>

<template>
  <header class="site-header">
    <VinciBrand />
    <nav class="desktop-nav" aria-label="Navegação principal">
      <a href="./">Home</a>
      <button @click="$emit('open-info', 'Sobre a VINCI')">Sobre</button>
      <button data-open-models :aria-expanded="modelsOpen" aria-controls="models-menu" @click="$emit('open-models', $event)">Veículos</button>
      <button @click="$emit('open-info', 'Serviços')">Serviços</button>
      <button data-open-test-drive @click="$emit('open-test-drive')">Test Drive</button>
    </nav>
    <button class="mobile-nav-toggle" data-open-models :aria-expanded="modelsOpen" aria-controls="models-menu" aria-label="Abrir menu de veículos" @click="$emit('open-models', $event)">☰</button>
  </header>
</template>

