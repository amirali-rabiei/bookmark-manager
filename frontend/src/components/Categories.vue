<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';


const categories = ref('')
const isLoading = ref(false)
const searchCategories = ref([])

onMounted(async () => {
    try {

        await axios.post('http://localhost:3000/fetchCateGories', {}, {
            withCredentials: true
        })
            .then((result) => {
                isLoading.value = true
                categories.value = result.data
                searchCategories.value.push(result.data)
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

const searchInput = ref('')
const searchInputFun = (e) => {
    searchCategories.value = []
    searchInput.value = e.target.value

    categories.value.find((i) => {
        const reg = new RegExp(`${searchInput.value}`)
        if (reg.test(i.categoryName)) {
            searchCategories.value.push({ categoryName: i.categoryName, categoryCount: i.count, categoryIcon: i.categoryIcon })
        }
    })

}

</script>

<template>

    <div>
        <RouterView></RouterView>
        <div
            class="flex flex-col lg:flex-row text-center lg:text-left gap-y-4 container mx-auto justify-between items-center py-[30px] px-[34px] mb-[20px]">
            <div>
                <h3 class="text-[33px] text-[#F4F4F4]">{{ $t('categories.title') }}</h3>
                <p class="text-[19px] text-[#7F7F7F]">{{ $t('categories.text') }}</p>
            </div>

            <div class="flex flex-col lg:flex-row lg:gap-x-[15px] items-center gap-y-[15px]">
                <RouterLink to="/AddCategory" class="bg-[#F7F7F7] flex items-center py-1 w-[50%] justify-center text-[1.1rem] rounded-[10px] text-[#262626] lg:h-[46px] lg:w-[161px]
                    border-none">
                    {{ $t('categories.add-new') }}
                    <i class="fa fa-plus"></i>
                </RouterLink>
                <div class="text-[#515151] flex items-center relative">
                    <i class="fa fa-search absolute left-3"></i>
                    <input @keyup="searchInputFun" v-model="searchInput" type="text" :placeholder="`${$t('categories.search')}`"
                        class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[259px] h-[46px] py-[10px] px-[50px] outline-none border-[#515151]">
                </div>
                <div
                    class="py-[10px] hidden sm:block text-[#FDFDFD] rounded-[10px] px-[20px] border-1 border-[#616161]">
                    <button>
                        {{ $t('categories.list') }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="isLoading" class="px-[15px] py-5 flex gap-[10px] flex-wrap container mx-auto">
            <div v-for="category of categories && searchInput ? searchCategories : categories" :key="category.id"
                class="bg-[#232323] py-[15px] px-[16px] w-full lg:w-[355px] h-[136px] flex justify-between rounded-[10px] border-1 border-[#515151]">
                <div class="flex justify-between flex-col">
                    <h4 class="text-[1.6rem] text-[#FDFDFD]">{{ category.categoryName }}</h4>
                    <span class="bg-[#1B1B1B] text-[#FDFDFD] w-fit py-2.5 px-2.5 rounded-md">{{
                        category.count
                    }}</span>
                </div>
                <div class="flex flex-col justify-between">
                    <i :class="`fa ${category.categoryIcon} text-[28px] text-white`"></i>
                    <RouterLink :to="`/categories/${category.categoryName}`" class="text-white hover:text-gray-300">
                        Open</RouterLink>
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