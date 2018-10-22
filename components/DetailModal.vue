<template>
	<b-modal ref="detailModal":active.sync="opened" @close="onClose">
		<div class="modal-card" style="width: auto">
		  <header class="modal-card-head">
		    <h1>Detalles de ticket {{ ticket.document_number | fillZerosLeft }}</h1>
		    
		    <div class="states">
		    	<button class="button" v-for="status in Object.keys(STATES)" :key="status"
		    		:class="{ 'active-state': ticket.status == status }"
		    		@click="setStatus(status)">{{ STATES[status] }}</button>
		    </div>
		  </header>

  		<section class="modal-card-body">
    		<table>
    			<tr>
    				<td class="bolder">Usuario</td>
    				<td>: {{ ticket.user_display }}</td>
    			</tr>
    			<tr>
    				<td class="bolder">cliente</td>
    				<td>: {{ getClientDisplay(ticket.client) }}</td>
    			</tr>
    		</table>
    		<table class="table">
			    <thead>
			      <tr>
			        <th class="text-right">#</th>
			        <th>Descripción</th>
			        <th>Previsualización</th>
			        <th>Cant.</th>
			        <th>P.Unit.</th>
			        <th class="text-right">Subtotal</th>
			      </tr>
			    </thead>
			    <tbody>
			      <tr v-for="(item, index) in ticket.items" :key="item.id">
			        <td class="text-right">{{ index }}</td>
			        <td class="text-left">{{ item.description }}</td>
			        <td class="text-left">
			        	<img :src="item.image">
			        </td>
			        <td class="text-center">{{ item.quantity }}</td>
			        <td class="text-center">{{ item.unit_price | currency('') }}</td>
			        <td class="text-right">S/ {{ item.unit_price * item.quantity | currency('') }}</td>
			      </tr>
			      <tr >
			        <td colspan="5"></td>
			        <td class="text-right"><strong>Total:</strong> S/ {{ ticket.total | currency('') }}</td>
			      </tr>
			    </tbody>
		    </table>
  		<section class="modal-card-footer text-center">
  			<button class="button" @click="$refs.detailModal.close()">Cerrar</button>
  			<button class="button is-primary" @click="$refs.printTicket.open(ticket)">Imprimir</button>
  		</section>
  		</section>
    </div>
    <print ref="printTicket" @close="$refs.detailModal.close()"/>
  </b-modal>
</template>

<script>
import Print from '~/components/Print'

export default {
	data() {
		return {
			opened: false,
			ticket: {},
			checkboxGroup: [],
			STATES: {
				1: 'En cola',
				2: 'Terminado',
				3: 'Entregado'
			}
		}
	},

	methods: {
		open(data) {
			this.fetchTicket(data)
			this.opened = true
		},

		async fetchTicket({ id }) {
			this.ticket = await this.$axios.$get(`/tickets/tickets/${id}/`)
		},

		getClientDisplay(client) {
			if (client) {
				return `${client.name} (${client.document_number})`
			}
			return '-'
		},

		onClose() {
			Object.assign(this.$data, this.$options.data())
		},

		async setStatus (status) {
			this.ticket.status = status
			const data = { status: this.ticket.status }
			try {
				await this.$axios.$patch(`/tickets/tickets/${this.ticket.id}/`, data)
				this.toast()
				this.$emit('update')
			} catch (e) {
				console.log('e', e)
				alert('oops something went wrong.')
			}
		},

		toast() {
      this.$toast.open({
        message: 'Estado actualizado',
        type: 'is-success'
      })
    }
	},

	components: {
		Print
	}
}
</script>

<style scoped>
h1 {
	font-size: 20px;
	font-weight: bolder;
}
.table {
	width: 100%;
}
.bolder {
	font-weight: bolder;
}
.text-right {
	text-align: right;
}
.text-center {
	text-align: center;
}
.text-left {
	text-align: left;
}
.states {
  position: absolute;
  right: 25px;
  top: auto;
  bottom: auto;
}
.states > button {
	margin-left: -0.5px;
}
.states > button:nth-child(2) {
	border-radius: initial;
}
.states > button:nth-child(1) {
	border-bottom-right-radius: initial;
	border-top-right-radius: initial;
}
.states > button:nth-child(3) {
	border-bottom-left-radius: initial;
	border-top-left-radius: initial;
}
.active-state {
	background-color: #2fe457;
	color: #fff;
}
</style>
