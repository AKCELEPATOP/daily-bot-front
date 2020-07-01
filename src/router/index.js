import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {title: 'Доска'}
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    alias: ['/auth/callback'],
    meta: {title: 'Авторизация'}
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

window.$router = router;

export default router;
