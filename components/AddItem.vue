<template>
	<div>
		<b-field grouped>
			<b-field label="Descripción" style="width: 400px;">
		    <b-input v-model="description"></b-input>
		  </b-field>

		  <b-field label="Cantidad" style="max-width: 100px;">
		    <b-input type="number" v-model="quantity"></b-input>
		  </b-field>

		  <b-field label="Precio" style="max-width: 100px;">
		    <b-input type="number" v-model="unit_price"></b-input>
		  </b-field>

		  <b-field label="archivo">
		    <b-upload v-model="file">
		      <a class="button is-primary">
		        <b-icon icon="upload"></b-icon><span>Subir</span>
		      </a>
		    </b-upload>
		    <span class="file-name" v-if="file">
		      {{ file.name }}
		    </span>
		  </b-field>

		  <b-field label="Agregar">
			  <button class="button is-primary" @click="addItem">
	        <span>+ Agregar</span>
	      </button>
		  </b-field>
		</b-field>

	</div>
</template>

<script>
export default {
	data() {
		return {
			description: '',
			quantity: 0,
			unit_price: 0,
			file: null
		}
	},

	methods: {
		addItem() {
			this.$emit('add-item', {
				description: this.description,
				quantity: this.quantity,
				unit_price: this.unit_price,
				file: this.file
			})
			Object.assign(this.$data, this.$options.data())
		}
	}
}
</script>

<style scoped>
.has-addons {
	max-width: 85px;
	display: block;
}
</style>
