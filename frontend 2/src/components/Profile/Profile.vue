<template>
  <v-app>
    <v-col class="my-10">
      <v-col md="4" sm="6" cols="8" class="mx-auto">
        <v-row class="mx-auto" align="center" justify="center">
          <v-btn v-if="$store.state.isAdmin == 1 && $store.state.userId != user.infos.id && user.infos.isAdmin != 2" @click="addAdmin">Nommer modérateur</v-btn>
          <v-btn v-if="$store.state.isAdmin != 0 && user.infos.isAdmin != 0 && user.infos.isAdmin != 1" @click="removeAdmin">Enlever modérateur</v-btn>
        </v-row>
      </v-col>
      <v-col md="4" sm="6" cols="8" class="mx-auto">
        <v-list-item>
          <v-list-item-title class="title" align="center">{{ user.infos.username }}</v-list-item-title>
        </v-list-item>
        <v-card>
          <v-img :src="user.infos.avatar"></v-img>
        </v-card>
      </v-col>
      <v-col md="4" sm="6" cols="8" class="mx-auto">
        <v-row class="mx-auto" align="center" justify="center">
          <v-btn type="file" ref="file" name="file" id="file" class="avatar" @change="selectFile"></v-btn>
          <v-btn for="file"><v-icon color="blue darken-2" hover>mdi-camera-plus</v-icon> Changer d'avatar</v-btn>
          <v-card-actions>
            <v-label v-if="imgPreview" for="preview">Aperçu de l'image:</v-label>
            <v-img contain height="400" v-if="imgPreview" :src="user.imgPreview" />
          </v-card-actions>
        </v-row>
      </v-col>
      <v-col md="4" sm="6" cols="8" class="mx-auto">
        <v-row class="mx-auto" align="center" justify="center">
          <router-link :to="`/updateProfile/${$store.state.userId}`" class="text-decoration-none">
            <v-btn>Modifier profil</v-btn>
          </router-link>
        </v-row>
      </v-col>
      <v-col md="4" sm="6" cols="8" class="mx-auto">
        <v-row class="mx-auto" align="center" justify="center">
          <v-card style="padding: 1vw 6vw">
            <v-btn style="padding: 3vw 7vw" @click.stop="dialog = true" v-if="user.infos.id == $store.state.userId || $store.state.isAdmin == 1" color="red darken-2" dark aria-label="Supprimer le compte"><v-icon style="font-size: 5vw">mdi-delete</v-icon></v-btn>
          </v-card>
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
      valid: false,
      showPassword: false,
      user: {
        infos: {},
      },
      userUpdateInfo: {
        username: "",
        email: "",
        password: "",
        avatar: ""
      },
      usernameRules: [
        (v) =>
          (v && v.length >= 4) ||
          "Le nom d'utilisateur doit comprendre entre 5 et 30 caractères et peut contenir des tirets/espaces/apostrophes.",
      ],
      passwordRules: [
        (v) =>
          (v && v.length >= 6) ||
          "Doit contenir entre 6 et 20 caractères avec un caractère alphabétique, un caractère spécial et un chiffre.",
        (v) =>
          /(?=.*[A-Za-z])/.test(v) ||
          "Doit contenir un caractère alphabétique en majuscule ou minuscule.",
        (v) => /(?=.*\d)/.test(v) || "Doit contenir un chiffre.",
        (v) =>
          /(?=.*[$@$!%*#?&])/.test(v) || "Doit contenir un caractère spécial.",
      ],
      emailRules: [
        (v) =>
          /^[a-zA-Z0-9_.-]+[@]{1}[a-zA-Z0-9]+[.]{1}[a-zA-Z]{2,10}$/.test(v) ||
          "Le format de l'email doit être de type name@domaine.com",
      ],
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
    updateProfile() {
      if (this.$refs.form.validate()) {
      axios
        .put("http://localhost:5000/api/updateProfile/" + this.$route.params.id, this.userUpdateInfo, {
            headers: {
              Authorization: `Bearer ${$store.state.token}`,
            },
        })
        .then(() => {
          this.$store.dispatch("setSnackbar", {
            showing: true,
            text: "Votre profil a été modifié.",
          });
          this.$router.go();
        })
        .catch(() => {
            this.$store.dispatch("setSnackbar", {
              color: "error",
              showing: true,
              text: `l'adresse mail est déjà prise`,
            });
        });
      }
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
    ...mapState(["userId", "admin"]),
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

</style>
