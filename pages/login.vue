<template>
	<section class="login-form-container">
		<form class="login-form" @submit.prevent="login">
			<h1 class="is-primary">Iniciar sesión</h1>

			<p class="alert" v-for="error in errors.non_field_errors" :key="error">
        {{ error }}
      </p>

		  <b-field label="Nombre de usuario">
	      <b-input v-model="username" autofocus></b-input>
		  </b-field>
	    <span class="error" v-for="error in errors.username" :key="error">{{ error }}</span>

		  <b-field label="Contraseña">
	      <b-input type="password" v-model="password"></b-input>
		  </b-field>
	    <span class="error" v-for="error in errors.password" :key="error">{{ error }}</span>

		  <div class="submit-button">
		  	<button type="submit" class="button is-primary" :disabled="submitting">Iniciar sesión</button>
		  </div>

		</form>
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
	height: auto;
}
.submit-button {
	margin-top: 2em;
	text-align: center;
}
.alert {
	background-color: #ffc9c9;
  padding: 1em;
  color: #dc5c5c;
}
.error {
  color: #dc5c5c;
}
</style>
