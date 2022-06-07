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
          <tr v-for="country in countries.data" :key="country.id">
            <td>
              <router-link :to="{ name: 'Cities', params: { id: country.id } }">
                {{ country.attributes.name }}
              </router-link>
            </td>
            <td>{{ country.attributes.area }}</td>
            <td>{{ country.attributes.population }}</td>
            <td>{{ country.attributes.phone_code }}</td>

            <td>
              <button @click="openDeleteCountry">Delete</button>
              <delete-country
                :class="{ 'is-active': deleteCountryActive }"
                @close-DeleteCountry="closeDeleteCountry"
                @reloadDeleteCountry="getCountries"
                :name="country.attributes.name"
                :countryId="country.id"
              ></delete-country>
              |
              <button @click="openEditCountry">Edit</button>
              <edit-country
                :class="{ 'is-active': editCountryActive }"
                @close-EditCountry="closeEditCountry"
                @reloadEditCountry="getCountries"
                :name="country.attributes.name"
                :area="country.attributes.area"
                :population="country.attributes.population"
                :phone_code="country.attributes.phone_code"
                :countryId="country.id"
              />
            </td>
          </tr>
        </tbody>
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
      countries: [],
      pageNumber: "",
      addCountryActive: false,
      editCountryActive: false,
      deleteCountryActive: false
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
          .then(response => (this.countries = response.data))
          .then(response => (console.log(response.data)))
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
    },
    closeAddCountry() {
      this.addCountryActive = false;
    },
    openEditCountry() {
      this.editCountryActive = true;
    },
    closeEditCountry() {
      this.editCountryActive = false;
    },
    openDeleteCountry() {
      this.deleteCountryActive = true;
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
