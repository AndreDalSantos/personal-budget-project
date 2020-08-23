import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://192.168.0.106:3333'     // Dispositivo físico (necessário checar IP do servidor)
    baseURL: 'http://10.0.2.2:3333'             // Emulador do Android Studio
    // baseURL: 'localhost:3333'
})

export default api