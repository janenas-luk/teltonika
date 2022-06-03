<template>
  <nav
    class="pagination is-centered is-small"
    role="navigation"
    aria-label="pagination"
  >
    <ul class="pagination-list">
      <li><a class="pagination-previous">&lt;</a></li>
      <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
      <li><a class="pagination-link" aria-label="Goto page 2">2</a></li>
      <li>
        <a
          class="pagination-link is-current"
          aria-label="Page 3"
          aria-current="page"
          >3</a
        >
      </li>
      <li><a class="pagination-link" aria-label="Goto page 4">4</a></li>

      <li><a class="pagination-link" aria-label="Goto page 5">5</a></li>
      <li><a class="pagination-next">&gt;</a></li>
    </ul>
  </nav></template
>

<style scoped>
nav {
  margin-top: 40px;
}
</style>
