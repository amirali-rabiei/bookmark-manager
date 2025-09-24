import { defineStore } from "pinia"

export const useAutoFetchStore = defineStore('authFetch', {
    state: () => ({
        isAuto: JSON.parse(localStorage.getItem('persist') || true)
    }),
    actions: {
        toggleAutoFetch() {
            this.isAuto = !this.isAuto
            localStorage.setItem('persist', JSON.stringify(this.isAuto))
        }
    }
})