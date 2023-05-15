import connectAPI from '../connectAPI'

export default async function getPosts(url='') {
    const api = connectAPI()
    const response = await api.get('careers/'+url)
    return response.data
}