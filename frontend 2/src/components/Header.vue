<template>
  <v-app-bar app color="dark" dark width="100vw">
    <h1>
      <v-toolbar-title>
        <router-link to="/" class="text-decoration-none white--text">
          <v-img src="../assets/icon.png" width="35" class="rounded-circle" alt="HOME"></v-img>
        </router-link>
      </v-toolbar-title>
    </h1>

    <v-tooltip v-if="isLogged">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-2" to="/allPublications" icon v-bind="attrs" v-on="on" aria-label="Aller à la page de toutes les publications">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </template>
      <span>Accueil</span>
    </v-tooltip>

    <v-spacer></v-spacer>
    <span class="mr-5">Bienvenue {{ username }}</span>
    <v-tooltip v-if="isLogged">
      <template v-slot:activator="{ on, attrs }">
        <v-btn @click="myProfile" icon v-bind="attrs" v-on="on" aria-label="Aller à la page de mon profile">
					<v-img :src="avatar" width="1vw"></v-img>
        </v-btn>
      </template>
      <span>Mon profil</span>
    </v-tooltip>

    <v-tooltip v-if="isLogged">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-2" @click="logout()" icon v-bind="attrs" v-on="on" aria-label="Se déconnecter">
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
    ...mapState(['isLogged', "avatar", "username"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout"),
      this.$router.push("/");
    },
    myProfile() {
      if (this.$route.path == `/profile/${this.$store.state.userId}`) {
        window.location.reload();
      } else {
        this.$router.push(`/profile/${this.$store.state.userId}`);
      }
    },
  },
};
</script>