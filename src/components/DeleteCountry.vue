<template>
  <div class="modal">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Ar tikrai norite ištrinti {{ name }}?</p>
      </header>
      <footer class="modal-card-foot">
        <button class="button" @click="closeDeleteCountry">ATŠAUKTI</button>
        <button class="button is-danger" @click="submitForm">
          IŠTRINTI
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["name", "countryId"],
  methods: {
    submitForm() {
      axios
        .delete(
          "https://akademija.teltonika.lt/countries_api/api/countries/" +
            this.countryId
        )
        .then(() => this.$emit("reloadDeleteCountry"))
        .then(() => this.closeDeleteCountry());
    },
    closeDeleteCountry() {
      this.$emit("close-DeleteCountry");
    }
  }
};
</script>

<style scoped></style>
