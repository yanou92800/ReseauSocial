<template>
    <div class="container">
        <textarea v-model="formData.publication" type="texte"></textarea>
        <button v-on:click.prevent="creationItem">Publier</button>
        <div class="container-card">
            <div v-bind:key="index" v-for="(publication, index) in tableauPublications" class="card">
                <item v-bind:id="index" v-bind:publication="publication" v-bind:suppression="suppression"></item>
            </div>
        </div>
    </div>
</template>

<script>

import Item from './Item.vue'

export default {
    name: "Publications",
    data(){
        return {
            formData: {
                    publication: '',
                },
            tableauPublications: [
                "1 Salut ca va?eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                "2 Salut ca va?eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                "3 Salut ca va?eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                "4 Salut ca va?eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                "5 Salut ca va?eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                "6 Salut ca va?eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                "7 Salut ca va?eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            ],
        }
    },
    components: {
            'item': Item,
    },
    methods: {
        creationItem: function() {
            this.tableauPublications.push(this.formData.publication)
            this.formData.publication= ''
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