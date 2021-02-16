<template>
  <div class="window-height row justify-center items-center">
    <div class="q-pa-md col-6 text-center" style="max-width: 80vw ">
      <h3 class="text-h6">Enter your credentials to login</h3>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-pa-lg">
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
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
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
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    onReset() {}
  }
};
</script>

<style></style>
