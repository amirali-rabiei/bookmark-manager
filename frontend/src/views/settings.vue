<script setup>
import { useBookmarkStore } from '@/stores/bookmarkStore';
import axios from 'axios';
import { ref } from 'vue';
import { GeneralSettings } from '../components/settings/index'
import AppearanceSettings from '../components/settings/AppearanceSettings/AppearanceSettings.vue'


const file = ref('')
const isSuccess = ref(false)
const successMessage = ref('')

const bookmarkStore = useBookmarkStore()
const exportDataHanlder = () => {

    const jsonString = JSON.stringify(bookmarkStore.bookmarks, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'bookmarks.json'
    link.click()
    URL.revokeObjectURL(url)

}

const fileUploadHandler = (e) => {
    file.value = e.target.files[0]

}

const importHandler = async () => {
    try {

        const reader = new FileReader()

        if (file.value) {

            reader.onload = async (e) => {
                const fileContent = e.target.result

                const parsed = JSON.parse(fileContent)

                const response = await axios.post('http://localhost:3000/importBookmark', parsed, {
                    withCredentials: true
                })

                if (response.status === 200) {
                    isSuccess.value = true
                    successMessage.value = 'Bookmarks imported successfully'
                }
            }

            reader.readAsText(file.value)

        }

    } catch (error) {
        console.log(error)
    }
}




const clearHanler = async () => {
    try {

        const response = await axios.post('http://localhost:3000/clearAlluserBookmarks', {}, {
            withCredentials: true
        })
        if (response.status === 200) {
            isSuccess.value = true
            successMessage.value = 'Bookmarks removed successfully'
        }

    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <div>
        <div class="py-[30px] px-[34px]">

            <div v-if="isSuccess"
                class="absolute right-[34px] w-fit bg-red-500 rounded-sm text-white text-sm font-bold px-4 py-3"
                role="alert">
                <p>{{ successMessage }}</p>
            </div>

            <GeneralSettings />
            <AppearanceSettings />

            <div class="bg-[#232323] rounded-[10px] p-[20px] mt-[30px] w-full lg:w-[70%] border-1 border-[#515151]">
                <h3 class="text-[25px] text-[#F4F4F4]">{{ $t('settings.bookmark-management') }}</h3>
                <div class="grid lg:grid-cols-2 gap-y-3 items-center  py-6">
                    <p class="text-[1rem] text-[#FDFDFD]">{{ $t('settings.import-bookmarks') }}</p>
                    <button @click="exportDataHanlder" class="bg-[#F7F7F7] flex items-center py-1 w-[50%] justify-center text-[1.1rem] rounded-[10px] text-[#262626] lg:h-[36px] lg:w-[161px]
                    border-none">
                        <i class="fa fa-upload text-[0.887rem]"></i>
                        {{ $t('settings.export-data') }}</button>



                </div>
                <div class="grid lg:grid-cols-2 gap-y-3  py-2">
                    <p class="text-[1rem] text-[#FDFDFD]">{{ $t('settings.import-bookmarks') }}</p>

                    <div class="flex flex-col gap-y-3 gap-x-1.5 lg:flex-row lg:items-center">
                        <input type="file" v-on:change="fileUploadHandler"
                            class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#515151]">
                        <button @click="importHandler" class="bg-[#F7F7F7] flex items-center py-1 w-[50%] justify-center text-[1.1rem] rounded-[10px] text-[#262626] lg:h-[46px] lg:w-[161px]
                    border-none">
                            <i class="fa fa-download text-[0.887rem]"></i>
                            {{ $t('settings.import') }}</button>
                    </div>

                </div>
                <div class="grid lg:grid-cols-2 gap-y-3  py-2">
                    <p class="text-[1rem] text-[#FDFDFD]">{{ $t('settings.clear-all-bookmarks') }}</p>
                    <button @click="clearHanler" class="bg-red-700 hover:bg-red-600 flex items-center py-1 w-[50%] justify-center text-[1.1rem] rounded-[10px] text-white lg:h-[36px] lg:w-[161px]
                    border-none">
                        <i class="fa fa-trash text-[0.887rem]"></i>
                        {{ $t('settings.clear-all') }}</button>

                </div>

            </div>

        </div>

    </div>
</template>