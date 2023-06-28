import { createRouter, createWebHistory } from 'vue-router'
import ViewMain from '../views/ViewMain.vue'

const routes = [
  {
    path: '/',
    name: '',
    component: ViewMain
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
