<template>
    <div class="container">
        <form @submit.prevent="onSubmit">
            <textarea v-model="v$.form.formData.publication.$model" type="texte"></textarea>
            <button :disabled="v$.form.formData.publication.$invalid" v-on:click.prevent="createPublication">Publier</button>
        </form>
        <div class="container-card">
            <div v-bind:key="index" v-for="(publication, index) in tableauPublications" class="card">
                <item v-bind:id="index" v-bind:publication="publication" v-bind:suppression="suppression"></item>
            </div>
        </div>
    </div>
</template>

<script>

import Item from '../Item'
import axios from "axios";
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

export default {
    name: "allPublications",
    setup () {
        return { v$: useVuelidate() }
    },
    data(){
        return {
            form: {
                formData: {
                    publication: '',
                }
            },
            tableauPublications: [],
        }
    },
    async created() {
		await axios
			.get("http://localhost:5000/api/publication/allPublications")
			.then((response) => {
				this.tableauPublications = response.data;
			})
			
			.catch((error) => {
				console.log(error);
			});
	},
    validations () {
        return {
            form: { 
                formData: {
                    publication: { required, minLength: minLength(4) },
                }
            },
        }
    },
    components: {
            'item': Item,
    },
    methods: {
        createPublication() {
            this.tableauPublications.push(this.form.formData.publication)
            this.form.formData.publication = '';
        },
        suppression: function(e) {
                // console.log(e.target.parentNode.id);
                this.tableauPublications.splice(e.target.parentNode.id, 1)//enlève 1 élément du tableau
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
    flex-direction: column-reverse;
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

</style>