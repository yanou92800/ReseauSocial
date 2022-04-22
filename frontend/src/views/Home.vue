<template>
	<v-container align="center" class="mx-auto mt-5" style="border: 20px ridge red;">
		<v-img class="mb-5" contain height="300" src="../assets/ASM.jpg"></v-img>
		<v-row align="center" justify="center">
			<v-btn class="red accent-2" elevation="2" plain small to="/Register">Inscription</v-btn>
		</v-row>
		<Login />
	</v-container>
</template>

<script>
import Login from "@/components/Auth/Login";
export default {
	name: "Home",
	components: {
		Login,
	},
};
</script>
