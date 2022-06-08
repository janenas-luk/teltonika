<template>
  <div class="modal">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Ar tikrai norite ištrinti: "{{ country.name }}"?</p>
      </header>
      <footer class="modal-card-foot">
        <button class="button" @click="closeDeleteCountry">ATŠAUKTI</button>
        <button class="button is-danger" @click="deleteCountry">
          IŠTRINTI
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DeleteCountry",
  props: ["countryId"],
  data() {
    return {
      country: {}
    };
  },

  methods: {
    async getDeleteCountryInfo() {
      const response = await axios
        .get(
          "https://akademija.teltonika.lt/countries_api/api/countries/" +
            this.countryId
        )
        .then(response => (this.country = response.data.data.attributes));
    },

    async deleteCountry() {
      const response = await axios
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
  },
  created() {
    this.getDeleteCountryInfo();
  }
};
</script>

<style scoped></style>
