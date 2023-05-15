import connectAPI from '../connectAPI'

export default async function deletePost(id) {
    const api = connectAPI()
    const response = await api.delete(`careers/${id}/`)
    return response
}