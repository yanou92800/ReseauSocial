<template>
	<v-app>
		<createPublication v-on:getAllPublications="getAllPublications($event)"></createPublication>
		<v-container justify-content="center" align="center">
			<v-flex>
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
			</v-flex>
		</v-container>
	</v-app>
</template>

<script>
import $store from "@/store/index";
import dayjs from "dayjs";
import createPublication from "./createPublication"
import { PublicationService } from "./publication.service"

export default {
	name: "allPublications",
	components: {
		'createPublication' : createPublication
	},
	data() {
		return {
			user: {},
			publicationList: [],
		};
	},
	mounted() {
		PublicationService.getAllPublications($store.state.token)
			.then((publication) => {
				//console.log("Tableau" , publication)
				this.publicationList = publication;
				this.$store.state.avatar = this.user.infos.avatar;
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

.container {
	width: 60vw;
}

.admin {
	color: #26172B;
}

.modo {
  color:#001438 ;
}

</style>