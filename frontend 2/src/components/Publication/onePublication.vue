<template>
  <v-container
    class="d-flex flex-column mx-auto my-10"
    justify-content="center"
    align="center"
  >
    <v-row>
      <v-col cols="12">
        <v-card
          class="mx-auto"
          align="center"
          min-width="40vw"
          max-width="70vw"
        >
          <v-list-item class="red lighten-3" align="start" hover>
            <router-link :to="`/profile/${publication}`">
              <v-list-item-avatar outlined color="grey darken-3">
                <v-img :src="publication.avatar" alt="photo de profil"></v-img>
              </v-list-item-avatar>
            </router-link>

            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">{{
                publication.username
              }}</v-list-item-title>
              <v-list-item-title class="text-caption">{{
                publication.createdAt | formatDate
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-row>
            <v-col>
              <v-card-text class="text-start">{{ publication.content }}</v-card-text>
              <!-- <v-img contain max-height="600" :src="publication[0].attachment"></v-img> -->
            </v-col>
          </v-row>

          <v-card-actions align="center">
            <v-col>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mr-5" v-bind="attrs" v-on="on" text small>
                    <router-link :to="`/publication/update/${publication.id}`">
                      <v-icon color="cyan darken-2" size="1.5rem">mdi-pen-plus</v-icon>
                    </router-link>
                  </v-btn>
                </template>
                <span>Modifier</span>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn @click.stop="dialog = true" v-bind="attrs" v-on="on" text color="deep-orange darken-3" small>
                    <v-icon size="1.5rem">mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span class="ml-5">Supprimer</span>
                <v-dialog v-model="dialog" max-width="500">
                  <v-card>
                    <v-card-title>Veuillez confirmer la suppression de la publication.</v-card-title>
                    <v-card-actions @click="dialog = false">
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text>Annuler</v-btn>
                      <v-btn color="green darken-3" text @click="deletepublication">Supprimer la publication</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            </v-col>
            <v-col>
              <v-tooltip top v-if="!isLiked">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="addLike"
                    aria-label="Aimer cette publication"
                  >
                    <v-icon size="1.5rem" color="green">
                      mdi-thumb-up-outline
                    </v-icon>
                  </v-btn>
                </template>
                <div v-bind:key="index" v-for="(like, index) in Likes" class="card">
                  <v-list-item-avatar outlined color="grey darken-3">
                    <v-img :src="like.avatar" alt="photo de profil"></v-img>
                  </v-list-item-avatar>
                  <strong>{{ like.username }}</strong>
                </div>
                <i>J'aime</i>
              </v-tooltip>
              <v-tooltip top v-else-if="isLiked">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="removeLike"
                    aria-label="Ne plus aimer cette publication"
                  >
                    <v-icon size="1.5rem" color="green">
                      mdi-thumb-up
                    </v-icon>
                  </v-btn>
                </template>
                <div v-bind:key="index" v-for="(like, index) in Likes" class="card">
                  <v-list-item-avatar outlined color="grey darken-3">
                    <v-img :src="like.avatar" alt="photo de profil"></v-img>
                  </v-list-item-avatar>
                  <strong>{{ like.username }}</strong>
                </div>
                <i>Je n'aime plus</i>
              </v-tooltip>
              <span>{{ Likes.length }}</span>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card
          class="mx-auto my-5"
          min-width="350"
          max-width="60vw"
          v-for="comment in publication.Comments"
          :key="comment.id"
        >
          <v-list-item>
            <router-link :to="`/profile/${comment.User.id}`">
              <v-list-item-avatar outlined color="grey darken-3">
                <v-img
                  x-small
                  :src="comment.User.avatar"
                  alt="photo du compte qui commente"
                ></v-img>
              </v-list-item-avatar>
            </router-link>

            <v-card-text
              ><span class="font-weight-medium text-decoration-underline">{{
                comment.User.username
              }}</span>
              a commenté :</v-card-text
            >
          </v-list-item>
          <v-card-text class="black--text">{{ comment.content }}</v-card-text>
          <v-list-item>
            <v-card-text class="end text-caption"
              >le {{ comment.createdAt | formatDate }}</v-card-text
            >
            <v-tooltip
              right
              top
              v-if="comment.User.id == userId || isAdmin == true"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click.stop="dialog = true"
                  v-bind="attrs"
                  v-on="on"
                  text
                  color="deep-orange darken-3"
                  small
                  aria-label="Supprimer ce commentaire"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Supprimer</span>
              <v-dialog v-model="dialog" max-width="500">
                <v-card>
                  <v-card-title>
                    Supprimer votre commentaire ?
                  </v-card-title>

                  <v-card-actions @click="dialog = false">
                    <v-spacer></v-spacer>

                    <v-btn color="green darken-1" text>
                      Annuler
                    </v-btn>

                    <v-btn
                      color="green darken-3"
                      text
                      @click="deleteComment(comment.id)"
                    >
                      Supprimer
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-tooltip>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-container>
          <v-card flat>
            <div>
              <v-form
                ref="form"
                v-model="valid"
                @submit.prevent="commentSubmit()"
              >
                <v-textarea
                  id="postCom"
                  outlined
                  v-model="comment"
                  type="text"
                  placeholder="Votre commentaire..."
                  required
                  :rules="commentRules"
                ></v-textarea>
                <div align="center">
                  <v-btn
                    type="submit"
                    small
                    value="submit"
                    color="cyan darken-2"
                    dark
                    :disabled="!valid"
                    >Poster</v-btn
                  >
                </div>
              </v-form>
            </div>
          </v-card>
        </v-container>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";
import $store from "@/store/index";
import dayjs from "dayjs";
import { mapState } from "vuex";
import { PublicationService } from "./publication.service"

export default {
  name: "onePublication",
  components: {},
  data() {
    return {
      user: {},
      publication: {
        User: {
          id: "",
          username: "",
          avatar: "",
        },
        Comments: [],
      },
      comment: "",
      Likes: [],
      isLiked: 0,
      dialog: false,
      valid: false,
      commentRules: [
        (v) =>
          (v && v.length >= 3) ||
          "Votre commentaire doit contenir au moins 3 caractères.",
      ],
    };
  },
  created() {
    this.getLikes();
    PublicationService.getOnePublication(this.$route.params.id, $store.state.token)
    .then((publication) => {
      this.publication = publication
    })
    .catch((error) => {
        console.log(error);
    });   
  },
  methods: {
    toBottom() {
      this.$vuetify.goTo("#postCom");
    },
    deletepublication() {
      this.dialog = false;
      axios
        .delete(
          "http://localhost:5000/api/deletePublication/" + this.$route.params.id,
          {
            headers: {
              Authorization: `Bearer ${$store.state.token}`,
            },
          }
        )
        .then(() => {
          this.$store.dispatch("setSnackbar", {
            text: "Votre publication a été supprimé.",
          });
          this.$router.push({
            name: "allPublications",
          });
        })
        .catch(() => {
          this.$store.dispatch("setSnackbar", {
            color: "error",
            text: "Impossible de supprimer le publication.",
          });
        });
    },
    commentSubmit() {
      console.log($store.state)
      if (this.$refs.form.validate()) {
        axios
          .post(
            "http://localhost:5000/api/onePublication/" +
              this.$route.params.id +
              "/createComment",
            { content: this.comment,
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
              text: "Commentaire ajouté.",
            });
            PublicationService.getOnePublication(this.$route.params.id, $store.state.token)
            .then((publication) => {
              this.publication = publication
            })
          })
          .catch(() => {
            this.$store.dispatch("setSnackbar", {
              text: "Impossible d'ajouter votre commentaire.",
            });
          });
      }
    },
    deleteComment(id) {
      axios
        .delete(
          "http://localhost:5000/api/deletePublication/" +
            +this.$route.params.id +
            "/deleteComment/" +
            id,
          {
            headers: {
              Authorization: `Bearer ${$store.state.token}`,
            },
          }
        )
        .then(() => {
          this.$store.dispatch("setSnackbar", {
            text: "Commentaire supprimé.",
          });
          window.location.reload();
        })
        .catch(() => {
          this.$store.dispatch("setSnackbar", {
            color: "error",
            text: "Impossible de supprimer votre commentaire.",
          });
        });
    },
    getLikes() {
      axios
        .get(
          "http://localhost:5000/api/onePublication/" +
            +this.$route.params.id +
            "/getAllLikes",
          {
            headers: {
              Authorization: `Bearer ${$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.Likes = response.data;

          for (let i = 0; i < this.Likes.length; i++) {
            if (this.Likes[i].userId == $store.state.userId) {
              this.isLiked++;
              break;
            }
          }
        })
        .catch(() => {
          this.$store.dispatch("setSnackbar", {
            color: "error",
            text: "Erreur de chargement. Veuillez réessayer.",
          });
        });
    },
    addLike() {
      if (this.isLiked == 0) {
        const data = {
          userId: $store.state.userId,
          publicationId: this.$route.params.id,
        };
        axios
          .post(
            "http://localhost:5000/api/onePublication/" +
              +this.$route.params.id +
              "/addLike",
            data,
            {
              headers: {
                Authorization: `Bearer ${$store.state.token}`,
              },
            }
          )
          .then((response) => {
            this.like = response.data;
            this.$store.dispatch("setSnackbar", {
              text: "Like ajouté !",
            });
            this.$router.go();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$store.dispatch("setSnackbar", {
          color: "error",
          text: "Veuillez réessayer.",
        });
      }
    },
    removeLike() {
      if (this.isLiked == 1) {
        axios
          .delete(
            "http://localhost:5000/api/onePublication/" +
              +this.$route.params.id +
              "/deleteLike",
            {
              headers: {
                Authorization: `Bearer ${$store.state.token}`,
              },
            }
          )
          .then((response) => {
            this.like = response.data;
            this.$store.dispatch("setSnackbar", {
              text: "Like supprimé.",
            });
            this.$router.go();
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
  filters: {
    formatDate(value) {
      if (value) {
        return dayjs(String(value)).format("DD-MMM-YYYY à HH:mm");
      }
    },
  },
  computed: {
    ...mapState(["isAdmin", "userId"]),
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
