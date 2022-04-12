<template>
  <v-app>
    <v-col class="my-10">
      <v-col md="4" sm="6" cols="8" class="mx-auto">
        <v-row class="mx-auto" align="center" justify="center">
          <v-btn v-if="$store.state.isAdmin == 1 && $store.state.userId != user.infos.id && user.infos.isAdmin != 2" @click="addAdmin">Nommer modérateur</v-btn>
          <v-btn v-if="$store.state.userId == user.infos.id && $store.state.isAdmin == 2 || $store.state.isAdmin == 1 && user.infos.isAdmin == 2" @click="removeAdmin">Enlever modérateur</v-btn>
        </v-row>
      </v-col>
      <v-col md="4" sm="6" cols="8" class="mx-auto">
        <v-row>
          <v-list-item-title class="admin font-weight-medium" align="center" v-if="user.infos.isAdmin == 1">ADMINISTRATEUR</v-list-item-title>
          <v-list-item-title class="modo font-weight-medium" align="center" v-if="user.infos.isAdmin == 2">MODERATEUR</v-list-item-title>
          <v-list-item-title class="title mb-3" align="center">{{ user.infos.username }}</v-list-item-title>
        </v-row>
        <v-card>
          <v-img :src="user.infos.avatar"></v-img>
        </v-card>
      </v-col>
      <v-col md="4" sm="6" cols="8" class="mx-auto" v-if="$store.state.userId == user.infos.id">
        <v-row class="mx-auto" align="center" justify="center">
          <v-form ref="form" enctype="multipart/form-data" @submit.prevent="updateAvatar">
            <v-card align="center" for="file"><v-icon color="blue darken-2" hover>mdi-camera-plus</v-icon> Changer d'avatar</v-card>
            <div>
              <input type="file" ref="file" name="file" id="file" class="file mt-5" @change="selectFile"/>
            </div>
            <div>
              <label v-if="imgPreview" for="preview">Aperçu de l'image:</label>
              <img contain height="100" v-if="imgPreview" :src="imgPreview"/>
            </div>
            <div v-if="imgPreview != ''" align="center">
              <v-btn align="center" color="red darken-2 white--text" type="submit" value="submit" dark>Confirmer</v-btn>
            </div>
          </v-form>
        </v-row>
      </v-col>
      <v-col md="4" sm="6" cols="8" class="mx-auto" v-if="$store.state.userId == user.infos.id">
        <v-row class="mx-auto" align="center" justify="center">
          <router-link :to="`/updateProfile/${$store.state.userId}`" class="text-decoration-none">
            <v-btn>Modifier profil</v-btn>
          </router-link>
        </v-row>
      </v-col>
      <v-col md="4" sm="6" cols="8" class="mx-auto" v-if="user.infos.id == $store.state.userId || $store.state.isAdmin == 1">
        <v-row class="mx-auto" align="center" justify="center">
          <v-btn x-large style="padding: 3vw 7vw;" @click.stop="dialog = true" color="red darken-2" dark aria-label="Supprimer le compte"><v-icon style="font-size: 5vw">mdi-delete</v-icon></v-btn>
        </v-row>
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title v-if="user.infos.id == $store.state.userId">Êtes vous sûr de vouloir supprimer votre profil ?</v-card-title>
            <v-card-title v-else>Êtes vous sûr de vouloir supprimer son profil ?</v-card-title>
            <v-card-actions @click="dialog = false">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text>Non</v-btn>
              <v-btn color="red darken-3" text @click="deleteProfile" v-if="user.infos.id == $store.state.userId">Oui, je veux supprimer mon compte.</v-btn>
              <v-btn color="red darken-3" text @click="deleteProfile" v-else>Oui, je veux supprimer son compte.</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-col>
  </v-app>
</template>

<script>
import axios from "axios";
import $store from "@/store/index";
import { mapState } from "vuex";
export default {
  name: "Profile",
  data() {
    return {
      user: {
        infos: {},
      },
      file: "",
      imgPreview: "",
      dialog: false,
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/api/infos/" + this.$route.params.id, {
        headers: {
          Authorization: `Bearer ${$store.state.token}`,
        },
      })
      .then((response) => {
        //console.log(response);
        this.user = response.data;
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
    updateAvatar(response) {
      console.log("localStorage" , response);
      const fd = new FormData();
      fd.append("inputFile", this.file);

      axios
        .put(
          "http://localhost:5000/api/updateAvatar/" +
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
            text: "Votre avatar est modifié ",
          });
          this.user.infos.avatar = this.imgPreview;
          this.$store.state.avatar = this.user.infos.avatar;
          this.imgPreview = "";
          this.file = "";
        })
        .catch(() => {
          this.$store.dispatch("setSnackbar", {
            color: "error",
            text: "Veuillez réessayer.",
          });
        });
    },
    addAdmin() {
      axios
        .put("http://localhost:5000/api/addAdmin/" + this.$route.params.id, {}, {
          headers: {
            Authorization: `Bearer ${$store.state.token}`
          }
        })
        .then(() => {
          this.$store.dispatch("setSnackbar", {
            text: "Modérateur ajouté",
          });
          this.$router.go();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeAdmin() {
      axios
        .put("http://localhost:5000/api/removeAdmin/" + this.$route.params.id, {}, {
          headers: {
            Authorization: `Bearer ${$store.state.token}`
          }
        })
        .then(() => {
          if (this.user.infos.id === $store.state.userId) {
            this.$store.dispatch('setAdmin', 0)
          }
          this.$store.dispatch("setSnackbar", {
            text: "Modérateur enlevé",
          });
          this.$router.go();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteProfile() {
      this.dialog = false;
      axios
        .delete(
          "http://localhost:5000/api/deleteProfile/" + this.$route.params.id,
          {
            headers: {
              Authorization: `Bearer ${$store.state.token}`,
            },
          }
        )
        .then(() => {
          window.localStorage.vuex = JSON.stringify({});
          this.$store.dispatch("setSnackbar", {
            text: "Votre profil a été supprimé. A bientôt !",
          });
          this.$store.dispatch("logout"), this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapState(["userId", "isAdmin"]),
  },
};
</script>

<style scoped>
.avatar {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.avatar + label {
  font-weight: 500;
  display: inline-block;
  cursor: pointer;
}

.avatar:focus + label,
.avatar + label:hover {
  background-color: #effbff;
}

.title {
    font-size: 2rem !important;
}

.admin {
	color: yellow;
  font-size: 2rem !important;
}

.modo {
  color: blue;
  font-size: 2rem !important;
}

</style>
