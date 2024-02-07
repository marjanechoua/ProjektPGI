//
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      
    },
    //Wenn User eingeloggt ist, dann werden Parameter :duration & :id übergegeben
    {
      path: '/:duration/:id/:mode', //mode added by Marjane Choua
      name: 'home_login_true',
      component: HomeView,
      props: (route) => ({
        id: Number(route.params.id),
        duration: Number(route.params.duration),
        mode: 'login' //mode added by Marjane Choua
      })
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/more_details/:location', //location added by Marjane Choua
      name: 'more_details',
      component: () => import('../views/MoreDetailsView.vue')
    }
  ]
})

export default router
