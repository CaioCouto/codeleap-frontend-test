import connectAPI from '../connectAPI'

export default async function updatePost(id, title, content) {
    const api = connectAPI()
    const response = await api.patch(
        `careers/${id}/`,
        {
            title: title,
            content: content
        }
    )
    return response
}