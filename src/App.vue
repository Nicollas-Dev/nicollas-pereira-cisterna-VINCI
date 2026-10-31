<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
import VehicleMenu from './components/VehicleMenu.vue';
import HomePage from './components/HomePage.vue';
import CarroPage from './components/CarroPage.vue';
import SiteDialogs from './components/SiteDialogs.vue';

defineProps({ page: { type: String, default: 'home' } });

const modelsOpen = ref(false);
const vehicleMenu = ref(null);
const dialogKind = ref(null);
const dialogTitle = ref('');
let menuTrigger = null;

async function toggleModels(event) {
  if (modelsOpen.value) return closeModels();
  menuTrigger = event?.currentTarget || document.activeElement;
  modelsOpen.value = true;
  window.scrollTo({ top: 0, behavior: 'instant' });
  await nextTick();
  vehicleMenu.value?.focusFirst();
}

function closeModels(restoreFocus = true) {
  modelsOpen.value = false;
  if (restoreFocus && menuTrigger?.isConnected) menuTrigger.focus({ preventScroll: true });
}

function openDialog(kind, title = '') {
  if (modelsOpen.value) closeModels();
  dialogTitle.value = title;
  dialogKind.value = kind;
}

function handleDocumentClick(event) {
  if (event.target.closest('[data-open-models]')) return;
  if (modelsOpen.value && !event.target.closest('#site-header')) closeModels(false);
}

function handleEscape(event) {
  if (event.key === 'Escape' && modelsOpen.value) closeModels();
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleEscape);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
  document.removeEventListener('keydown', handleEscape);
});
</script>

<template>
  <div id="site-header">
    <SiteHeader :models-open="modelsOpen" @open-models="toggleModels" @open-test-drive="openDialog('test-drive')" @open-info="openDialog('info', $event)" />
    <VehicleMenu ref="vehicleMenu" :open="modelsOpen" @close="closeModels()" @open-test-drive="openDialog('test-drive')" @open-offers="openDialog('offers')" @open-stores="openDialog('stores')" @open-info="openDialog('info', $event)" />
  </div>
  <CarroPage v-if="page === 'carro'" @open-models="toggleModels" @open-test-drive="openDialog('test-drive')" />
  <HomePage v-else @open-models="toggleModels" @open-test-drive="openDialog('test-drive')" @open-offers="openDialog('offers')" @open-stores="openDialog('stores')" />
  <div id="site-footer"><SiteFooter @open-info="openDialog('info', $event)" /></div>
  <SiteDialogs v-if="dialogKind" :kind="dialogKind" :title="dialogTitle" @close="dialogKind = null" @open-test-drive="openDialog('test-drive')" />
</template>

