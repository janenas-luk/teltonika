<template>
  <div class="modal">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">PRIDĖTI MIESTĄ</p>
        <button class="delete" @click="$emit('close-AddCity')"></button>
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
          <input class="input" v-model="population" type="number" min="0" required/>
        </div>
        <div class="field">
          <label class="label">Miesto pašto kodas</label>
          <input class="input" v-model="postal_code" type="text" required />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="addCity">
          SAUGOTI
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddCity",
  props: ["countryId"],
  data() {
    return {
      name: "",
      area: "",
      population: "",
      postal_code: "",
      url: 'https://akademija.teltonika.lt/countries_api/api/countries/'
    };
  },
  methods: {
    async addCity() {
      try {
        const response = await axios
          .post(this.url + this.countryId + "/cities",
            {
              data: {
                attributes: {
                  name: this.name,
                  area: this.area,
                  population: this.population,
                  postal_code: this.postal_code
                }
              }
            }
          )
          .then(() => this.$emit("reloadAddCity"))
          .then(() => this.closeAddCity());
        this.$toasted.global.success({
          message: "Added successfully!"
        });
      } catch (error) {
        this.$toasted.global.error({
          message: "Please fill all fields!"
        });
      }
    },
    closeAddCity() {
      this.resetFields();
      this.$emit("close-AddCity");
    },
    resetFields() {
      this.name = "";
      this.area = "";
      this.population = "";
      this.postal_code = "";
    }
  }
};
</script>