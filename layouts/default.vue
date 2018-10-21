<template>
<div>
	<nav class="navbar" role="navigation" aria-label="main navigation">
	  <div class="navbar-brand">
	  	<nuxt-link class="navbar-item brand" to="/">Arcamet</nuxt-link>

	    <a role="button" class="navbar-burger burger" aria-expanded="false" data-target="navbarBasicExample"
	    	@click="toggle = !toggle">
	      <span aria-hidden="true"></span>
	      <span aria-hidden="true"></span>
	      <span aria-hidden="true"></span>
	    </a>
	  </div>

	  <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': toggle }">
	    <div class="navbar-end">
	      <nuxt-link class="navbar-item" to="/ticket-add-edit"
	      	:class="{ 'link-active': $route.name === 'ticket-add-edit' }">Nuevo ticket</nuxt-link>

	      <nuxt-link class="navbar-item" to="/"
	      	:class="{ 'link-active': $route.name === 'index' }">Lista de tickets</nuxt-link>

	      <a class="navbar-item">
					<button class="button">Salir</button>
	       </a>
	    </div>
	  </div>
	</nav>
	<div class="container">
	  <nuxt/>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			toggle: false
		}
	}
}
</script>

<style scoped>
.link-active, .link-active:hover {
	color: #fafafa;
	background-color: #7957d5;
}
nav {
	margin-bottom: 1em;
}
.brand {
	/*padding-left: 90px;*/
	color: #7957d5;
	font-size: 20px;
	font-weight: bolder;
}
</style>
