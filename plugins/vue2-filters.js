import Vue from 'vue'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)

Vue.filter('fillZerosLeft', function(number) {
  if (number) {
    return number.toString().padStart(4, '0')
  }
})
