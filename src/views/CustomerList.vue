<template>
  <div>
    <h1>Search</h1>
    <input
      type="text"
      placeholder="customer name"
      v-model="searchedName"
      @keyup="search"
    />
    <div v-if="selected.customer">
      <p @click="getCustomerData">
        {{ selected.customer.name.first }} {{ selected.customer.name.last }}
      </p>
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
    },
    filterByCustomerId(arr) {
      return arr.filter(
        (item) => item.customerId === this.selected.customer.id
      );
    },
    getPolicyData() {
      let quotesUrl = "http://localhost:3000/quotes/";
      let policesUrl = "http://localhost:3000/policies/";

      const quotes = axios.get(quotesUrl);
      const policies = axios.get(policesUrl);

      axios
        .all([quotes, policies])
        .then(
          axios.spread((...responses) => {
            const quotesResponse = responses[0].data;
            const policesResponse = responses[1].data;
            this.selected.quote = this.filterByCustomerId(quotesResponse);
            this.selected.policy = this.filterByCustomerId(policesResponse);
          })
        )
        .catch((errors) => {
          console.log(errors);
          // react on errors.
        });
    },
    getCustomerData() {
      this.getPolicyData();
    },
  },
};
</script>
