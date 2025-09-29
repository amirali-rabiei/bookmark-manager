<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const errorMessage = ref('')
const bookmarks = ref('')
const isListed = ref(false)
const isSorted = ref(false)
const isLoading = ref(false)
const showByFavoriteRef = ref(false)

const listView = () => {

    isListed.value = !isListed.value
}

const changeState = () => {
    isSorted.value = !isSorted.value
}

const showByFavorite = () => {
    showByFavoriteRef.value = !showByFavoriteRef.value
}


const sortedBookmarks = computed(() => {
    return [...bookmarks.value].sort((a, b) => {
        return a.name.localeCompare(b.name)
    })
})

const filtredBookmarks = computed(() => {
    let filtredBookmark = isSorted.value ? sortedBookmarks.value : bookmarks.value
    if (showByFavoriteRef.value) {
        return filtredBookmark.filter(bookmark => bookmark.isFavorite === true)
    }
    return filtredBookmark
})

onMounted(async () => {

    const categoryName = route.params.category
    isLoading.value = true

    try {

        const result = await axios.post('https://bookmark-manager-ndqv.vercel.app/findCategoryByName', { categoryName }, {
            withCredentials: true
        })

        bookmarks.value = result.data
        errorMessage.value = ''

    }

    catch (error) {
        isLoading.value = false
        if (error.response && error.response.status === 404) {
            errorMessage.value = 'Bookmark not found with this category'
        } else {
            errorMessage.value = 'An error occurred'
        }
    }

    finally {
        isLoading.value = false
    }
})

</script>



<template>
    <div>

        <div class="flex justify-center lg:justify-start items-center  py-[30px]  px-[34px] mb-[20px]">

            <div class="flex gap-x-[15px]">
                <div @click="changeState"
                    class="py-[10px] text-[#FDFDFD] rounded-[10px] px-[20px] border-1 border-[#616161]">
                    <button>
                        Sort
                    </button>
                </div>
                <div @click="listView"
                    class="py-[10px] text-[#FDFDFD] rounded-[10px] px-[20px] border-1 border-[#616161]">
                    <button>
                        List
                    </button>
                </div>
                <div @click="showByFavorite"
                    class="py-[10px] text-[#FDFDFD] rounded-[10px] px-[20px] border-1 border-[#616161]">
                    <button>
                        List by Favorite
                    </button>
                </div>
            </div>
        </div>

        <div v-if="!isLoading"
            :class="['px-[35px] py-2 flex flex-col gap-[10px]', isListed ? 'flex-col ' : 'flex-row flex-wrap']"
            ref="cardContainer">

            <div ref="cards" v-for="bookmark of bookmarks" :key="bookmark.id"
                :class="['bg-[#232323] px-[16px] flex w-full justify-between rounded-[10px] border-1 border-[#515151]', isListed ? 'w-full py-[5px]' : 'lg:w-[291px] h-[210px] py-[15px]']">
                <div :class="isListed ? 'flex gap-4 items-center' : ''">
                    <img :class="['w-[50px] h-[55px] rounded-[50%] border-1 border-[#515151] text-center', isListed ? ' block' : 'hidden']"
                        :src="`http://localhost:3000/${bookmark.logo}`" :alt="'no logo'">
                    <div class="flex flex-col justify-between h-full">
                        <div>
                            <h4 class="text-[1.25rem] text-[#FDFDFD]">{{ bookmark.name }}</h4>
                            <p :class="['text-[#D1D1D1] text-[0.875rem]', isListed ? 'w-full' : 'w-[160px]']">{{
                                bookmark.description }}</p>
                        </div>
                        <div v-if="!isListed">
                            <i @click="favoriteHandler(bookmark.id)"
                                :class="bookmark.isFavorite ? 'fa fa-star text-amber-300' : 'fa fa-star text-gray-200'"></i>
                        </div>

                    </div>

                </div>
                <div
                    :class="['flex justify-between gap-x-5', isListed ? 'flex-row items-center' : 'flex-col items-end']">
                    <img :class="['w-[55px] h-[55px] rounded-[50%] border-1 border-[#515151] text-center', isListed ? ' hidden' : 'block']"
                        alt="no logo" :src="`http://localhost:3000/${bookmark.logo}`">

                    <span class="bg-[#1B1B1B] text-[#FDFDFD] p-[10px] text-[1rem] rounded-[8px]">{{
                        bookmark.category.categoryName
                        }}</span>
                    <div v-if="isListed">
                        <i @click="favoriteHandler(bookmark.id)"
                            :class="bookmark.isFavorite ? 'fa fa-star text-amber-300' : 'fa fa-star text-gray-200'"></i>
                    </div>
                    <div v-if="isListed" class="bg-gray-200 p-[10px] rounded-md text-center">
                        <i class="fa fa-list"></i>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="flex items-center justify-center h-[50vh]">
            <div class="text-center py-[50px] text-white" v-if="errorMessage">
                <p>{{ errorMessage }}</p>
            </div>

            <div role="status" v-if="!errorMessage">
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