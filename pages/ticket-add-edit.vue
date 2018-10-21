<template>
<div>
  <h1>Nuevo ticket</h1><br>

  <div class="columns">
	  <div class="column is-two-thirds" >
	  	<add-item @add-item="addItem"/>
	  	<hr>

	  	<table class="table has-mobile-cards">
	  		<tr v-for="(item, index) in items" :key="item.id">
	  			<td style="width: 10px"></strong></td>
	  			<td style="width: 350px"></td>
	  			<td style="width: 110px; text-align: right;"></td>
	  			<td style="width: 110px; text-align: right;"></td>
	  			<td style="width: 110px; text-align: right;">subtotal</td>
	  			<td style="width: 110px; text-align: right;"></td>
	  		</tr>

	  		<tr v-for="(item, index) in items" :key="item.id">
	  			<td style="width: 10px"><strong>#{{ index + 1 }}</strong></td>
	  			<td style="width: 350px">{{ item.description }}</td>
	  			<td style="width: 110px; text-align: right;">{{ item.quantity }}</td>
	  			<td style="width: 110px; text-align: right;">{{ item.unit_price }}</td>
	  			<td style="width: 110px; text-align: right;">{{ item.quantity * item.unit_price }}</td>
	  			<td style="width: 110px; text-align: right;">
	  				<button class="button" @click="removeItem(index)">x</button>
	  			</td>
	  		</tr>
	  	</table>

	  </div>
	  <div class="column">
		  <section>
		  	<b-field grouped>
			  	<b-field label="Fecha de emisión" style="max-width: 180px;">
		        <b-datepicker
		        	v-model="issue_date"
	            icon="calendar-today">
		        </b-datepicker>
			    </b-field>
			    <b-field label="Hora de emisión" style="max-width: 180px;">
	          <b-timepicker
	          	v-model="issue_date"
	            rounded
	            icon="clock"
	            hour-format="24">
	          </b-timepicker>
	        </b-field>
        </b-field>

        <b-field grouped>
			  	<b-field label="Fecha de entrega" style="max-width: 180px;">
		        <b-datepicker
		        	v-model="delivery_date"
	            icon="calendar-today">
		        </b-datepicker>
			    </b-field>
			    <b-field label="Hora de entrega" style="max-width: 180px;">
	          <b-timepicker
	          	v-model="delivery_date"
	            rounded
	            icon="clock"
	            hour-format="24">
	          </b-timepicker>
	        </b-field>
        </b-field>

		    <b-field label="Buscar cliente">
		      <b-autocomplete
		        rounded
		        v-model="name"
		        :data="filteredDataArray"
		        placeholder="e.g. jQuery"
		        icon="magnify"
		        @select="option => selected = option">
		        <template slot="empty">No results found</template>
		      </b-autocomplete>
		    </b-field>
		    <hr>
		    <button class="button full-width" @click="print">
		    	Imprimir
		    </button>
		    <br><br>
		    <button class="button is-primary full-width" @click="save">
		    	Guardar
		    </button>

		  </section>
		</div>
	</div>


</div>
</template>

<script>
import AddItem from '~/components/AddItem.vue'

export default {
  data() {
	  return {
	  	issue_date: new Date(),
	  	delivery_date: new Date(),
	  	client: {},
	  	data: [
        'Angular',
        'Angular 2',
        'Aurelia',
        'Backbone',
        'Ember',
        'jQuery',
        'Meteor',
        'Node.js',
        'Polymer',
        'React',
        'RxJS',
        'Vue.js'
	    ],
	    name: '',
	    selected: null,
	    items: [],
	    errors: {}
	  }
  },

  methods: {
  	addItem(item) {
  		this.items.push(item)
  	},

  	removeItem(index) {
  		this.items.splice(index, 1)
  	},

  	async save() {
  		try {
	  		let response = await this.$axios.$post('/tickets/tickets/', {
	  			issue_date: this.issue_date,
	  			delivery_date: this.delivery_date,
	  			client: this.client.id,
	  			items: this.items
	  		})
	  		console.log('response', response)
  		} catch (e) {
  			this.errors = e.response.data
  		}
  	},

  	print() {

  	}
  },

  computed: {
    filteredDataArray() {
      return this.data.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    }
	},
	components: {
		AddItem
	}
}
</script>

<style scoped>
h1 {
	font-size: 20px;
	font-weight: bolder;
}
.full-width {
	width: 100%;
}
</style>
