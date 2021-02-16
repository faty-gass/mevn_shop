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
            label="Connection"
            @click="onMainClick"
          >
            <q-list>
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

            <q-list>
              <q-item clickable v-close-popup :to="{ name: 'Profile' }">
                <q-item-section avatar>
                  <q-avatar icon="person" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>My account</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
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
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {};
  },

  methods: {
    onMainClick() {
      // console.log('Clicked on main button')
    },

    onItemClick() {
      // console.log('Clicked on an Item')
    }
  }
};
</script>
