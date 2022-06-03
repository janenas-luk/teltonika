<template>
  <ul>
    <div>
      <input class="input" type="text" />
    </div>

    <div class="select">
      <select>
        <option>DATA FILTER</option>
        <option>ADD DATE</option>
      </select>
    </div>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.input {
  width: 1050px;
  margin-right: 30px;
  background: url("/src/assets/search-icon.svg") no-repeat 1000px;
  background-size: 20px 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.select {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
