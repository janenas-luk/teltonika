<template>
  <div class="modal">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">REDAGUOTI ŠALĮ</p>
        <button class="delete" @click="$emit('close-EditCountry')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Pavadinimas</label>
          <input class="input" v-model="country.name" type="text" />
        </div>
        <div class="field">
          <label class="label">Užimamas plotas</label>
          <input class="input" v-model="country.area" type="number" />
        </div>
        <div class="field">
          <label class="label">Gyventojų skaičius</label>
          <input class="input" v-model="country.population" type="number" />
        </div>
        <div class="field">
          <label class="label">Šalies Tel. kodas</label>
          <input class="input" v-model="country.phone_code" type="tel" />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="updateCountry">
          SAUGOTI
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditCountry",
  props: ["countryId"],
  data() {
    return {
      country: {}
    };
  },
  methods: {
    async getEditCountryInfo() {
      const response = await axios
        .get(
          "https://akademija.teltonika.lt/countries_api/api/countries/" +
            this.countryId
        )
        .then(response => (this.country = response.data.data.attributes));
    },
    async updateCountry() {
      const response = await axios
        .put(
          "https://akademija.teltonika.lt/countries_api/api/countries/" +
            this.countryId,
          {
            data: {
              attributes: {
                name: this.country.name,
                area: this.country.area,
                population: this.country.population,
                phone_code: this.country.phone_code
              }
            }
          }
        )
        .then(() => this.$emit("reloadEditCountry"))
        .then(() => this.closeEditCountry());
    },
    closeEditCountry() {
      this.$emit("close-EditCountry");
    }
  },
  created() {
    this.getEditCountryInfo();
  }
};
</script>

<style></style>
