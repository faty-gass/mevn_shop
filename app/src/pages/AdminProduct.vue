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
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Add Product</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input
                filled
                v-model="prodForm.name"
                label="Name *"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />

              <q-input
                filled
                type="number"
                v-model="prodForm.price"
                label="Price *"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />
              <q-input
                filled
                autogrow
                v-model="prodForm.description"
                label="Description *"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />
              <q-input
                filled
                v-model="prodForm.image"
                label="Image *"
                hint="add the image url"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />

              <div>
                <q-btn label="Submit" type="submit" color="primary" />
              </div>
            </q-form>
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
            <q-td class="">
              <q-img
                :src="props.value"
                style="height: 100px ; min-width: 100px ; border-radius : 20px"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-description="props">
            <q-td>
              <div class="text-center">
                {{ props.value.substring(0, 50) + "..." }}
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
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

      <!---------------------------------------------- EDIT PROD MODAL ---------------------------------------->
      <q-dialog v-model="editProd">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Edit Product</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <q-form @submit="onUpdate" class="q-gutter-md">
              <q-input
                filled
                v-model="updatedProd.name"
                label="Name *"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />

              <q-input
                filled
                type="number"
                v-model="updatedProd.price"
                label="Price *"
                lazy-rules
                :rules="[]"
              />
              <q-input
                filled
                autogrow
                v-model="updatedProd.description"
                label="Description *"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />
              <q-input
                filled
                v-model="updatedProd.image"
                label="Image *"
                hint="add the image url"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />

              <div>
                <q-btn label="Submit" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
      <!-------------------------------------- end EDIT PROD MODAL -------------------------->
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
      editProd: false,
      prodForm: {},
      updatedProd: {},
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

    setEdit(id) {
      this.editProd = true;
      let initValues = this.products.find(prod => prod._id == id);
      this.updatedProd._id = initValues._id;
      this.updatedProd.name = initValues.name;
      this.updatedProd.description = initValues.description;
      this.updatedProd.image = initValues.image;
      this.updatedProd.price = initValues.price;
    },

    onUpdate() {
      const data = JSON.stringify(this.updatedProd);

      const config = {
        method: "patch",
        url: `http://localhost:8080/product/${this.updatedProd._id}`,
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      };

      axios(config)
        .then(response => {
          //console.log(response.data.product);

          let prodIdx = this.products.indexOf(
            this.products.find(prod => prod._id == this.updatedProd._id)
          );
          this.products.splice(prodIdx, 1, response.data.product);
          this.editProd = false;
        })
        .catch(error => {
          console.log(error);
        });
    },

    onDelete(id) {
      const config = {
        method: "delete",
        url: `http://localhost:8080/product/${id}`
      };

      axios(config)
        .then(response => {
          console.log(response.data);
          let prodIdx = this.products.indexOf(response.data.prod);
          this.products.splice(prodIdx, 1);
        })
        .catch(error => {
          console.log(error);
        });
    },

    onSubmit() {
      //console.log(this.prodForm);

      const data = JSON.stringify(this.prodForm);
      const config = {
        method: "post",
        url: "http://localhost:8080/products",
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      };
      axios(config)
        .then(response => {
          console.log(response.data);
          this.products.push(response.data.product);
          this.addProd = false;
          this.prodForm = {};
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style></style>
