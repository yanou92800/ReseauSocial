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
  createPublication() {
    return PublicationApi.createPublication()
    .then((response) => response.data[0])
  }
}

export { PublicationService }

