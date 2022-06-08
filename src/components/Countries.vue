<template>
  <div>
    <ul>
      <h1>ŠALYS</h1>
      <button class="button" @click="openAddCountry">
        +
      </button>
    </ul>
    <add-country
      :class="{ 'is-active': addCountryActive }"
      @close-AddCountry="closeAddCountry"
      @reloadAddCountry="getCountries"
    />
    <ul class="searchBox">
      <div>
        <input class="input" type="text" v-model="search" />
      </div>

      <div class="select">
        <select>
          <option>DATA FILTER</option>
          <option>ADD DATE</option>
        </select>
      </div>
    </ul>
    <div class="border">
      <table class="table is-hoverable">
        <thead>
          <tr>
            <th><abbr title="name">PAVADINIMAS</abbr></th>
            <th><abbr title="area">UŽIMAMAS PLOTAS</abbr></th>
            <th><abbr title="population">GYVENTOJŲ SKAIČIUS</abbr></th>
            <th><abbr title="phone_code">ŠALIES TEL. KODAS</abbr></th>
            <th><abbr title="toDo">VEIKSMAI</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="country in countries.data" :key="country.id">
            <td>
              <router-link :to="{ name: 'Cities', params: { id: country.id } }">
                {{ country.attributes.name }}
              </router-link>
            </td>
            <td>{{ country.attributes.area }}</td>
            <td>{{ country.attributes.population }}</td>
            <td>{{ country.attributes.phone_code }}</td>

            <td class="icons">
              <i
                class="fa-solid fa-trash solid1"
                @click="openDeleteCountry(country.id)"
              ></i>
              <i
                class="fa-solid fa-pencil solid2"
                @click="openEditCountry(country.id)"
              ></i>
            </td>
          </tr>
        </tbody>
        <delete-country
          :class="{ 'is-active': deleteCountryActive }"
          @close-DeleteCountry="closeDeleteCountry"
          @reloadDeleteCountry="getCountries"
          :key="countryId"
          :countryId="countryId"
        />
        <edit-country
          :class="{ 'is-active': editCountryActive }"
          @close-EditCountry="closeEditCountry"
          @reloadEditCountry="getCountries"
          :key="countryId + 'i'"
          :countryId="countryId"
        ></edit-country>
      </table>
    </div>

    <nav class="pagination is-centered is-small">
      <ul class="pagination-list">
        <li v-for="link in countries.meta.links" :key="link.label">
          <a
            @click="setPageNumber(link.url.slice(-1))"
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
import AddCountry from "./AddCountry.vue";
import EditCountry from "./EditCountry.vue";
import DeleteCountry from "./DeleteCountry.vue";

export default {
  name: "Countries",
  components: {
    Search,
    AddCountry,
    EditCountry,
    DeleteCountry
  },

  data() {
    return {
      countries: {},
      pageNumber: "",
      addCountryActive: false,
      editCountryActive: false,
      deleteCountryActive: false,
      countryId: 97,
      deleteCountryId: 97,
      search: ""
    };
  },

  methods: {
    async getCountries() {
      try {
        const response = await axios
          .get(
            "https://akademija.teltonika.lt\/countries_api\/api\/countries?page=" +
              this.pageNumber
          )
          .then(response => {
            this.countries = response.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
    setPageNumber(value) {
      this.pageNumber = value;
      this.getCountries();
    },
    openAddCountry() {
      this.addCountryActive = true;
      this.$toasted.global.success();
    },
    closeAddCountry() {
      this.addCountryActive = false;
      this.$toasted.global.error();
    },
    openEditCountry(id) {
      this.editCountryActive = true;
      this.countryId = id;
    },
    closeEditCountry() {
      this.editCountryActive = false;
    },
    openDeleteCountry(id) {
      this.deleteCountryActive = true;
      this.countryId = id;
    },
    closeDeleteCountry() {
      this.deleteCountryActive = false;
    }
  },
  created() {
    this.getCountries();
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
  margin-bottom: 15px;
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
.icons {
  font-size: 20px;
  text-align: center;
}
.fa-solid {
  cursor: pointer;
}
.solid2 {
  margin-left: 30px;
}
.searchBox {
  margin-bottom: 20px;
}
.input {
  width: 1050px;
  margin-right: 30px;
  background: url("/src/assets/search-icon.svg") no-repeat 1000px;
  background-size: 20px 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.select {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
