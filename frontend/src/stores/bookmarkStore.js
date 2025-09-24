import axios from 'axios'
import { defineStore } from 'pinia'

export const useBookmarkStore = defineStore('bookmarks', {
    state: () => ({
        bookmarks: [],
        isLoaded: false,
    }),
    actions: {
        async fetchBookmarks() {
            try {
                const response = await axios.post('http://localhost:3000/fetchBookmarks', {}, {
                    withCredentials: true
                })

                if (response.status === 200) {
                    this.bookmarks = response.data
                    this.isLoaded = true
                }

            } catch (error) {
                console.log(error)
                this.isLoaded = false
            }

        }
    }
})