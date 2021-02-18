<template>
  <div class="row">
    <q-card class="my-card q-ma-md q-pa-md" flat bordered>
      <q-card-section class="row items-center">
        <q-card-section class="col-3 flex flex-center ">
          <q-img
            class=""
            style="border-radius : 20px"
            :src="product.image"
            alt="img_prod"
          />
        </q-card-section>

        <q-card-section
          class="q-pt-xs col-9 column justify-between text-center"
        >
          <div class="col col-md-2 row justify-between">
            <div class="col-10 text-h5 text-center ">
              {{ product.name }}
            </div>
            <div class=" col-2">{{ product.price }} €</div>
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
