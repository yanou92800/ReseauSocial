<template>
	<v-app>
		<Header />
		<v-main>
			<router-view />
		</v-main>
		<SnackBar />
		<Footer />
	</v-app>
</template>

<script>
import Header from "@/components/Header";
import SnackBar from "@/components/SnackBar";
import Footer from "@/components/Footer";
export default {
	name: "App",
	components: {
		Header,
		SnackBar,
		Footer,
	},
};
</script>

<style>

#app {
  background: #1a2a6c;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #fdbb2d, #b21f1f, #1a2a6c);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #fdbb2d, #b21f1f, #1a2a6c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	width: 100vw;
}

</style>


