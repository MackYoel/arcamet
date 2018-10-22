<template>
  <div>
    <h1>Lista de tickets</h1>

    <b-field style="max-width: 300px;">
    	<form @submit.prevent="fetchData">
	      <b-input placeholder="Buscar por número de documento..." v-model="documentNumberSearch"></b-input>
    	</form>
    </b-field>

    <table class="table">
	    <thead>
	      <tr>
	        <th class="text-center">#</th>
	        <th class="text-center">Estado</th>
	        <th class="text-center">Fecha de emisión</th>
	        <th class="text-center">Fecha de entrega</th>
	        <th class="text-left">Cliente</th>
	        <th class="text-right">Total</th>
	      </tr>
	    </thead>
	    <tbody>
	      <tr v-for="ticket in tickets">
	        <td class="text-center">
	          <a @click="openDetailModal(ticket)">#{{ ticket.document_number | fillZerosLeft }}</a>
	        </td>
	        <td class="text-center">{{ ticket.get_status_display }}</td>
	        <td class="text-center">{{ ticket.issue_date | moment('DD MMM YYYY HH:mm') }}</td>
	        <td class="text-center">{{ ticket.delivery_date | moment('DD MMM YYYY HH:mm') }}</td>
	        <td class="text-left">{{ ticket.client_display }}</td>
	        <td class="text-right">S/ {{ ticket.total | currency('') }}</td>
	      </tr>
	      <tr v-if="tickets.length === 0">
	        <td colspan="4" class="text-center">
	          <span class="medium-gray">No se registraron tickets.</span>
	        </td>
	      </tr>
	    </tbody>
    </table>
    <detail-modal ref="detailModal" @update="fetchData" />
  </div>
</template>

<script>
import DetailModal from '~/components/DetailModal'

export default {
	data() {
		return {
			API_URL: '/tickets/tickets/',
			tickets: [],
			documentNumberSearch: ''
		}
	},

	beforeMount() {
		this.fetchData()
	},

  methods: {
  	async fetchData() {
  		const params = { params: { 'document_number__icontains': this.documentNumberSearch } }
  		let response = await this.$axios.$get(this.API_URL, params)
  		this.tickets = response.results
  	},

  	openDetailModal(ticket) {
  		this.$refs.detailModal.open({ id: ticket.id })
  	}
  },

  components: {
  	DetailModal
  },
}
</script>

<style scoped>
h1 {
	font-size: 20px;
	font-weight: bolder;
	margin-bottom: 1em;
}
.table {
	width: 100%;
}
.text-right {
	text-align: right;
}
.text-center {
	text-align: center;
}
</style>