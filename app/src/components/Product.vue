<template>
  <div class="row">
    <q-card class="my-card q-ma-md q-pa-md " flat bordered>
      <q-card-section class="row items-center justify-center">
        <q-card-section class="col-md-3 col-8 flex flex-center ">
          <q-img
            class=""
            style="border-radius : 20px"
            :src="product.image"
            alt="img_prod"
          />
        </q-card-section>

        <q-card-section
          class="q-pt-xs col-md-9 col-8 column justify-between text-center"
        >
          <div class="col col-md-2 row justify-between items-center">
            <div
              class="col-md-10 col-8 text-h5 text-weight-bold text-center text-teal-10"
            >
              {{ product.name }}
            </div>
            <div class=" col-md-2 col-8 text-subtitle1 ">
              {{ product.price }} €
            </div>
          </div>
          <div class=" text-grey col-auto">
            {{ product.description }}
          </div>

          <div class="col-md-2 text-right q-pt-md">
            <q-btn
              color="secondary"
              icon-right="add_shopping_cart"
              label="Add to cart"
              @click="addProd(product)"
            />
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "Product",

  props: {
    product: Object
  },

  methods: {
    addProd(prod) {
      this.$store.commit("cart/addToCart", prod);
    }
  }
};
</script>

<style></style>
