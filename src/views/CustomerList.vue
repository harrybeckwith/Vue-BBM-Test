<template>
  <div>
    <h1>Search</h1>
    <input
      type="text"
      placeholder="Search for customer"
      v-model="customerName"
    />
    <button @click="search">Search</button>
    {{ customerName }}
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
    search() {
      console.log("search");

      // search for name
      // check customers data
      // filter for name
      const searchNames = this.customers.filter(
        (customer) => customer.name.first === this.customerName
      );

      const searchViaName = this.customers.filter((customer) => {
        const nameToArr = this.customerName.split(" ");
        const nameValuesArr = Object.values(customer.name);
        if (nameValuesArr.some(el => el === nameToArr[0]) || nameValuesArr.some(el => el === nameToArr[1])  ) {
         return customer;
        }
      });
      console.log(searchViaName);
    },
  },
};
</script>
