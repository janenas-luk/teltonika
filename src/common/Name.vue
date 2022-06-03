<template>
  <ul>
    <h1>{{ name }}</h1>
    <button class="button">+</button>
  </ul>
</template>

<script>
export default {
  props: {
    name: String
  }
};
</script>

<style scoped>
.button {
  font-size: 15px;
  border-radius: 100%;
  margin-left: 15px;
}
h1 {
  font-size: 64px;
}
ul {
  display: flex;
  align-items: center;
}
</style>
