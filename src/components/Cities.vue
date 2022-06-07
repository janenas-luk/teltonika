<template>
  <div>
    <ul>
      <h1>ŠALYS</h1>
      <button class="button">+</button>
    </ul>
    <Search />
    <div class="border">
      <table class="table is-hoverable">
        <thead>
          <tr>
            <th><abbr title="Position">PAVADINIMAS</abbr></th>
            <th><abbr title="Played">UŽIMAMAS PLOTAS</abbr></th>
            <th><abbr title="Won">GYVENTOJŲ SKAIČIUS</abbr></th>
            <th><abbr title="Drawn">MIESTO PAŠTO KODAS</abbr></th>
            <th><abbr title="Lost">VEIKSMAI</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="city in cities.data" v-bind:key="city.id">
            <td>
              {{ city.attributes.name }}
            </td>
            <td>{{ city.attributes.area }}</td>
            <td>{{ city.attributes.population }}</td>
            <td>{{ city.attributes.postal_code }}</td>

            <td>Delete | Edit</td>
          </tr>
        </tbody>
      </table>
    </div>

    <nav class="pagination is-centered is-small" v-if="cities.data.length > 10">
      <ul class="pagination-list">
        <li v-for="link in cities.meta.links" :key="link.label">
          <a
            @click="setCityPage(link.url.slice(-1))"
            class="pagination-link"
            :class="{ 'is-current': link.active }"
            aria-label="Goto page"
            >{{ link.label }}</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Search from "../common/Search.vue";
import axios from "axios";

export default {
  name: "Cities",
  components: {
    Search
  },

  data() {
    return {
      cities: [],
      cityNumber: this.$route.params.id,
      pageNumber: ""
    };
  },

  methods: {
    async getCities() {
      try {
        const response = await axios
          .get(
            "https://akademija.teltonika.lt\/countries_api\/api\/countries/" +
              this.cityNumber +
              "/cities?page=" +
              this.pageNumber
          )
          .then(response => (this.cities = response.data));
      } catch (error) {
        console.log(error);
      }
    },
    setCityPage(value) {
      this.pageNumber = value;
      this.getCities();
    }
  },
  created() {
    this.getCities();
  }
};
</script>

<style scoped>
.table {
  width: 1185px;
}
table {
  border-collapse: collapse;
  border-style: hidden;
}
table td {
  border: 1px solid black;
  text-align: left;
}
table th {
  border: 1px solid black;
}
.border {
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.button {
  font-size: 15px;
  border-radius: 100%;
  margin-left: 15px;
}
ul {
  display: flex;
  align-items: center;
}
h1 {
  font-size: 64px;
}
</style>
