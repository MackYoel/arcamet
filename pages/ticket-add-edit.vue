<template>
<div>
  <h1>Nuevo ticket</h1><br>

  <div class="columns">
	  <div class="column is-two-thirds" >
	  	<add-item @add-item="addItem"/>
	  	<span class="error" v-for="error in errors.items" :key="error">{{ error }}</span>
	  	<hr>

	  	<table class="table has-mobile-cards">
	  		<tr>
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
		  	<div style="display: none;">
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
		  	</div>

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
		      <b-autocomplete placeholder="Buscar cliente"
            field="name"
	        	v-model="clientName"
            :data="clients"
            :loading="isFetchingClient"
            @keyup.native="searchClient"
            @select="setCLient">
          	<template slot-scope="props">
							<div class="media">
								<div class="media-content">
									{{ props.option.name }}
								</div>
							</div>
          	</template>
          </b-autocomplete>
		    </b-field>
        <span class="error" v-for="error in errors.client_id" :key="error">{{ error }}</span>
		    <hr>
		    <button class="button is-primary full-width"
		    	:disabled="!items.length"
		    	@click="save">
		    	Guardar
		    </button>

		  </section>
		</div>
	</div>


</div>
</template>

<script>
import { debounce } from 'lodash'
import AddItem from '~/components/AddItem.vue'

export default {
  data() {
	  return {
	  	issue_date: new Date(),
	  	delivery_date: new Date(),
	  	client: {},
	  	clients: [],
	    clientName: '',
	    isFetchingClient: false,
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
	  			client_id: this.client.id,
	  			items: this.items
	  		})
	  		this.$router.push('/')
  		} catch (e) {
  			this.errors = e.response.data
  		}
  	},

  	searchClient: debounce(async function() {
  		const params = { params: { name__icontains: this.clientName } }
      this.isFetching = true
  		const { results } = await this.$axios.$get('/tickets/clients/', params)
  		this.clients = results
      this.isFetching = false
  	}, 400),

  	setCLient(client) {
  		this.client = client
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
.error {
  color: #dc5c5c;
}
</style>
