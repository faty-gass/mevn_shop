<template>
  <q-page class="row justify-center">
    <div class="col-8 column ">
      <div v-for="item in products" :key="item._id">
        <Product :product="item" />
      </div>
    </div>
  </q-page>
</template>

<script>
import Product from "../components/Product";
import axios from "axios";

export default {
  name: "PageIndex",
  components: {
    Product
  },

  data() {
    return {
      products: []
    };
  },

  beforeMount() {
    this.getProducts();
  },

  methods: {
    getProducts() {
      const config = {
        method: "get",
        url: "http://localhost:8080/products",
        headers: {}
      };

      axios(config)
        .then(response => {
          console.log(response.data);
          this.products = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
