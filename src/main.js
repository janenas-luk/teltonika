import Vue from "vue";
import App from "./App.vue";
import "regenerator-runtime/runtime.js";
import router from "./router";

new Vue({
  router,
  el: "#app",
  render: h => h(App)
});
