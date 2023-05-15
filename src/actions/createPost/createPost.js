import connectAPI from '../connectAPI'

export default async function createPost(username, title, content) {
    const api = connectAPI()
    const response = await api.post(
        'careers/',
        {
            username:username,
            title: title,
            content: content
        }
    )
    return response
}