import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import './services/axios'
import { useLanguageStore } from './stores/languageStore'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import enSettings from '@/locales/en/settings.json'
import enNavigation from '@/locales/en/navigation.json'
import enCategories from '@/locales/en/categories.json'
import enAddBookmark from '@/locales/en/addBookmark.json'
import enHome from '@/locales/en/home.json'
import enAddCategory from '@/locales/en/addCategory.json'

import faAddCategory from '@/locales/fa/addCategory.json'
import faHome from '@/locales/fa/home.json'
import faAddBookmark from '@/locales/fa/addBookmark.json'
import faCategories from '@/locales/fa/categories.json'
import faNavigation from '@/locales/fa/navigation.json'
import faSettings from '@/locales/fa/settings.json'
import { startAllStores } from './stores/init/startAllState'






const app = createApp(App)
app.use(createPinia())
app.use(router)
await startAllStores()

const useLanguage = useLanguageStore()

const messages = {
    en: {
        settings: enSettings,
        navigation: enNavigation,
        categories: enCategories,
        addBookmark: enAddBookmark,
        home: enHome,
        addCategory: enAddCategory
    },
    fa: {
        settings: faSettings,
        navigation: faNavigation,
        categories: faCategories,
        addBookmark: faAddBookmark,
        home: faHome,
        addCategory: faAddCategory
    }
}

const i18n = createI18n({
    legacy: false,
    locale: useLanguage.lang,
    fallbackLocale: 'en',
    messages
})





app.use(i18n)
app.mount('#app')
