import { store } from '@/tools/store';
import { createApp } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';
import App from './App.vue';
import router from './router';

import './assets/main.scss';

const app = createApp(App);

app.use(router);

app.mount('#app');

router.beforeEach((to, from, next) => {
  saveRouterInfoToStore(to, from);
  next();
});

// the vue router doesn't play nice with the composition API, so we store a copy in the store on route change
function saveRouterInfoToStore(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  // `matched` can be very large and unneeded, so let's just discard it
  const { matched: _deleteTo, ...toClone } = to;
  store.currentRoute = toClone;

  if (from && from.path) {
    const { matched: _deleteFrom, ...fromClone } = from;
    store.previousRoute = fromClone;
  }
}
