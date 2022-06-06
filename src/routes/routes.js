import Countries from "../components/Countries.vue";
import Cities from "../components/Cities.vue";

export default [
  {
    path: "/",
    component: Countries,
    name: "home"
  },
  {
    path: "/Cities/:id",
    component: Cities,
    name: "cities"
  }
];
