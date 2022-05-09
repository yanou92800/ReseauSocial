<template>
	<v-app>
		<v-tooltip top>
			<template v-slot:activator="{ on, attrs }">
				<v-form v-model="valid" ref="form" @submit.prevent="getUsername">
					<v-row class="mt-5 mr-5">
						<v-icon class="mb-5 mr-5" @click="getUsername" icon v-bind="attrs" v-on="on" aria-label="Voir le profil de cet utlisateur">mdi-magnify</v-icon>
						<v-text-field v-model="getUsername" label=""/>
					</v-row>
				</v-form>
			</template>
		</v-tooltip>
		<v-col xs="10" sm="10" md="8" lg="8" xl="8" class="mx-auto">
			<createPublication v-on:getAllPublications="getAllPublications($event)"></createPublication>
			<v-card v-for="(publication, index) in publicationList" :key="index" flat hover :to="{ name: 'onePublication', params: { id: publication.id } }">
				<v-card class="my-10 mx-auto" align="center">
					<v-list-item class="red" align="start" hover>
						<router-link title="Profil" aria-label="Aller à son profil" :to="`/Profile/${publication.userId}`">
							<v-list-item-avatar outlined color="grey darken-3">
								<v-img :src="publication.avatar" alt="photo de profil"></v-img>
							</v-list-item-avatar>
						</router-link>
						<v-list-item-content>
							<v-list-item-title class="admin font-weight-medium" v-if="publication.isAdmin == 1">ADMIN</v-list-item-title>
							<v-list-item-title class="modo font-weight-medium" v-if="publication.isAdmin == 2">MODERATEUR</v-list-item-title>
							<v-list-item-title class="font-weight-medium">{{ publication.username }}</v-list-item-title>
							<v-list-item-title class="text-caption">{{ publication.createdAt | formatDate }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-row>
						<v-col>
							<v-card-text class="text-start">{{ publication.content }}</v-card-text>
							<v-img v-if="publication.attachment != 'null'" contain max-height="300" :src="publication.attachment"></v-img>
						</v-col>
					</v-row>
				</v-card>
			</v-card>
		</v-col>
	</v-app>
</template>

<script>
import $store from "@/store/index";
import dayjs from "dayjs";
import createPublication from "./createPublication"
import { PublicationService } from "./publication.service"
import axios from "axios"

export default {
	name: "allPublications",
	components: {
		'createPublication' : createPublication
	},
	data() {
		return {
			publicationList: [],
		};
	},
	mounted() {
		PublicationService.getAllPublications($store.state.token)
			.then((publication) => {
				//console.log("Tableau" , publication)
				this.publicationList = publication;
			})
			.catch((error) => {
				console.log(error);
			});
	},
	methods: {
		getAllPublications() {
			PublicationService.getAllPublications($store.state.token)
			.then((publication) => {
				//console.log("Tableau" , publication)
				this.publicationList = publication;
			})
			.catch((error) => {
				console.log(error);
			});
		}
	},
		getUsername() {
			axios
			.get("httplocalhost:4000/api/infos", {
				headers: {
					Authorization: `Bearer ${$store.state.token}`,
				},
			})
			.then((response) => {
			console.log(response);
				this.user = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
		},
	filters: {
		formatDate(value) {
			if (value) {
				return dayjs(String(value)).format("DD-MMM-YYYY à HH:mm");
			}
		},
	},
};
</script>

<style>

.admin {
	color: #26172B;
}

.modo {
  color:#001438 ;
}

</style>