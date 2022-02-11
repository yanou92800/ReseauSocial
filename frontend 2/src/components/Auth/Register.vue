<template>
  <v-container>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h2">{{ slide }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
	
    <v-card width="400" class="mx-auto mt-5 red lighten-5">
      <v-card-title>S'inscrire</v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-text-field
            v-model="userInfo.username"
            label="Username"
            prepend-icon="mdi-account-circle"
            :rules="usernameRules"
          />
          <v-text-field
            v-model="userInfo.email"
            label="Email"
            type="email"
            prepend-icon="mdi-account-circle"
            :rules="emailRules"
          />
          <v-text-field
            v-model="userInfo.password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="#000000" dark @click="submitForm"> S'inscrire</v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["Ola !", "Welcome", "chez ...", "Groupo...", "...mania !"],
      valid: false,
      showPassword: false,
      userInfo: {
        username: "",
        email: "",
        password: "",
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
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        axios
          .post("http://localhost:5000/api/signup", this.userInfo)
          .then((response) => {
            console.log('Register OK! ', response);
            this.$store.dispatch("setSnackbar", {
              showing: true,
              text: `BRAVO ! Votre compte est créé !`,
            });
            this.$router.push("/");
          })
          .catch(() => {
            this.$store.dispatch("setSnackbar", {
              color: "error",
              showing: true,
              text: `L'adresse email est déjà prise`,
            });
          });
      }
    },
  },
};
</script>
