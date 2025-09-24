<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const bookmarks = ref('')
const isLoading = ref(false)

onMounted(async () => {
    try {

        await axios.post('http://localhost:3000/getFrequentBookmarks', {}, {
            withCredentials: true
        })
            .then((result) => {
                isLoading.value = true
                bookmarks.value = result.data
            })
            .catch((error) => {
                isLoading.value = false
                console.log(error)
            })

    } catch (error) {
        isLoading.value = false
        console.log(error)
    }
})

</script>

<template>
    <div>


        <div v-if="isLoading">

            <div class="px-[35px] py-[35px] flex-wrap gap-[15px] flex-col">

                <div ref="cards" v-for="bookmark of bookmarks" :key="bookmark.id"
                    class="bg-[#232323] px-[16px] flex justify-between rounded-[10px] border-1 border-[#515151] w-full py-[5px] mb-[10px]">
                    <div class="flex gap-4 items-center">
                        <img class="w-[55px] h-[55px] rounded-md border-1 border-[#515151] text-center"
                            :src="`http://localhost:3000/${bookmark.logo}`" :alt="'no logo'">
                        <div class="flex flex-col justify-between h-full">
                            <div>
                                <h4 class="text-[28px] text-[#FDFDFD]">{{ bookmark.name }}</h4>
                                <p class="text-[#D1D1D1] text-[16px] w-full">{{
                                    bookmark.description }}</p>
                            </div>
                        </div>

                    </div>
                    <div class="flex justify-between gap-x-5 flex-row items-center">


                        <span class="bg-[#1B1B1B] text-[#FDFDFD] p-[10px] rounded-[8px]">{{
                            bookmark.category.categoryName
                            }}</span>
                        <div>
                            <i @click="favoriteHandler(bookmark.id)"
                                :class="bookmark.isFavorite ? 'fa fa-star text-amber-300' : 'fa fa-star text-gray-200'"></i>
                        </div>
                        <div class="bg-gray-200 p-[10px] rounded-md text-center">
                            <i class="fa fa-list"></i>
                        </div>
                    </div>
                </div>


            </div>
        </div>

        <div v-else class="flex items-center justify-center h-[50vh]">

            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>

        </div>
    </div>
</template>