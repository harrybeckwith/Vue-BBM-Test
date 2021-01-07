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
      <h3 @click="getCustomerData" class="name__title">
        {{ selected.customer.name.first }} {{ selected.customer.name.last }}
      </h3>
    </div>

    <div v-if="selected.policy" class="card">
      <h4 class="card__header">policies</h4>
      <div class="card__body">
        <p class="text-center">
          {{ selected.policy.status }}
        </p>
        <p class="text-center">
          £{{ selected.policy.product.price.monthly }} per month
        </p>
        <p class="text-center">
          £{{ selected.policy.product.price.annual }} annually
        </p>
        <p>Policy no: {{ selected.policy.id }}</p>

        <p>Pets</p>
        <ul class="list">
          <li v-for="(name, i) in petNames" :key="i">
            {{ name }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="selected.policy" class="card">
      <h4 class="card__header">quotes</h4>
      <div class="card__body">
        <p class="text-center">
          {{ selected.quote.status }}
        </p>

        <p>Policy no: {{ selected.quote.id }}</p>

        <ul class="list">
          <li v-for="(product, i) in quoteProducts" :key="i">
            {{ product.type }}
            <p>£{{ product.price.annual }} annually</p>
            <p>£{{ product.price.monthly }} monthlyly</p>
          </li>
        </ul>
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
      // check first or second is present
      if (nameToArr.length == 1) {
        this.name.first = nameToArr[0].toLowerCase();
      } else {
        this.name.last = nameToArr[1].toLowerCase();
      }
    },
    search() {
      // throttle needed if extensive search
      console.log("search");
      this.formatSearchName();
      const searchViaName = this.customers.filter((customer) => {
        // get values of name obj into arr
        const nameValuesArr = Object.values(customer.name);
        // check if first/last exists
        if (
          nameValuesArr.some((el) => el.toLowerCase() === this.name.first) ||
          nameValuesArr.some((el) => el.toLowerCase() === this.name.last)
        )
          return customer;
      });

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
      // loading screen here
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
    getCustomerData() {
      this.getPolicyData();
    },
  },
};
</script>
<style scoped>
.name {
  margin-top: 10px;
}
.name__title {
  cursor: pointer;
}

.name__title:hover {
  color: black;
}
</style>
