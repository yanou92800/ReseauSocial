<template>
	<v-container>
		<v-card class="pa-5 mt-7">
			<v-card-title>Nouvelle publication</v-card-title>
			<v-form ref="form" enctype="multipart/form-data" @submit.prevent="createPublication">
				<div class="mt-5">
					<v-textarea
						filled
						v-model="content"
						label="Ma publication"
						type="text"
						:rules="contentRules"
					></v-textarea>
				</div>
				<div>
					<input
						type="file"
						ref="file"
						name="file"
						id="file"
						class="inputfile"
						@change="selectFile"
					/>
					<label for="file"
						><v-icon color="green darken-2" hover>mdi-camera-plus</v-icon>
						Ajouter une image</label
					>
				</div>
				<div>
					<label v-if="imgPreview" for="preview">Aperçu de l'image:</label>
					<img contain height="100" v-if="imgPreview" :src="imgPreview" />
				</div>
				<div align="center">
					<v-btn
						align="center"
						color="cyan darken-2 black--text"
						type="submit"
						value="submit"
						dark
						>Poster</v-btn
					>
				</div>
			</v-form>
		</v-card>
	</v-container>
</template>

<script>
import axios from "axios";
import $store from "@/store/index";

export default {
	name: "createPublication",
	data() {
		return {
			content: "",
			file: "",
			imgPreview: "",
			contentRules: [
				(v) => (v && v.length >= 3) || "Veuillez ajouter une publication.",
			],
		};
	},

	methods: {
		selectFile() {
			this.file = this.$refs.file.files[0];
			this.imgPreview = URL.createObjectURL(this.file);
		},
		createPublication() {
			console.log($store.state)
			const fd = new FormData();
			fd.append("content", this.content);
			// fd.append("inputFile", this.file);

			if (this.$refs.form.validate()) {
				axios
					.post(
						"http://localhost:5000/api/createPublication",
						{ content: this.content,
						userId: $store.state.userId 
						},
						{
							headers: {
								Authorization: `Bearer ${$store.state.token}`,
								},
						}
					)
					.then(() => {
						this.$store.dispatch("setSnackbar", {
							text: "Votre publication est postée",
						});
						this.$router.push({
							name: "allPublications",
						});
					})
					.catch(() => {
						this.$store.dispatch("setSnackbar", {
							color: "error",
							text: "Veuillez réessayer.",
						});
					});
			}
		},
	},
};
</script>

<style scoped>
.inputfile {
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
.inputfile + label {
	font-weight: 500;
	display: inline-block;
	cursor: pointer;
}

.inputfile:focus + label,
.inputfile + label:hover {
	background-color: #effbff;
}
</style>
