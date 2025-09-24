import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('useLanguage', {
    state: () => ({
        lang: localStorage.getItem('lang')
    }),
    actions: {
        changeLanguage(lan) {
            this.lang = lan
            localStorage.setItem('lang', this.lang)
        }
    }
})