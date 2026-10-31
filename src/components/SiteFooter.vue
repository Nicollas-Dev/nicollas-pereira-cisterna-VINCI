<script setup>
import VinciBrand from './VinciBrand.vue';
defineEmits(['open-info']);
const groups = [
  { title: 'SOBRE', links: ['A Marca', 'História', 'Qualidade', 'Onde estamos', 'Investidores'] },
  { title: 'CONTATO', links: ['Fale Conosco', 'Atendimento', 'SAC'] },
  { title: 'SAC', links: ['Canais Oficiais', 'Redes Sociais', 'Suporte'] }
];
</script>

<template>
  <footer id="contato" class="site-footer">
    <div class="footer-content">
      <div class="footer-brand"><VinciBrand /></div>
      <section v-for="group in groups" :key="group.title" class="footer-column">
        <h2>{{ group.title }}</h2>
        <ul><li v-for="label in group.links" :key="label"><button @click="$emit('open-info', label)">{{ label }}</button></li></ul>
      </section>
      <p class="copyright">©Copyright 2026.<br>Todos os Direitos Reservados.</p>
    </div>
  </footer>
</template>

