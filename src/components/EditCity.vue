<template>
  <div class="modal">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">REDAGUOTI MIESTĄ</p>
        <button class="delete" @click="$emit('close-EditCity')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Pavadinimas</label>
          <input class="input" v-model="city.name" type="text" required />
        </div>
        <div class="field">
          <label class="label">Užimamas plotas</label>
          <input class="input" v-model="city.area" type="number" required />
        </div>
        <div class="field">
          <label class="label">Gyventojų skaičius</label>
          <input class="input" v-model="city.population" type="number" required />
        </div>
        <div class="field">
          <label class="label">Miesto pašto kodas</label>
          <input class="input" v-model="city.postal_code" type="text" required />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="updateCity">
          SAUGOTI
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditCity",
  props: ["cityId", "countryId", "editCityActive"],
  data() {
    return {
      city: [],
      url: 'https://akademija.teltonika.lt/countries_api/api/countries/'
    };
  },
  methods: {
    async getEditCityInfo() {
      const response = await axios
        .get(this.url + this.countryId + "/cities/" + this.cityId)
        .then(response => (this.city = response.data.data.attributes));
    },
    async updateCity() {
      try {
        const response = await axios
          .put(this.url + this.countryId + "/cities/" + this.cityId,
            {
              data: {
                attributes: {
                  name: this.city.name,
                  area: this.city.area,
                  population: this.city.population,
                  postal_code: this.city.postal_code
                }
              }
            }
          )
          .then(() => this.$emit("reloadEditCity"))
          .then(() => this.closeEditCity());
        this.$toasted.global.success({
          message: "Edited successfully!"
        });
      } catch (error) {
        this.$toasted.global.error({
          message: "Please fill all fields!"
        });
      }
    },
    closeEditCity() {
      this.$emit("close-EditCity");
    }
  },
  created() {
    if (this.editCityActive) {
      this.getEditCityInfo();
    }
  }
};
</script>