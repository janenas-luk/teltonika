import Vue from "vue";
import App from "./App.vue";
import "regenerator-runtime/runtime.js";
import router from "./router";
import Toasted from "vue-toasted";

Vue.use(Toasted);

Vue.toasted.register('success', 'Success', {
  duration: 2500,
  position: "top-center",
  theme: "bubble",
  type: 'success'
});
Vue.toasted.register('error', 'Error', {
  duration: 2500,
  position: "top-center",
  theme: "bubble",
  type: 'error'
});




new Vue({
  router,
  el: "#app",
  render: h => h(App)
});
