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
          <input class="input" v-model="name" type="text" required />
        </div>
        <div class="field">
          <label class="label">Užimamas plotas</label>
          <input class="input" v-model="area" type="number" min="0" required />
        </div>
        <div class="field">
          <label class="label">Gyventojų skaičius</label>
          <input class="input" v-model="population" type="number" min="0" required />
        </div>
        <div class="field">
          <label class="label">Šalies Tel. kodas</label>
          <input class="input" v-model="phone_code" type="tel" required />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="addCountry">
          SAUGOTI
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddCountry",
  data() {
    return {
      name: "",
      area: "",
      population: "",
      phone_code: "",
      url: 'https://akademija.teltonika.lt/countries_api/api/countries'
    };
  },
  methods: {
    async addCountry() {
      try {
        const response = await axios
          .post(this.url, {
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
        this.$toasted.global.success({
          message: "Added successfully!"
        });
      } catch (error) {
        this.$toasted.global.error({
          message: "Please fill all fields!"
        });
      }
    },
    closeAddCountry() {
      this.resetFields();
      this.$emit("close-AddCountry");
    },
    resetFields() {
      this.name = "";
      this.area = "";
      this.population = "";
      this.phone_code = "";
    }
  }
};
</script>