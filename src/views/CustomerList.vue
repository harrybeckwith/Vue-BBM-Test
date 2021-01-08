<template>
  <div>
    <h1>Search</h1>

    <input
      type="text"
      placeholder="customer name"
      v-model="searchedName"
      @keyup="search"
    />

    <div v-if="selected.customer" class="name">
      <h3 @click="getPolicyData" class="name__title">
        {{ selected.customer.name.first }} {{ selected.customer.name.last }}
      </h3>
    </div>
    <div class="search-container">
      <!-- Policy card -->
      <div v-if="selected.policy" class="card">
        <h4 class="card__header">Policies</h4>

        <div class="card__body">
          <p class="text-center">
            {{ toTitleCase(selected.policy.status) }}
          </p>

          <p class="text-center">
            £{{ selected.policy.product.price.monthly }} per month
          </p>

          <p class="text-center">
            £{{ selected.policy.product.price.annual }} annually
          </p>

          <p>Pets</p>

          <ul class="list">
            <li v-for="(name, i) in petNames" :key="i">
              {{ name }}
            </li>
          </ul>

          <p>Policy no: {{ selected.policy.id }}</p>
        </div>
      </div>
      <!-- Quote card -->
      <div v-if="selected.policy" class="card">
        <h4 class="card__header">Quotes</h4>

        <div class="card__body">
          <p class="text-center">
            {{ toTitleCase(selected.quote.status) }}
          </p>

          <ul class="list">
            <li v-for="(product, i) in quoteProducts" :key="i">
              <p>{{ toTitleCase(product.type) }}: £{{ product.price.monthly }} monthly</p>
            </li>
          </ul>

          <p>Policy no: {{ selected.quote.id }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CustomerList",
  data() {
    return {
      customers: [],
      searchedName: "",
      name: {
        first: "",
        last: "",
      },
      selected: {
        customer: null,
        policy: null,
        quote: null,
      },
    };
  },
  created() {
    const context = this;

    axios
      .get("http://localhost:3000/customers")
      .then(function(response) {
        context.customers = response.data;
      })
      .catch(function(e) {
        console.log(e);
      });
  },
  computed: {
    petNames() {
      // save pet names from policy
      return this.selected.policy.insured_entities.map((item) => item.name);
    },
    quoteProducts() {
      // save products for quotes
      return this.selected.quote.products;
    },
  },
  methods: {
    formatSearchName() {
      // user input to array for first and second name
      const nameToArr = this.searchedName.split(" ");
      this.checkNames(nameToArr);
    },
    checkNames(arr) {
      // check first or last name is present
      if (arr.length == 1) {
        this.name.first = arr[0].toLowerCase();
      } else {
        this.name.last = arr[1].toLowerCase();
      }
    },
    search() {
      this.formatSearchName();
      const searchViaName = this.customers.filter((customer) => {
        // get obj values for name first and last
        const nameValuesArr = Object.values(customer.name);
        // check if first/last name can be found
        if (
          nameValuesArr.some((el) => el.toLowerCase() === this.name.first) ||
          nameValuesArr.some((el) => el.toLowerCase() === this.name.last)
        )
          return customer;
        // ui message to show nothing found could go here
      });
      // set selected customer
      this.selected.customer = searchViaName[0];
      this.clearSearch();
    },
    clearSearch() {
      // clear policy and quote data if no found customer
      if (this.selected.customer == null) {
        this.selected.policy = null;
        this.selected.quote = null;
      }
    },
    filterByCustomerId(arr) {
      // get customer by uuid
      return arr.filter(
        (item) => item.customerId === this.selected.customer.id
      );
    },
    getPolicyData() {
      let quotesUrl = "http://localhost:3000/quotes/";
      let policesUrl = "http://localhost:3000/policies/";
      // get quotes and policies data
      const quotes = axios.get(quotesUrl);
      const policies = axios.get(policesUrl);
      // .all used to check no errors in both get requests
      // loading screen here needed
      axios
        .all([quotes, policies])
        .then(
          axios.spread((...responses) => {
            // store data from get
            const quotesResponse = responses[0].data;
            const policesResponse = responses[1].data;
            // filter using uuid
            this.selected.quote = this.filterByCustomerId(quotesResponse)[0];
            this.selected.policy = this.filterByCustomerId(policesResponse)[0];
          })
        )
        .catch((errors) => {
          console.log(errors);
          // react on errors.
          // UI updates here to let user know about errors
        });
    },
    toTitleCase(string) {
      // first letter to capital
      const capitalFirstLetter = string[0].toUpperCase();
      // remove first letter set rest to lowercase
      const toLower = string.substring(1).toLowerCase();

      return capitalFirstLetter + toLower;
    },
  },
};
</script>
<style scoped lang="scss">
.card {
  border-radius: 10px;
  box-shadow: $shadow-grey--light;
  width: 300px;
  margin-right: 50px;
  &__header {
    background-color: $color-sailor;
    color: $color-fairly;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    @include font--lead;
  }
  &__body {
    padding: 10px;
  }
}

.name {
  margin-top: 25px;
  margin-bottom: 20px;
  &__title {
    @include link;
    display: inline-block;
    cursor: pointer;
  }
}

.search-container {
  display: flex;
  justify-content: center;
}
</style>
