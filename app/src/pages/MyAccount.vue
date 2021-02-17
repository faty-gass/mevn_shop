<template>
  <div>
    <div class="row window-height justify-center items-center">
      <!----------------------- USER FORM -------------------------------------->
      <div class="col-4 q-pa-lg">
        <q-card class="my-card text-center">
          <q-card-section>
            <div class="text-h6">Update my infos</div>
          </q-card-section>

          <q-separator dark inset />

          <q-card-section>
            <q-form @submit="updateUser" class="q-gutter-md">
              <q-input
                filled
                v-model="userForm.name"
                label="Your name"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />

              <q-input
                filled
                v-model="userForm.email"
                label="Your email"
                lazy-rules
                :rules="[
                  val => (val !== null && val !== '') || 'Please type your age',
                  val => (val > 0 && val < 100) || 'Please type a real age'
                ]"
              />

              <div>
                <q-btn label="Update" type="submit" color="primary" />
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
                v-model="pwdForm.pwd1"
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
                    val == pwdForm.pwd1 || 'The passwords must be identical'
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
</template>

<script>
import axios from "axios";

export default {
  name: "MyAccount",

  data() {
    return {
      userForm: {},
      pwdForm: {}
    };
  },

  methods: {
    getAuth() {},

    updateUser() {
      console.log(userForm);
    },

    updatePwd() {
      console.log("updataed");
    }
  }
};
</script>

<style></style>
