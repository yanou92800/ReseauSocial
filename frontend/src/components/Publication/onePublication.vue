<template>
    <Profile></Profile>
    <div class="container">
        <form @submit.prevent="onSubmit">
            <textarea v-model="v$.textareaCreateComment.$model" type="texte"></textarea>
            <button :disabled="v$.textareaCreateComment.$invalid" v-on:click.prevent="createComment">Commenter</button>
        </form>
        <div class="container-card">
            <div v-bind:key="index" v-for="(comment, index) in tableauComments" class="card">
                <strong>Posté par {{ comment.username }} le {{ comment.createdAt }} </strong>
                <strong v-bind:comment="comment.content"></strong>
            </div>
        </div>
    </div>
</template>

<script>
import Profile from '../Profile/Profile'
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import $store from "@/store/index";
import dayjs from 'dayjs';
import { PublicationService } from "./publication.service"
export default {
    name: "onePublication",
    setup() {
        return { v$: useVuelidate() }
    },
    data(){
        return {
            textareaCreateComment: '',
            tableauComments: [],
            publication: {
                User: {
                    id: "",
                    username: "",
                    avatar: "",
                },
            },
            comment: "",
        }
    },
    created() {
        PublicationService.getOnePublication(this.$route.params.id, $store.state.user.token)
        .then((publication) => {
            this.$emit('getAllPublications');
            this.publication = publication
        })
        .catch((error) => {
            console.log(error);
        });
    },
    mounted() {
        PublicationService.getAllComments(this.$route.params.id, $store.state.user.token)
            .then((comment) => {
                //console.log("Tableau" , publication)
                this.commentList = comment;
                comment.createdAt = dayjs(comment.createdAt).format("DD-MMM-YYYY à HH:mm");
            })
            .catch((error) => {
                console.log(error);
            });
    },
    validations () {
        return {
            textareaCreateComment: {required, minLength: minLength(4)},
            }
        },
    components: {
            'Profile': Profile
    },
    methods: {
        createComment() {
            console.log($store.state)
            axios({
                method: "POST",
                url: "http://localhost:5000/api/onePublication/" + this.$route.params.id + "/createComment",
                headers: { 
                    "Authorization": `Bearer ${$store.state.user.token}`
                },
                data: {
                    username: $store.state.user.username,
                    userId: $store.state.user.userId,
                    content: this.textareaCreateComment
                }
            })
            .then((response) => {
                this.mounted();
                this.textareaCreateComment = '';
                console.log("createComment", response)
            })
        },
        mounted() {
            PublicationService.getAllComments(this.$route.params.id, $store.state.user.token)
                .then((comment) => {
                    //console.log("Tableau" , publication)
                    this.commentList = comment;
                })
                .catch((error) => {
                    console.log(error);
                });
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
</style>