<template>
  <div>
    <div class="nav-bar"></div>
    <div id="app" class="app">
      <Countries />
    </div>
    <div><Pagination /></div>
  </div>
</template>

<script>
import Countries from "./components/Countries.vue";
import Pagination from "./components/Pagination.vue";
// import Cities from "./components/Cities.vue";

export default {
  name: "app",
  components: {
    Countries,
    Pagination
    // Cities
  }
};
</script>

<style lang="scss">
@import "~bulma/css/bulma.css";
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.nav-bar {
  background: #0054a6;
  height: 71px;
  width: 100%;
}
</style>
