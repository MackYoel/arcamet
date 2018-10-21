<template>
	<section class="login-form-container">
		<div class="login-form">
			<h1 class="is-primary">Iniciar sesión</h1>
		  <b-field label="Nombre de usuario">
	      <b-input value="johnsilver" autofocus></b-input>
		  </b-field>
		  <b-field label="Contraseña">
	      <b-input type="password"></b-input>
		  </b-field>

		  <div class="submit-button">
		  	<button class="button is-primary" :disabled="submitting" @click="login">Iniciar sesión</button>
		  </div>

		</div>
	</section>
</template>

<script>
export default {
	layout: 'basic',
	data() {
    return {
      username: '',
      password: '',
      errors: {},
      submitting: false
    }
  },
  methods: {
    async login() {
      this.submitting = true
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
      } catch (e) {
        console.log('e', e)
        this.errors = e.response.data
        this.submitting = false
        return
      }
    }
  }
}
</script>

<style scoped>
h1 {
	color: #714dd2;
	font-weight: bolder;
	font-size: 1.5em;
	text-align: center;
	margin-bottom: 1em;
}
.login-form-container {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #815ac9;
}
.login-form {
	background-color: #fff;
	padding: 2em;
	border: 1px solid #dbdfe1;
	border-radius: 7.5px;
	width: 500px;
	height: 350px;
}
.submit-button {
	margin-top: 2em;
	text-align: center;
}
</style>
