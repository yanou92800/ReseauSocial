import axios from 'axios'

const PublicationApi = {
  getOnePublication(id, token) {
    return axios
    .get("http://localhost:4000/api/onePublication/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  getAllPublications(token) {
    return axios
    .get("http://localhost:4000/api/allPublications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  getAllComments(id, token) {
    return axios
    .get("http://localhost:4000/api/onePublication/" + id + "/allComments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
};

export { PublicationApi }
