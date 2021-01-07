<template>
  <div>
    <h1>Search</h1>
    <input type="text" placeholder="customer name" v-model="customerName" />
    <button @click="search" :disabled="disableSearch">Search</button>
    {{ customerName }}
    {{ foundCustomer }}
    <ul>
      <li v-for="customer in customers">
        {{ customer.name.first }} {{ customer.name.last }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CustomerList",
  data() {
    return {
      customers: [],
      customerName: "",
      firstName: "",
      lastName: "",
      foundCustomer: null,
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
    disableSearch() {
      return !this.customerName.length > 0;
    },
  },
  methods: {
    formatSearchName() {
      // user input to array for first and second name
      const nameToArr = this.customerName.split(" ");
      // check first or second is present
      if (nameToArr.length == 1) {
        this.firstName = nameToArr[0].toLowerCase();
      } else {
        this.lastName = nameToArr[1].toLowerCase();
      }
    },
    search() {
      console.log("search");
      this.formatSearchName();
      const searchViaName = this.customers.filter((customer) => {
        // get values of name obj into arr
        const nameValuesArr = Object.values(customer.name);
        // check if first/last exists
        if (
          nameValuesArr.some((el) => el.toLowerCase() === this.firstName) ||
          nameValuesArr.some((el) => el.toLowerCase() === this.lastName)
        )
          return customer;
      });
      console.log(searchViaName);
      this.foundCustomer = searchViaName;
    },
  },
};
</script>
