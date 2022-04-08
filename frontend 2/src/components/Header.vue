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
    <span class="mr-5">Bienvenue {{ user.infos.username }}</span>
    <v-tooltip v-if="isLogged">
      <template v-slot:activator="{ on, attrs }">
        <v-btn @click="myProfile" icon v-bind="attrs" v-on="on" aria-label="Aller à la page de mon profil">
					<v-img :src="user.infos.avatar" width="1vw"></v-img>
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
import axios from "axios";
import $store from "@/store/index";

export default {
  name: "Header",
  data() {
    return {
      user: {
        infos: {},
      },
    }
  },
  computed:{
    ...mapState(['isLogged'])
  },
  mounted() {
    axios
      .get("http://localhost:5000/api/infos/" + this.$store.state.userId, {
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