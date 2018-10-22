<template>
	<div>
		<b-field grouped>
			<b-field label="Descripción" style="width: 400px;">
		    <b-input v-model="description" placeholder="Descripción"
		    	ref="description"
		    	onkeyup="return next('quantity', event)" @focus="onFocus" autofocus></b-input>
		  </b-field>

		  <b-field label="Cantidad" style="max-width: 100px;">
		    <b-input type="number" v-model="quantity"
		    	ref="quantity"
		    	onkeyup="return next('unit_price', event)" @focus="onFocus"></b-input>
		  </b-field>

		  <b-field label="Precio" style="max-width: 100px;">
		    <b-input type="number" step="0.00001" v-model="unit_price"
		    	ref="unit_price"
		    	onkeyup="return next('addButton', event)" @focus="onFocus"></b-input>
		  </b-field>
<!-- 
		  <b-field label="archivo" id="equisde">
		    <b-upload v-model="file">
		      <a class="button">
		        <b-icon icon="upload"></b-icon><span>Subir</span>
		      </a>
		    </b-upload>
		    <span class="file-name" v-if="file">
		      {{ file.name }}
		    </span>
		  </b-field> -->

		  <b-field label="Agregar">
			  <button class="button add-button" onkeyup="return next('description', event)"
			  	ref="addButton"
			  	@click="addItem">
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
			quantity: 1,
			unit_price: 1,
			file: null
		}
	},

	mounted() {
		const enterCode = 13
		window.next = (next, event) => {
			if ((event.keyCode === enterCode && event.target.value.length) || next === 'description') {
				this.$refs[next].focus()
			}
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
		},

		onFocus(event) {
			event.target.select()
		}
	}
}
</script>

<style scoped>
.has-addons {
	max-width: 85px;
	display: block;
}
.add-button:focus {
	background-color: #7957d5 !important;
	color: #fff !important;
}
</style>
