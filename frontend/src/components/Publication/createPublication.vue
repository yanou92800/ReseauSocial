<template>
  <v-container>
    <v-card class="pa-5 mt-7">
      <v-card-title>Nouvelle publication</v-card-title>
      <v-form ref="form" enctype="multipart/form-data" @submit.prevent="createPublication">
        <v-card-actions>
          <v-textarea filled color="#AD0000" v-model="content" label="Ma publication" type="text" :rules="contentRules"></v-textarea>
        </v-card-actions>
        <div>
          <input type="file" ref="file" name="file" id="file" class="file" @change="selectFile"/>
          <label for="file"><v-icon color="blue darken-2" hover>mdi-camera-plus</v-icon> Ajouter une image</label>
        </div>
        <div>
          <label v-if="imgPreview" for="preview">Aperçu de l'image:</label>
          <img contain height="100" v-if="imgPreview" :src="imgPreview"/>
        </div>
        <div align="center">
          <v-btn align="center" color="red darken-2 white--text" type="submit" value="submit" dark>Poster</v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import $store from "@/store/index";

export default {
  name: "createPublication",
  data() {
    return {
      content: "",
      file: null,
      imgPreview: "",
      contentRules: [
        (v) => (v && v.length >= 3) || "Veuillez ajouter une publication.",
      ],
    };
  },
  methods: {

    selectFile() {
      this.file = this.$refs.file.files[0];
      this.imgPreview = URL.createObjectURL(this.file);
    },

    createPublication(response) {
      console.log("localStorage" , response);
      const fd = new FormData();
      fd.append("userId", $store.state.userId);
      fd.append("content", this.content);
      fd.append("inputFile", this.file);

      if (this.$refs.form.validate()) {
        axios
          .post(`http://localhost:5000/api/createPublication`, fd, {
            headers: {
              Authorization: `Bearer ${$store.state.token}`,
            },
          })
          .then(() => {
            this.$emit("getAllPublications");
            this.$store.dispatch("setSnackbar", {
              text: "Votre publication est postée",
            });
            this.content = "";
            this.imgPreview = "";
            this.file = "";
          })
          .catch(() => {
            this.$store.dispatch("setSnackbar", {
              color: "error",
              text: "Veuillez réessayer.",
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.file {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.file + label {
  font-weight: 500;
  display: inline-block;
  cursor: pointer;
}

.file:focus + label,
.file + label:hover {
  background-color: #effbff;
}
</style>
