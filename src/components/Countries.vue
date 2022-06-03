<template>
  <div>
    <Name name="ŠALYS" />
    <Search />
    <div class="border">
      <table class="table is-hoverable">
        <thead>
          <tr>
            <th><abbr title="Position">PAVADINIMAS</abbr></th>
            <th><abbr title="Played">UŽIMAMAS PLOTAS</abbr></th>
            <th><abbr title="Won">GYVENTOJŲ SKAIČIUS</abbr></th>
            <th><abbr title="Drawn">ŠALIES TEL. KODAS</abbr></th>
            <th><abbr title="Lost">VEIKSMAI</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="country in countries" v-bind:key="country.id">
            <td>{{ country.attributes.name }}</td>
            <th>{{ country.attributes.area }}</th>
            <td>{{ country.attributes.population }}</td>
            <td>{{ country.attributes.phone_code }}</td>

            <td>Delete | Edit</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Name from "../common/Name.vue";
import Search from "../common/Search.vue";
import axios from "axios";


export default {
  name: "app",
  components: {
    Name,
    Search
  },
  data() {
    return {
      countries: []
    };
  },

  methods: {
    async getData() {
      try {
        const response = await axios
          .get("https://akademija.teltonika.lt/countries_api/api/countries")
          .then(response => (this.countries = response.data.data));
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getData();
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
</style>
