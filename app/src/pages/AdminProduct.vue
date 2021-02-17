<template>
  <q-page class="row justify-center">
    <div class="col-8 q-pa-xl">
      <q-btn
        icon="add_circle"
        color="secondary"
        label="Add a new product"
        @click="addProd = true"
      />

      <!----------------------------------------- ADD PRODUCT MODAL ------------------------------>
      <q-dialog v-model="addProd">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Close icon</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
            perferendis totam, ea at omnis vel numquam exercitationem aut, natus
            minima, porro labore.
          </q-card-section>
        </q-card>
      </q-dialog>
      <!-------------------------------------- end add product modal----------------------------------------->

      <!---------------------------------- PRODUCT LIST TABLE ------------------------------------------->
      <div class="q-pa-md">
        <q-table
          class="my-sticky-header-table"
          title="Product list"
          :data="products"
          :columns="columns"
          bordered
        >
          <template v-slot:body-cell-image="props">
            <!-- you can do anything you want here!!! -->
            <q-td class="">
              <q-img
                :src="props.value"
                style="height: 100px ; min-width: 100px"
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
            <!-- you can do anything you want here!!! -->
            <q-td>
              <div class="text-center q-gutter-lg">
                <q-btn
                  round
                  color="primary"
                  icon="edit"
                  @click="setEdit(props.value)"
                />
                <q-btn
                  round
                  color="red"
                  icon="delete"
                  @click="onDelete(props.value)"
                />
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
      <!-------------------------------------------- end product list table --------------------------------->
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminProduct",

  data() {
    return {
      addProd: false,
      products: [],
      columns: [
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
          name: "action",
          label: "Action",
          align: "center",
          field: "_id"
        }
      ]
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
    },

    setEdit(id) {},
    onDelete(id) {}
  }
};
</script>

<style></style>
