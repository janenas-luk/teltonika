<template>
  <div class="modal">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">PRIDĖTI ŠALĮ</p>
        <button class="delete" @click="$emit('close-AddCountry')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Pavadinimas</label>
          <input class="input" v-model="name" type="text" />
        </div>
        <div class="field">
          <label class="label">Užimamas plotas</label>
          <input class="input" v-model="area" type="number" />
        </div>
        <div class="field">
          <label class="label">Gyventojų skaičius</label>
          <input class="input" v-model="population" type="number" />
        </div>
        <div class="field">
          <label class="label">Šalies Tel. kodas</label>
          <input class="input" v-model="phone_code" type="number" />
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
  data() {
    return {
      name: undefined,
      area: undefined,
      population: undefined,
      phone_code: undefined
    };
  },
  methods: {
    submitForm() {
      axios
        .post("https://akademija.teltonika.lt/countries_api/api/countries", {
          data: {
            attributes: {
              name: this.name,
              area: this.area,
              population: this.population,
              phone_code: this.phone_code
            }
          }
        })
        .then(() => this.$emit("reloadAddCountry"))
        .then(() => this.closeAddCountry());
    },
    closeAddCountry() {
      this.resetFields();
      this.$emit("close-AddCountry");
    },
    resetFields() {
      this.name = undefined;
      this.area = undefined;
      this.population = undefined;
      this.phone_code = undefined;
    }
  }
};
</script>

<style scoped></style>
