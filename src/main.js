import Vue from "vue";
import App from "./App.vue";
import "regenerator-runtime/runtime.js";
import router from "./router";
import Toasted from "vue-toasted";

Vue.use(Toasted);

new Vue({
  router,
  el: "#app",
  render: h => h(App)
});

Vue.toasted.register(
  "success",
  payload => {
    return payload.message;
  },
  { duration: 2500, position: "top-center", theme: "bubble", type: "success" }
);
Vue.toasted.register(
  "error",
  payload => {
    return "Oops.. " + payload.message;
  },
  { duration: 2500, position: "top-center", theme: "bubble", type: "error" }
);
