<template>
  <div class="row window-height justify-center items-center">
    <div class="col-12">
      <div class="text-center text-h4 q-pa-xl">Welcome {{ userName }} !!</div>
      <div class="row justify-center items-center">
        <!----------------------- USER FORM -------------------------------------->

        <div class="col-4 q-pa-lg">
          <q-card class="my-card text-center">
            <q-card-section>
              <div class="text-h6">Update my infos</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
              <q-form @submit="updateUser" class="q-gutter-md">
                <q-input filled v-model="name" label="Your name" />

                <q-input filled v-model="email" label="Your email" />

                <div class="q-pt-md">
                  <q-btn label="Update" type="submit" color="primary" />
                </div>
                <div>
                  You will be redirected to the signin page and will need to log
                  in with your new credentials
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
        <!------------------------ END USER FORM ------------------------------>

        <!--------------------------- PWD FORM --------------------------------->
        <div class="col-4 q-pa-lg">
          <q-card class="my-card text-center">
            <q-card-section>
              <div class="text-h6">Update my password</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
              <q-form @submit="updatePwd" class="q-gutter-md">
                <q-input
                  filled
                  v-model="pwdForm.password"
                  type="password"
                  label="New password"
                  hint="Must contain at least 4 characters"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 3) || 'Please type something'
                  ]"
                />

                <q-input
                  filled
                  type="password"
                  v-model="pwdForm.pwd2"
                  label="Confirm your password"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 3) || 'Please type something',
                    val =>
                      val == pwdForm.password ||
                      'The passwords must be identical'
                  ]"
                />

                <div>
                  <q-btn label="Update" type="submit" color="primary" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
        <!----------------------------------------- END PWD FORM ----------------------------------------->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyAccount",

  data() {
    return {
      name: this.$store.state.token.user.name,
      email: this.$store.state.token.user.email,

      pwdForm: {}
    };
  },

  computed: {
    userName() {
      if (this.$store.state.token.user) {
        return this.$store.state.token.user.name;
      } else {
        return "New name";
      }
    }
    /*userEmail() {
      if (this.$store.state.token.user) {
        return this.$store.state.token.user.email;
      } else {
        return "New email";
      }
    } */
  },

  methods: {
    updateUser() {
      console.log(this.userForm);
      const token = this.$store.state.token.access_token;
      const id = this.$store.state.token.user._id;
      const userForm = { name: this.name, email: this.email };
      if (id && token) {
        const data = JSON.stringify(userForm);

        const config = {
          method: "patch",
          url: `http://localhost:8080/user/edit/${id}?secret_token=${token}`,
          headers: {
            "Content-Type": "application/json"
          },
          data: data
        };

        axios(config)
          .then(response => {
            //console.log(response.data);
            this.logout();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log("no id or token in store");
      }
    },

    updatePwd() {
      const token = this.$store.state.token.access_token;
      const id = this.$store.state.token.user._id;

      if (id && token) {
        const data = JSON.stringify(this.pwdForm);

        const config = {
          method: "patch",
          url: `http://localhost:8080/user/edit/${id}?secret_token=${token}`,
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
      }
    },

    logout() {
      //this.$store.commit("token/setUserId", "");
      this.$store.commit("token/setUser", "");
      this.$store.commit("token/setToken", "");
      this.$router.push("/login");
    }
  }
};
</script>

<style></style>
