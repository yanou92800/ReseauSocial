<template>
    <Profile></Profile>
    <div class="container">
        <form @submit.prevent="onSubmit">
            <textarea v-model="v$.textareaCreatePublication.$model" type="texte"></textarea>
            <button :disabled="v$.textareaCreatePublication.$invalid" @click.prevent="createPublication">Publier</button>
        </form>
        <div class="container-card">
            <div :key="index" v-for="(publication, index) in tableauPublications" class="card">
                <router-link :to="`/onePublication/${publication.id}`">Posté par {{ publication.username }} le {{ publication.createdAt }}</router-link>
                <item :id="index" :publication="publication.content" :deletePublication="() => deletePublication(publication)"></item>
            </div>
        </div>
    </div>
</template>

<script>
import Profile from '../Profile/Profile'
import Item from '../Item'
import axios from "axios";
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import $store from "@/store/index";
import dayjs from 'dayjs';
export default {
    name: "allPublications",
    setup() {
        return { v$: useVuelidate() }
    },
    data(){
        return {
            textareaCreatePublication: '',
            tableauPublications: [],
        }
    },
    async created() {
		await axios({
            method: "GET",
            url: "http://localhost:5000/api/allPublications",
            headers: { 
                    "Authorization": `Bearer ${$store.state.user.token}`
            }
        })
			.then((response) => {
                console.log(response)
				this.tableauPublications = response.data.map((publication) => {
                    publication.createdAt = dayjs(publication.createdAt).format("DD-MMM-YYYY à HH:mm");
                    return publication
                });
			})
			
			.catch((error) => {
				console.log(error);
			});
	},
    validations () {
        return {
            textareaCreatePublication: {required, minLength: minLength(4)},
            }
        },
    components: {
            'item': Item,
            'Profile': Profile
    },
    methods: {
        createPublication() {
            console.log($store.state)
            axios({
                method: "POST",
                url: "http://localhost:5000/api/createPublication",
                headers: { 
                    "Authorization": `Bearer ${$store.state.user.token}`
                },
                data: {
                    username: $store.state.user.username,
                    userId: $store.state.user.userId,
                    content: this.textareaCreatePublication
                }
            })
            .then((response) => {
                this.created();
                this.textareaCreatePublication = '';
                console.log("createPubli", response)
            })
        },
        async created() {
            await axios({
                method: "GET",
                url: "http://localhost:5000/api/allPublications",
                headers: { 
                        "Authorization": `Bearer ${$store.state.user.token}`
                }
            })
            .then((response) => {
                console.log(response)
                this.tableauPublications = response.data.map((publication) => {
                    publication.createdAt = dayjs(publication.createdAt).format("DD-MMM-YYYY à HH:mm");
                    return publication
                });
            })
            .catch((error) => {
                console.log(error);
            });
        },
        deletePublication(publication) {
            axios({
                method: "DELETE",
                url: `http://localhost:5000/api/deletePublication/${publication.id}`,
                headers: { 
                    "Authorization": `Bearer ${$store.state.user.token}`
                },
                data: {
                    userId: publication.userId
                }
            })
            .then(() => {
                const index = this.tableauPublications.findIndex((value) => value.id === publication.id)
                this.tableauPublications.splice(index, 1) //enlève 1 élément du tableau
            })
        },
    },
}
</script>

<style scoped>
.container {
    margin-top: 50px;
    width: 500px;
}
textarea {
    display: block;
    width: 100%;
    height: 150px;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
}
.container-card {
    display: flex;
    flex-direction: column;
}
.card {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 25px 50px 25px 25px;
    width: 100%;
    position: relative;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
}
a {
    text-decoration: none;
    color: black;
    font-weight: 700;
}
</style>