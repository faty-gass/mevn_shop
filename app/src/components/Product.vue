<template>
  <div>
    <q-card
      class="my-card q-ma-lg"
      style="max-height : 200px ; max-width: 1200px"
      flat
      bordered
    >
      <q-card-section horizontal>
        <q-card-section
          class="col-5 flex flex-center"
          style="max-height : 230px ; max-width : 230px"
        >
          <q-img
            fit
            class="rounded-borders "
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
        </q-card-section>
        <q-card-section class="q-pt-xs column justify-between">
          <div class=" text-h5 q-mt-sm q-mb-xs text-center">Product name</div>
          <div class=" text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div class="text-overline text-right">Price €€</div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "Product"
};
</script>

<style></style>
