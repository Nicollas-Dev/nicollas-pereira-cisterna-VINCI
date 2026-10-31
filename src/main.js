import { createApp } from 'vue';
import App from './App.vue';
import './styles/styles.css';
import './styles/home.css';
import './styles/carro.css';

const page = document.body.dataset.page;
createApp(App, { page }).mount('#app');
