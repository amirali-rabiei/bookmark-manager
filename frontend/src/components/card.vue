<script setup>
import { useBookmarkStore } from '@/stores/bookmarkStore';
import { useSearch } from '@/stores/search';
import axios from 'axios';
import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue';

const useS = useSearch()




// const errorMessage = ref('')
const bookMakrs = ref('')
const isLoading = ref(false)
const isSorted = ref(false)
const isListed = ref(false)
const isFavorite = ref(false)

const cardContainer = ref(null)
const cards = ref([])



const listView = () => {

    isListed.value = !isListed.value
}

const useBookmarks = useBookmarkStore()

onMounted(async () => {
    try {

        // bookMakrs.value = useBookmarks.bookmarks
        // isLoading.value = true

        await axios.post('http://localhost:3000/fetchBookmarks', {}, {
            withCredentials: true
        })
            .then((result) => {
                isSorted.value = false
                isLoading.value = true
                bookMakrs.value = result.data
            })
            .catch((error) => {
                console.log(error)
            })

    } catch (error) {
        console.log(error)
    }
})

const changeState = () => {
    isSorted.value = !isSorted.value
}

const favoriteHandler = async (bookmarkId) => {
    isFavorite.value = !isFavorite.value
    try {
        await axios.post('http://localhost:3000/addBookmarkToFavorit', { isFavorite: isFavorite.value, bookmarkId: bookmarkId }, {
            withCredentials: true
        })

            .then((result) => {
                if (result.status === 200) {
                    updateIsFavorite()
                }
            })
            .catch((error) => {
                console.log(error)
            })

    } catch (error) {
        console.log(error)
    }
}

const updateIsFavorite = () => {
    if (isFavorite.value) {
        isFavorite.value = false
    } else {
        isFavorite.value = true
    }
}

const sortedBookmarks = computed(() => {
    return [...bookMakrs.value].sort((a, b) => {
        return a.name.localeCompare(b.name)
    })
})


const showByFavoriteRef = ref(false)
const showByFavorite = () => {
    showByFavoriteRef.value = !showByFavoriteRef.value
}


const filtredBookmarks = computed(() => {
    let bookmarksToFilter = isSorted.value ? sortedBookmarks.value : bookMakrs.value
    if (showByFavoriteRef.value) {
        return bookmarksToFilter.filter(bookmark => bookmark.isFavorite === true)

    } else {
        return bookmarksToFilter
    }
})


</script>

<template>

    <div>

        <div
            class="flex flex-col lg:flex-row lg:text-left gap-y-4 text-center justify-between items-center py-[30px]  px-[34px] mb-[20px]">
            <div>
                <h3 class="text-[33px] text-[#F4F4F4]">{{ $t('home.title') }}</h3>
                <p class="text-[19px] text-[#7F7F7F]"> {{ $t('home.text') }}</p>
            </div>

            <div class="flex gap-x-[15px]">
                <div @click="changeState"
                    class="py-[10px] text-[#FDFDFD] rounded-[10px] px-[20px] border-1 border-[#616161]">
                    <button>
                        {{ $t('home.sort') }}
                    </button>
                </div>
                <div @click="listView"
                    class="py-[10px] hidden sm:block text-[#FDFDFD] rounded-[10px] px-[20px] border-1 border-[#616161]">
                    <button>
                        {{ $t('home.list') }}
                    </button>
                </div>
                <div @click="showByFavorite"
                    class="py-[10px] text-[#FDFDFD] rounded-[10px] px-[20px] border-1 border-[#616161]">
                    <button>
                        {{ $t('home.list-favorite') }}
                    </button>
                </div>
            </div>
        </div>


        <div v-if="isLoading"
            :class="['px-[35px] py-2 flex flex-col gap-[10px]', isListed ? 'flex-col ' : 'flex-row flex-wrap']"
            ref="cardContainer">

            <div ref="cards" v-for="bookmark of filtredBookmarks" :key="bookmark.id"
                :class="['bg-[#232323] px-[16px] flex w-full justify-between rounded-[10px] border-1 border-[#515151]', isListed ? 'w-full py-[5px]' : 'lg:w-[291px] h-[210px] py-[15px]']">
                <div :class="isListed ? 'flex gap-4 items-center' : ''">
                    <img :class="['w-[50px] h-[55px] rounded-[50%] border-1 border-[#515151] text-center', isListed ? ' block' : 'hidden']"
                        :src="`http://localhost:3000/${bookmark.logo}`" :alt="'no logo'">
                    <div class="flex flex-col justify-between h-full">
                        <div>
                            <RouterLink :to="`/bookmark/${bookmark.id}`">
                                <h4 class="text-[1.25rem] text-[#FDFDFD]"> {{ bookmark.name }}</h4>
                            </RouterLink>

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