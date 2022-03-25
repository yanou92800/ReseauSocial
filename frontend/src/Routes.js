import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Auth/Login.vue";
import allPublications from "./components/Publication/allPublications.vue";
import onePublication from "./components/Publication/onePublication.vue"

const routes = [
  { 
    name: 'login',
    path: '/', 
    component: Login,
  },
  { 
    name: 'allPublications',
    path: '/allPublications', 
    component: allPublications, 
    props:true 
  },
  { 
    name: 'onePublication/:id',
    path: '/onePublication', 
    component: onePublication, 
    props:true 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;