import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import { createPinia } from "pinia";
function boot() {
  const app = createApp(App);
  app.use(router);
  app.use(createPinia());
  app.mount("#app");
}
boot();
