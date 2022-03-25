import { PublicationApi } from './publication.api'

const PublicationService = {
  getOnePublication(id, token) {
    console.log(PublicationApi)
    return PublicationApi.getOnePublication(id, token)
    .then((response) => response.data[0])
  },
  getAllPublications(token) {
    console.log(PublicationApi)
    return PublicationApi.getAllPublications(token)
    .then((response) => response.data)
  },
  getAllComments(id, token) {
    console.log(PublicationApi)
    return PublicationApi.getAllComments(id, token)
    .then((response) => response.data)
  },
}

export { PublicationService }

