<template>
  <div>
    <h1>Customers</h1>

    <ul>
      <li v-for="customer in customers">
        {{ customer.name.first }} {{ customer.name.last }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CustomerList',
  data() {
    return {
      customers: []
    }
  },
  created() {
    const context = this

    axios.get('http://localhost:3000/customers')
      .then(function(response) {
        context.customers = response.data
      })
      .catch(function(e) {
        console.log(e)
      })
  }
}
</script>
