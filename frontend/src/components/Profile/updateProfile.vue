<template>
  <v-form ref="form" @submit.prevent="updateProfile">
    <v-row style="justify-content: center" v-if="user.infos.id == $store.state.userId">
      <v-col md="3" class="mt-10">
        <v-card><v-card-text><strong>Username:</strong> {{ username }}</v-card-text></v-card>
        <v-card><v-card-text><strong>Email:</strong> {{ email }}</v-card-text></v-card>
        <v-card><v-card-text><strong>Password:</strong> ********</v-card-text></v-card>
      </v-col>
      <v-col md="4" class="mt-10">
        <v-form v-model="valid" ref="form">
          <v-text-field v-model="userUpdateInfo.username" label="Username" prepend-icon="mdi-account-circle" :rules="usernameRules"/>
          <v-text-field v-model="userUpdateInfo.email" label="Email" type="email" prepend-icon="mdi-account-circle" :rules="emailRules"/>
          <v-text-field v-model="userUpdateInfo.password" :type="showPassword ? 'text' : 'password'" label="Password" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" @click:append="showPassword = !showPassword"/>
        </v-form>
      </v-col>
    </v-row>
    <v-row style="justify-content: center">
      <v-btn type="submit" color="success" style="padding: 2vw 3vw" @click.stop="updateProfile" dark aria-label="Sauvegarder nouveau profil"><v-icon style="font-size: 3vw">mdi-content-save</v-icon></v-btn>
    </v-row>
  </v-form>
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
      dialog: false,
      user: {
        infos: {},
      },
      userUpdateInfo: {
        username: "",
        email: "",
        password: ""
      },
      usernameRules: [
        (v) =>
          (v && v.length >= 4) ||
          "Le nom d'utilisateur doit comprendre entre 4 et 30 caractères et peut contenir des tirets/espaces/apostrophes.",
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
          this.$store.state.username = this.userUpdateInfo.username;
          this.$store.state.email = this.userUpdateInfo.email;
          this.$store.state.password = this.userUpdateInfo.password;
          this.$router.go();
        })
        .catch(() => {
            this.$store.dispatch("setSnackbar", {
              color: "error",
              showing: true,
              text: `Username ou Email déjà pris`,
            });
        });
      }
    },
  },
  computed: {
    ...mapState(["userId", "email", "username"]),
  },
};
</script>

<style scoped>

.v-card {
  height: 65px;
}

</style>