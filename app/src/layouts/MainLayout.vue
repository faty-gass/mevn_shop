<template>
  <q-layout
    view="lHh Lpr lff"
    container
    style="height: 100vh"
    class="shadow-2 rounded-borders"
  >
    <q-header elevated class="bg-cyan">
      <q-toolbar class="glossy">
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
        </q-avatar>

        <q-toolbar-title>My Shop</q-toolbar-title>

        <!------------------ DROPDOWN BUTTON ---------------------->
        <div class="q-pa-md">
          <q-btn-dropdown
            split
            color="primary"
            push
            glossy
            no-caps
            :label="userEmail"
          >
            <q-list v-if="!loggedStatus">
              <q-item clickable v-close-popup :to="{ name: 'Login' }">
                <q-item-section avatar>
                  <q-avatar icon="login" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Sign in</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup :to="{ name: 'Register' }">
                <q-item-section avatar>
                  <q-avatar
                    icon="how_to_reg"
                    color="primary"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Register</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-list v-else>
              <q-item clickable v-close-popup :to="{ name: 'Profile' }">
                <q-item-section avatar>
                  <q-avatar icon="person" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>My account</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="logout">
                <q-item-section avatar>
                  <q-avatar icon="logout" color="red" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <!---------------------- End dropdown button --------------------->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-cyan">
      <q-toolbar class="glossy">
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import axios from "axios";

export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      userEmail: "Connection",
      logged: this.loggedStatus
    };
  },

  updated() {
    this.getAuth();
    console.log(this.loggedStatus);
  },

  computed: {
    loggedStatus() {
      return this.$store.state.token.access_token ? true : false;
    }
  },

  methods: {
    getAuth() {
      const token = this.$store.state.token.access_token;
      if (token) {
        const config = {
          method: "get",
          url: `http://localhost:8080/user/profile?secret_token=${token}`,
          headers: {}
        };

        axios(config)
          .then(response => {
            console.log(response.data);
            this.$store.commit("token/setUserId", response.data.user._id);
            this.userEmail = response.data.user.email;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    logout() {
      this.$store.commit("token/setUserId", "");
      this.$store.commit("token/setToken", "");
      this.userEmail = "Connection";
    }
  }
};
</script>
