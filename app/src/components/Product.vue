<template>
  <div class="row">
    <q-card class="my-card q-ma-md" flat bordered>
      <q-card-section horizontal class="row items-center">
        <q-card-section class="col-3 flex flex-center">
          <q-img class="rounded-borders " :src="product.image" alt="img_prod" />
        </q-card-section>

        <q-card-section
          class="q-pt-xs col-9 column justify-between text-center"
        >
          <div class=" text-h5 q-mt-sm q-mb-xs text-center col col-md-4">
            {{ product.name }}
          </div>
          <div class=" text-caption text-grey col-auto">
            {{ product.description }}
          </div>
          <div class="text-overline text-right col col-md-4">
            {{ product.price }} €€
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
  }
};
</script>

<style></style>
