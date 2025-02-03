import { createMemoryHistory, createRouter } from 'vue-router'
import Folder from './view/Folder.vue'
import Image from './view/Image.vue'
import Counter from './view/Counter.vue'

const routes = [
  { path: '/folder', component: Folder },
  { path: '/image', component: Image },
  { path: '/counter', component: Counter }
  //   { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
