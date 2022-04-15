<template>
  <v-container>
    <v-row align="center" justify="center">
			<v-btn class="red accent-2" elevation="2" plain small to="/">Connexion</v-btn>
		</v-row>
    <v-card width="400" class="mx-auto mt-5 red lighten-5">
      <v-card-title>S'inscrire</v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-text-field v-model="userInfo.username" label="Username" prepend-icon="mdi-account-circle" :rules="usernameRules"/>
          <v-text-field v-model="userInfo.email" label="Email" type="email" prepend-icon="mdi-account-circle" :rules="emailRules"/>
          <v-text-field v-model="userInfo.password" :type="showPassword ? 'text' : 'password'" label="Password" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" @click:append="showPassword = !showPassword"/>
          <v-text-field v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" label="Confirmer password" prepend-icon="mdi-lock" :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" @click:append="showConfirmPassword = !showConfirmPassword"/>
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
      valid: false,
      showPassword: false,
      showConfirmPassword: false,
      userInfo: {
        username: "",
        email: "",
        password: ""
      },
      confirmPassword: "",
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
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate() && this.confirmPassword == this.userInfo.password) {
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
              text: `Username ou Email déjà pris`,
            });
          });
      }
    },
  },
};
</script>
