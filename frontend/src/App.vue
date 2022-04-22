<template>
	<v-app>
		<Header />
		<v-main style="border-left: 20px ridge red;border-right: 20px ridge red;">
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
  background: white;
}

</style>


