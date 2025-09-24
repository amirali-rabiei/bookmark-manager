// import axios from 'axios'

// axios.defaults.withCredentials = true

// const specialPageAxios = axios.create({
//     baseURL: 'http://localhost:3000/refresh-token',
//     timeout: 5000
// })

// specialPageAxios.interceptors.response.use((response => console.log(response)), async (err) => {
//     if (err.response?.status === 401) {

//         try {

//             await specialPageAxios.post('http://localhost:3000/refresh-token')
//             await specialPageAxios.get('http://localhost:3000/me')
//         }
//         catch (error) {
//             console.log(error)
//         }
//     }
// })