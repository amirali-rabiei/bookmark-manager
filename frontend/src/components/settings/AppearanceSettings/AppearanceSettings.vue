<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLanguageStore } from '../../../stores/languageStore';

const { locale } = useI18n()



const language = ref('')
const useLanguage = useLanguageStore()
const changeLangState = () => {
    locale.value = language.value
    useLanguage.changeLanguage(language.value)
}

</script>

<template>
    <div class="bg-[#232323] rounded-[10px] p-[20px] mt-[30px] w-full lg:w-[70%] border-1 border-[#515151]">
        <h3 class="text-[25px] text-[#F4F4F4]">{{ $t('settings.appearance') }}</h3>
        <div class="grid lg:grid-cols-2 gap-y-3  items-center  py-6">
            <h4 class="text-[1rem] text-[#FDFDFD]">{{ $t('settings.dark-mode') }}</h4>
            <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" checked>
                <div
                    class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600">
                </div>
            </label>

        </div>
        <div class="grid lg:grid-cols-2 gap-y-3  items-center py-2">
            <h4 class="text-[1rem] text-[#FDFDFD]">{{ $t('settings.language') }}</h4>
            <select name="" id="" @change="changeLangState" v-model="language"
                class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[75%]  h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#FDFDFD]">
                <option disabled value="">Choose language</option>
                <option value="en" selected>En</option>
                <option value="fa">Fa</option>
            </select>

        </div>
    </div>
</template>