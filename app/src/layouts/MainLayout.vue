<template>
  <q-layout
    view="lHh Lpr lff"
    container
    style="height: 100vh"
    class="shadow-2 rounded-borders"
  >
    <q-header elevated class="bg-cyan-7">
      <q-toolbar class="">
        <q-item clickable :to="{ name: 'Home' }">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
        </q-item>
        <q-toolbar-title>My Shop</q-toolbar-title>

        <!------------------ DROPDOWN BUTTON ---------------------->
        <div class="q-pa-md">
          <q-btn-dropdown
            split
            :color="loggedStatus ? 'cyan-9' : 'white'"
            :text-color="loggedStatus ? 'white' : 'cyan-10'"
            push
            no-caps
            :label="loggedStatus ? 'Settings' : 'Connection'"
          >
            <q-list v-if="!loggedStatus">
              <q-item clickable v-close-popup :to="{ name: 'Login' }">
                <q-item-section avatar>
                  <q-avatar icon="login" color="secondary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Sign in</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup :to="{ name: 'Register' }">
                <q-item-section avatar>
                  <q-avatar
                    icon="how_to_reg"
                    color="secondary"
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
                  <q-avatar
                    icon="person"
                    color="secondary"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>My account</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup :to="{ name: 'AdminProd' }">
                <q-item-section avatar>
                  <q-avatar icon="build" color="secondary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Admin Prod</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="logout">
                <q-item-section avatar>
                  <q-avatar icon="logout" color="negative" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <!---------------------- End dropdown button --------------------->
        <q-btn
          dense
          color="white"
          text-color="primary"
          round
          :to="{ name: 'Cart' }"
          icon="shopping_cart"
          class="q-ml-md"
        >
          <q-badge color="red" floating>{{ cartCount }}</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-cyan-7">
      <q-toolbar class="">
        <q-toolbar-title></q-toolbar-title>
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
      //userName: this.loggedName,
      logged: this.loggedStatus
    };
  },

  updated() {
    this.getAuth();
    //console.log(this.loggedStatus);
  },

  computed: {
    loggedStatus() {
      return this.$store.state.token.access_token ? true : false;
    },
    loggedName() {
      if (this.$store.state.token.user) {
        return this.$store.state.token.user.name;
      } else {
        return "Connection";
      }
    },
    cartCount() {
      return this.$store.state.cart.products.length;
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
            //console.log(response.data);
            this.$store.commit("token/setUser", response.data.user);
            //this.userEmail = response.data.user.email;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    logout() {
      this.$store.commit("token/setUser", "");
      this.$store.commit("token/setToken", "");
      this.userEmail = "Connection";
      this.$router.push("/login");
    }
  }
};
</script>
