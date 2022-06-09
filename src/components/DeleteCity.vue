<template>
  <div class="modal">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Ar tikrai norite ištrinti: "{{ city.name }}"?
        </p>
      </header>
      <footer class="modal-card-foot">
        <button class="button" @click="closeDeleteCity">ATŠAUKTI</button>
        <button class="button is-danger" @click="deleteCity">
          IŠTRINTI
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DeleteCity",
  props: ["cityId", "countryId", "deleteCityActive"],
  data() {
    return {
      city: [],
      url: 'https://akademija.teltonika.lt/countries_api/api/countries/'
    };
  },

  methods: {
    async getDeleteCityInfo() {
      const response = await axios
        .get(this.url + this.countryId + "/cities/" + this.cityId)
        .then(response => (this.city = response.data.data.attributes));
    },
    async deleteCity() {
      try {
        const response = await axios
          .delete(this.url + this.countryId + "/cities/" +this.cityId)
          .then(() => this.$emit("reloadDeleteCity"))
          .then(() => this.closeDeleteCity());
        this.$toasted.global.success({
          message: "Deleted successfully!"
        });
      } catch (error) {
        this.$toasted.global.error({
          message: "Cannot delete it!"
        });
      }
    },
    closeDeleteCity() {
      this.$emit("close-DeleteCity");
    }
  },
  created() {
    if (this.deleteCityActive) {
      this.getDeleteCityInfo();
    }
  }
};
</script>