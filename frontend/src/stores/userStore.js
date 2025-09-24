import axios from 'axios'
import { defineStore } from 'pinia'


export const useUser = defineStore('user', {
    state: () => ({
        isAuth: false
    }),

    actions: {

        async fetchUserInfo() {
            try {

                await axios.post('http://localhost:3000/me', {}, {
                    withCredentials: true
                })
                    .then((result) => {
                        if (result.status === 200) {
                            this.isAuth = true
                        }
                    })
                    .catch(async (error) => {
                        if (error.response?.status === 401) {
                            try {
                                await axios.post('http://localhost:3000/refresh-token', {}, {
                                    withCredentials: true
                                })

                                await axios.post('http://localhost:3000/me', {}, {
                                    withCredentials: true
                                })
                                this.isAuth = true
                            } catch (error) {
                                console.log('token didnt refreshed')
                                this.isAuth = false
                            }

                        }
                    })


            } catch (error) {
                console.log(error)
                this.isAuth = false
            }
        }
    }
})