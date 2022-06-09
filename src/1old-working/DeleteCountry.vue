<template>
  <div class="modal">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Ar tikrai norite ištrinti: "{{ country.name }}"?
        </p>
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
      country: [],
      url: 'https://akademija.teltonika.lt/countries_api/api/countries/'
    };
  },

  methods: {
    async getDeleteCountryInfo() {
      const response = await axios
        .get(this.url + this.countryId)
        .then(response => (this.country = response.data.data.attributes));
    },
    async deleteCountry() {
      try {
        const response = await axios
          .delete(this.url + this.countryId)
          .then(() => this.$emit("reloadDeleteCountry"))
          .then(() => this.closeDeleteCountry());
        this.$toasted.global.success({
          message: "Deleted successfully!"
        });
      } catch (error) {
        this.$toasted.global.error({
          message: "Cannot delete it!"
        });
      }
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