import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Study from './views/Study.vue'
import './styles.css' // Import our custom CSS

const routes = [
  { path: '/', component: Home },
  { path: '/study/:deckId', component: Study }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App)
  .use(router)
  .mount('#app')
