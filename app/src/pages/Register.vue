<template>
  <div class="window-height row justify-center items-center bg-cyan-1">
    <q-card class="my-card col-6">
      <div class="q-pa-md  text-center" style="max-width: 80vw ">
        <q-card-section>
          <div class="text-h4 text-cyan-10">Create an account</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md q-ma-lg"
          >
            <q-input
              filled
              v-model="form.name"
              label="Your name *"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
            />
            <q-input
              filled
              v-model="form.email"
              label="Your email *"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
            />
            <q-input
              filled
              type="password"
              v-model="form.password"
              label="Your password *"
              hint="Must contain at least 4 characters"
              lazy-rules
              :rules="[
                val => (val && val.length > 3) || 'Please type something'
              ]"
            />

            <div>
              <q-btn label="Submit" type="submit" color="secondary" />
              <q-btn
                label="Reset"
                type="reset"
                color="secondary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",

  data() {
    return {
      form: {},
      accept: ""
    };
  },

  methods: {
    onSubmit() {
      console.log(this.form);

      const data = JSON.stringify(this.form);

      const config = {
        method: "post",
        url: "http://localhost:8080/signup",
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      };

      axios(config)
        .then(response => {
          console.log(response.data);
          if (
            response.data.message &&
            response.data.message == "Signup successful"
          ) {
            this.$router.push("/login");
          } else {
            // dialog w/ erreur
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    }
  }
};
</script>

<style></style>
