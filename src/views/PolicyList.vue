<template>
  <div>
    <h1>Policies</h1>

    <ul>
      <li v-for="policy in policies">
        {{ policy.id }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PolicyList',
  data() {
    return {
      policies: []
    }
  },
  created() {
    const context = this

    axios.get('http://localhost:3000/policies')
      .then(function(response) {
        context.policies = response.data
      })
      .catch(function(e) {
        console.log(e)
      })
  }
}
</script>
