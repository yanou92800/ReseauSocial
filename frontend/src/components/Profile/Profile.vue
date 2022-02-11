<template>
  <div class="header-top">
    <div class="navbar">
      <p>Bienvenue {{ user.username }}</p>
      <img v-bind:src="user.avatar"/>
      <button v-on:click="logout()" class="button">Déconnexion</button>
    </div>
  </div>
  <allPublications></allPublications>
</template>

<script>
import { mapState } from 'vuex'
import allPublications from '../Publication/allPublications'
export default {
  name: 'Profile',
  mounted() {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return ;
    }
    this.user = this.$store.state.user;
    console.log(this.user)
  },
  computed: {
    ...mapState({
      user: 'user',
    })
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('/');
    }
  },
  components: {
            'allPublications': allPublications,
        },
}
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
  margin-top: 7px;
  margin-left: 5px;
  margin-right: 5px;
}
p {
  margin-left: 5px;
  margin-right: 5px;
}
.button {
  width: 150px;
  height: 30px;
  margin-top: 12px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 4px;
}
.header-top {
  height: 55px;
  background: #1a2a6c;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #fdbb2d, #b21f1f, #1a2a6c);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #fdbb2d, #b21f1f, #1a2a6c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: white;
  width: 100%;
  border-bottom: 1px solid orange;
  text-align: center;
  line-height: 50px;
  font-size: 25px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}
.navbar {
  display: flex;
  justify-content: right;
}
</style>