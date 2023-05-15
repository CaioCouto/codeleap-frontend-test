import axios from "axios"

export default function connectAPI() {
    return axios.create({
        baseURL: 'https://dev.codeleap.co.uk',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}