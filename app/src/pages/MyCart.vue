<template>
  <q-page class="row justify-center">
    <div class="col-9 q-pa-xl">
      <div class="q-pa-md">
        <q-table
          class="my-sticky-header-table"
          title="My Cart"
          :data="storeProducts"
          :columns="columns"
          bordered
        >
          <template v-slot:body-cell-delete="props">
            <!-- you can do anything you want here!!! -->
            <q-td class="text-center">
              <q-btn
                round
                flat
                color="white"
                text-color="red"
                icon="delete"
                @click="onDelete(props.value)"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-image="props">
            <!-- you can do anything you want here!!! -->
            <q-td class="">
              <q-img
                :src="props.value"
                style="height: 100px ; min-width: 100px ; border-radius : 20px"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-description="props">
            <!-- you can do anything you want here!!! -->
            <q-td>
              <div class="text-center">
                {{ props.value.substring(0, 50) + "..." }}
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td>
              <div class="column items-center justify-between">
                <div class="col-6 q-pa-sm">
                  <q-btn
                    round
                    size="xs"
                    color="dark"
                    icon="add"
                    @click="addOneProd(props.value)"
                  />
                </div>
                <div class="col-6 q-pa-sm ">
                  <q-btn
                    round
                    size="xs"
                    color="dark"
                    icon="remove"
                    class="col-4"
                    @click="removeOneProd(props.value)"
                  />
                </div>
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "MyCart",

  data() {
    return {
      columns: [
        {
          name: "delete",
          label: "Delete",
          align: "center",
          field: "_id"
        },
        {
          name: "name",
          label: "Product Name",
          field: "name",
          align: "center",
          sortable: true
        },
        {
          name: "image",
          align: "center",
          label: "Image",
          field: "image",
          style: "min-width: 100px",
          headerStyle: "min-width: 100px"
        },
        {
          name: "description",
          label: "Description",
          align: "center",
          field: "description"
        },
        {
          name: "price",
          label: "Price (in €)",
          align: "center",
          field: "price",
          sortable: true
        },
        {
          name: "count",
          label: "Quantity",
          align: "center",
          field: "countnb",
          sortable: true
        },
        {
          name: "action",
          label: "Action",
          align: "center",
          field: "_id"
        }
      ],
      products: this.storeProducts
    };
  },
  computed: {
    storeProducts() {
      return this.$store.state.cart.products;
    }
  },

  methods: {
    addOneProd(id) {},
    removeOneProd(id) {},
    onDelete(id) {}
  }
};
</script>

<style></style>
