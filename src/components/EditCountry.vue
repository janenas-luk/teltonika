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
          <input class="input" v-model="editName" type="text" />
        </div>
        <div class="field">
          <label class="label">Užimamas plotas</label>
          <input class="input" v-model="editArea" type="number" />
        </div>
        <div class="field">
          <label class="label">Gyventojų skaičius</label>
          <input class="input" v-model="editPopulation" type="number" />
        </div>
        <div class="field">
          <label class="label">Šalies Tel. kodas</label>
          <input class="input" v-model="editPhone" type="number" />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="submitForm">
          SAUGOTI
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["name", "area", "population", "phone_code", "countryId"],
  data() {
    return {
      editName: this.name,
      editArea: this.area,
      editPopulation: this.population,
      editPhone: this.phone_code
    };
  },
  methods: {
    submitForm() {
      axios
        .put(
          "https://akademija.teltonika.lt/countries_api/api/countries/" +
            this.countryId,
          {
            data: {
              attributes: {
                name: this.editName,
                area: this.editArea,
                population: this.editPopulation,
                phone_code: this.editPhone
              }
            }
          }
        )
        .then(() => console.log(this.countryId))
        .then(() => this.$emit("reloadEditCountry"))
        .then(() => this.closeEditCountry());
    },
    closeEditCountry() {
      this.$emit("close-EditCountry");
    }
  }
};
</script>
