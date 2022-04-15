<template>
  <v-container v-if="publication.userId == $store.state.userId">
    <v-card class="pa-10 mt-5">
      <v-form ref="form" enctype="multipart/form-data" @submit.prevent="updatePublication" v-model="valid">
        <h1 class="mb-5" align="center">Modifier votre message</h1>
        <div>
          <input type="file" ref="file" name="file" id="file" class="attachment" @change="selectFile"/>
          <label for="file"><v-icon color="blue darken-2" hover>mdi-camera-plus</v-icon>Ajouter une image</label>
        </div>
        <div class="my-5">
          <v-textarea v-model="content" label="Ma publication" type="text" :rules="contentRules"></v-textarea>
        </div>
        <div class="space">
          <label v-if="imgPreview" for="preview">Aperçu de l'image:</label>
          <img contain height="100" v-if="imgPreview" :src="imgPreview" />
        </div>
        <div>
          <v-btn text color="red accent-5" type="submit" value="submit" :disabled="!valid">Poster</v-btn>
          <router-link :to="`/publication/`" >
            <v-btn text color="red accent-4">Annuler</v-btn>
          </router-link>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import $store from "@/store/index";
import { mapState } from "vuex";
import { PublicationService } from "./publication.service"

export default {
  name: "updatePublication",
  components: {},
  data() {
    return {
      publication: {},
      valid: false,
      title: "",
      content: "",
      file: "",
      imgPreview: "",
      contentRules: [
        (v) => (v && v.length >= 3) || "La publication doit comprendre au moins 3 caractères.",
      ],
    };
  },
  computed: {
    ...mapState(["isAdmin", "userId"]),
  },
  mounted() {
    PublicationService.getOnePublication(this.$route.params.id, $store.state.token)
    .then((publication) => {
      this.publication = publication
    })
    .catch((error) => {
      console.log(error);
    });   
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.imgPreview = URL.createObjectURL(this.file);
    },
    updatePublication() {
      const fd = new FormData();
      fd.append("userId", $store.state.userId);
      fd.append("content", this.content);
      fd.append("inputFile", this.file);

      if (this.$refs.form.validate()) {
        axios
          .put(
            "http://localhost:5000/api/updatePublication/" +
            this.$route.params.id,
            fd,
            {
              headers: {
                Authorization: `Bearer ${$store.state.token}`,
              },
            }
          )
          .then(() => {
            this.$store.dispatch("setSnackbar", {
              text: "Votre publication est modifiée.",
            });
            this.$router.push({
              name: "allPublications",
            });
          });
        this.$store.dispatch("setSnackbar", {
          color: "error",
          text: "Veuillez réessayer.",
        });
      }
    },
  },
};
</script>

<style scoped>
.attachment {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.attachment + label {
  font-weight: 500;
  display: inline-block;
  cursor: pointer;
}

.attachment:focus + label,
.attachment + label:hover {
  background-color: #effbff;
}
a {
  text-decoration: none;
}
</style>
