<template>
  <div class="window-height row justify-center items-center">
    <div class="q-pa-md col-6 text-center" style="max-width: 80vw ">
      <h3 class="text-h6">Enter your credentials to login</h3>
      <q-form @submit="onSubmit" class="q-gutter-md q-pa-lg">
        <q-input
          filled
          v-model="form.email"
          label="Your email *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          filled
          type="password"
          v-model="form.password"
          label="Your password *"
          lazy-rules
          :rules="[val => (val && val.length > 3) || 'Please type something']"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",

  data() {
    return {
      form: {}
    };
  },

  methods: {
    onSubmit() {
      var data = JSON.stringify(this.form);

      var config = {
        method: "post",
        url: "http://localhost:8080/login",
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      };

      axios(config)
        .then(response => {
          console.log(response.data);
          if (response.data && response.data.token) {
            this.$store.commit("token/setToken", response.data.token);
            this.$router.push("/profile");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style></style>
