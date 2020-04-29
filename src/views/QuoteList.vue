<template>
  <div>
    <h1>Quotes</h1>

    <ul>
      <li v-for="quote in quotes">
        {{ quote.id }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'QuoteList',
  data() {
    return {
      quotes: []
    }
  },
  created() {
    const context = this

    axios.get('http://localhost:3000/quotes')
      .then(function(response) {
        context.quotes = response.data
      })
      .catch(function(e) {
        console.log(e)
      })
  }
}
</script>
