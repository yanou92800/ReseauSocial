import axios from 'axios'
import $store from "@/store/index";

const PublicationApi = {
  getOnePublication(id, token) {
    return axios
    .get("http://localhost:5000/api/onePublication/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  getAllPublications(token) {
    return axios
    .get("http://localhost:5000/api/allPublications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  createPublication(token) {
    return axios
    .post("http://localhost:5000/api/createPublication", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        username: $store.state.user.username,
        userId: $store.state.user.userId,
        content: this.textareaCreatePublication
      }
    })
  },
};

export { PublicationApi }
