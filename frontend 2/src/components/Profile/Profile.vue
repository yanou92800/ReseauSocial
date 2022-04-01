<template>
  <v-app class="blue">
    <v-row class="my-10">
      <v-col md="4" sm="6" cols="8" class="mx-auto">
        <v-card>
          <v-list-item color="blue">
            <v-list-item-content>
              <v-img :src="user.infos.avatar"></v-img>
              <v-list-item-title class="title" align="center">{{ user.infos.username }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col md="8" cols="8" class="mx-auto" v-if="user.infos.id == $store.state.userId">
        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-text-field v-model="userInfo.username" label="Username" prepend-icon="mdi-account-circle" :rules="usernameRules"/>
            <v-text-field v-model="userInfo.email" label="Email" type="email" prepend-icon="mdi-account-circle" :rules="emailRules"/>
            <v-text-field v-model="userInfo.password" :type="showPassword ? 'text' : 'password'" label="Password" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" @click:append="showPassword = !showPassword"/>
          </v-form>
        </v-card-text>
      </v-col>
      <v-col md="8" cols="8" class="mx-auto" v-if="user.infos.id == $store.state.userId || $store.state.isAdmin == 1">
        <v-form ref="form" @submit.prevent="updateProfile">
          <v-card>
            <div class="my-5">
              <input type="file" ref="file" name="file" id="file" class="avatar" @change="selectFile"/>
              <label for="file"><v-icon color="blue darken-2" class="ml-5" hover>mdi-camera-plus</v-icon>Changer d'avatar</label>
            </div>
            <div class="space">
              <label v-if="imgPreview" for="preview">Aperçu de l'image:</label>
              <img contain height="400" v-if="imgPreview" :src="user.imgPreview" />
            </div>
            <v-card-actions>
              <v-btn type="submit" color="success" dark aria-label="Sauvegarder" @click="updateProfile">
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
              <v-btn @click.stop="dialog = true" v-if="user.infos.id == $store.state.userId || $store.state.isAdmin == 1" color="red darken-2" dark aria-label="Supprimer le compte"><v-icon>mdi-delete</v-icon></v-btn>
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
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
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
      userInfo: {
        username: "",
        email: "",
        password: ""
      },
      usernameRules: [
        (v) =>
          (v && v.length >= 5) ||
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
      const fd = new FormData();
      fd.append("email", this.email);
      fd.append("username", this.username);
      fd.append("avatar", this.file);

      if (this.$refs.form.validate()) {
      axios
        .put(
          "http://localhost:5000/api/updateProfil/" + this.$route.params.id,
          fd,
          {
            headers: {
              Authorization: `Bearer ${$store.state.token}`,
            },
          }
        )
        .then(() => {
          this.$store.dispatch("setSnackbar", {
            text: "Votre profil a été modifié.",
          });
          this.$router.go();
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
    deleteProfile() {
      this.dialog = false;
      axios
        .delete(
          "http://localhost:5000/api/deleteProfil/" + this.$route.params.id,
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
    ...mapState(["userId"]),
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

</style>
