<template>
  <v-app-bar app elevation="24"
  rounded color="red darken-4" width="100vw">
      <v-toolbar-title>
        <router-link title="Home" aria-label="Aller à home" to="/" class="text-decoration-none white--text">
          <v-img src="../assets/ASM3.jpg" width="35" class="rounded-circle ml-10" alt="HOME"></v-img>
        </router-link>
      </v-toolbar-title>
    <v-tooltip v-if="isLogged">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ml-10" to="/allPublications" icon v-bind="attrs" v-on="on" aria-label="Aller à la page de toutes les publications">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </template>
      <span>Accueil</span>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-card class="mr-10">
      <span class="mx-5">Bienvenue {{ username }}</span>
    </v-card>
    <v-tooltip v-if="isLogged">
      <template v-slot:activator="{ on, attrs }">
        <v-card class="mr-10">
          <v-btn @click="myProfile" icon v-bind="attrs" v-on="on" aria-label="Aller à la page de mon profil">
            <v-img :src="avatar" width="1vw"></v-img>
          </v-btn>
        </v-card>
      </template>
      <span>Mon profil</span>
    </v-tooltip>
    <v-tooltip v-if="isLogged">
      <template v-slot:activator="{ on, attrs }">
        <v-btn title="Déconnexion" aria-label="Se déconnecter" class="mr-10" @click="logout()" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <span>Déconnexion</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex' 

export default {
  name: "Header",
  computed:{
    ...mapState(['isLogged', 'avatar', 'username'])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout"),
      this.$router.push("/");
    },
    myProfile() {
      if (this.$route.path == `/Profile/${this.$store.state.userId}`) {
        window.location.reload();
      } else {
        this.$router.push(`/Profile/${this.$store.state.userId}`);
      }
    },
  },
};
</script>